// ==UserScript==
// @name         验证码识别
// @namespace    http://www.kimwu.com/
// @version      1.0.0
// @description  自动识别验证码
// @author       kim.wu
// @match       */login.php*
// @match       */signup.php*
// @match       */recover.php*
// @match       */confirm_resend.php*
// @match       *://open.cd/plugin_sign-in.php
// @match       *://hdsky.me/*
// @exclude     */fun.php*
// @connect      server.local
// @connect      movie-pilot.org
// @grant        GM_cookie
// @grant        GM_xmlhttpRequest
// @require      https://code.jquery.com/jquery-1.12.4.js
// @require      https://cdn.jsdelivr.net/npm/js-base64@3.7.7/base64.min.js
// @icon         https://img95.pixhost.to/images/777/468772950_4.png
// @run-at       document-end
// ==/UserScript==

(function () {
    function log(data, level = 0) {
        let func;
        if (level == 2) {
            func = console.error;
        } else if (level == 1) {
            func = console.warn;
        } else {
            func = console.log;
        }
        if (data instanceof Object) {
            func(data);
        } else {
            func(`---ocr_img---\n[${new Date().toLocaleTimeString()}] ${data}`);
        }
    }

    function isEmptyString(str) {
        return !(str != null && str.length > 0);
    }

    const RETRY_CNT = 3;
    function recoCaptcha(img64, handler, count) {
        if (isEmptyString(img64)) {
            return;
        }
        //log(img64);
        let host = count++ % 2 == 0 ? 'http://server.local:9899' : 'https://movie-pilot.org';
        log(host);
        GM_xmlhttpRequest({
            method: "POST",
            url: host + '/captcha/base64',
            headers: { "Content-Type": "application/json" },
            data: JSON.stringify({base64_img: img64}),
            timeout: 20000,
            responseType: "json",
            onerror: function(error) {
                log('capture recognition error.', 2);
                log(error, 2);
                showTips(`识别出错！(${count})`, 'red');
                if (count < RETRY_CNT) {
                    recoCaptcha(img64, handler, count);
                }
            },
            onloadstart: function() {
                log('capture recognition start.');
                showTips('正在识别验证码...');
            },
            ontimeout: function() {
                log('capture recognition timeout.');
                showTips(`识别连接超时！(${count})`, 'red');
                if (count < RETRY_CNT) {
                    recoCaptcha(img64, handler, count);
                }
            },
            onload: function(response) {
                log('capture recognition success.');
                log(response.response);
                //log(response.responseText);
                if (handler && handler(response.response)) {
                    showTips(`识别成功。(${count})`, 'green');
                } else {
                    showTips(`识别失败！(${count})`, 'red');
                    if (count < RETRY_CNT) {
                        recoCaptcha(img64, handler, count);
                    }
                }
            }
        });
    }

    function getImage(url, handler) {
        if (isEmptyString(url)) {
            return;
        }
        log(url);
        GM_xmlhttpRequest({
            method: "GET",
            url: url,
            headers: {
              "User-Agent": navigator.userAgent
            },
            responseType: "blob",
            onerror: function(error) {
                log('load image error.', 2);
                log(error, 2);
            },
            onloadstart: function() {
                log('load image start.');
                showTips('正在加载验证码...');
            },
            onload: function(response) {
                log('load image success.');
                //log(response.response);
                //log(response.responseText);
                let reader = new FileReader();
                reader.onloadend = function() {
                    //log(reader.result);
                    let img64 = reader.result.replace(/^.+,/, '');
                    //log(img64);
                    recoCaptcha(img64, handler, 0);
                }
                reader.readAsDataURL(response.response);
            }
        });
    }

    function createTips() {
        let div = document.createElement('div');
        div.id = 'captips';
        div.style = 'font-size:12px;';
        return div;
    }

    function showTips(text, color='black') {
        $('#captips').css('color', color);
        $('#captips').text(text);
    }

    function regLogin() {
        $('img[src*="action=regimage"]').each(function() {
            this.after(createTips());

            try {
                getImage(this.src, res => {
                    if (res && res.result && res.result.length == 6) {
                        $('input[name="imagestring"]').val(res.result);
                        return true;
                    }
                    return false;
                });
            }
            catch (error) {
                log(error, 2);
            }
        });
    }

    function signOpenCD() {
        if ($('#frmSignin img').length > 0) {
            $('#frmSignin img').after(createTips());

            try {
                getImage($('#frmSignin img').prop('src'), res => {
                    if (res && res.result && res.result.length == 6) {
                        $('#imagestring').val(res.result);
                        log($('#ok'));
                        $('#ok')[0].click();
                        return true;
                    }
                    return false;
                });
            }
            catch (error) {
                log(error, 2);
            }
        }
    }

    function signHDS() {
        let t = Date.now();
        let id = setInterval(() => {
            log(`interval ${Date.now() - t}`);
            if (Date.now() - t > 15000) { //timeout
                log('timeout.');
                clearInterval(id);
            }

            if ($('#showupimg').length > 0) {
                clearInterval(id);

                $('#showupimg').after(createTips());
                $('#layui-layer2').css('height', '200px');
                $('.layui-layer-content').css('height', '150px');

                try {
                    getImage($('#showupimg').prop('src'), res => {
                        if (res && res.result && res.result.length == 6) {
                            $('#imagestring').val(res.result);
                            log($('#showupbutton'));
                            $('#showupbutton')[0].click();
                            return true;
                        }
                        return false;
                    });
                }
                catch (error) {
                    log(error, 2);
                }
            }
        }, 1000);
    }

    setTimeout(function() {
        log('ocr_img.');
        //log(location.href);
        if (location.pathname.search(/(login|signup|recover|confirm_resend)\.php/i) != -1) {
            regLogin();
        } else if (location.host.search(/open/i) != -1) {
            signOpenCD();
        } else if (location.host.search(/hdsky/i) != -1) {
            signHDS();
        }
    }, 1000);

  })();