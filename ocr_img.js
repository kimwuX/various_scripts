// ==UserScript==
// @name         验证码识别
// @namespace    http://www.kimwu.com/
// @version      1.0
// @description  自动识别验证码
// @author       kim.wu
// @match       *://open.cd/plugin_sign-in.php
// @match       *://hdsky.me/*
// @exclude     */fun.php*
// @connect      server.local
// @connect      movie-pilot.org
// @grant        GM_xmlhttpRequest
// @require      https://code.jquery.com/jquery-1.12.4.js
// @require      https://cdn.jsdelivr.net/npm/js-base64@3.7.7/base64.min.js
// @icon         https://www.baidu.com/favicon.ico
// @run-at       document-end
// ==/UserScript==

(function () {

    function isEmptyString(str) {
        return !(str != null && str.length > 0);
    }

    const RETRY_CNT = 3;
    function recoCaptcha(img64, handler, count) {
        if (isEmptyString(img64)) {
            return;
        }
        //console.log(img64);
        let host = count++ % 2 == 0 ? 'http://server.local:9899' : 'https://movie-pilot.org';
        console.log(host);
        GM_xmlhttpRequest({
            method: "POST",
            url: host + '/captcha/base64',
            headers: { "Content-Type": "application/json" },
            data: JSON.stringify({base64_img: img64}),
            timeout: 20000,
            responseType: "json",
            onerror: function(error) {
                console.error('capture recognition error:');
                console.error(error);
                showTips(`识别出错！(${count})`, 'red');
                if (count < RETRY_CNT) {
                    recoCaptcha(img64, handler, count);
                }
            },
            onloadstart: function() {
                console.log('capture recognition start.');
                showTips('正在识别验证码...');
            },
            ontimeout: function() {
                console.log('capture recognition timeout.');
                showTips(`识别连接超时！(${count})`, 'red');
                if (count < RETRY_CNT) {
                    recoCaptcha(img64, handler, count);
                }
            },
            onload: function(response) {
                console.log('capture recognition success.');
                console.log(response.response);
                //console.log(response.responseText);
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
        console.log(url);
        GM_xmlhttpRequest({
            method: "GET",
            url: url,
            responseType: "blob",
            onerror: function(error) {
                console.error('load image error:');
                console.error(error);
            },
            onloadstart: function() {
                console.log('load image start.');
                showTips('正在加载验证码...');
            },
            onload: function(response) {
                console.log('load image success.');
                //console.log(response.response);
                //console.log(response.responseText);
                let reader = new FileReader();
                reader.onloadend = function() {
                    //console.log(reader.result);
                    let img64 = reader.result.replace(/^.+,/, '');
                    //console.log(img64);
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

    function signOpenCD() {
        if ($('#frmSignin img').length > 0) {

            $('#frmSignin img').after(createTips());

            try {
                getImage($('#frmSignin img').prop('src'), res => {
                    if (res && res.result && res.result.length == 6) {
                        $('#imagestring').val(res.result);
                        console.log($('#ok'));
                        $('#ok')[0].click();
                        return true;
                    }
                    return false;
                });
            }
            catch (error) {
                console.error(error);
            }
        }
    }

    function signHDS() {
        let t = Date.now();
        let id = setInterval(() => {
            console.log(`ocr_img: ${Date.now() - t}`);
            if (Date.now() - t > 15000) { //timeout
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
                            console.log($('#showupbutton'));
                            $('#showupbutton')[0].click();
                            return true;
                        }
                        return false;
                    });
                }
                catch (error) {
                    console.error(error);
                }
            }
        }, 200);
    }

    setTimeout(function() {

        console.log('ocr_img.');
        //console.log(location.href);
        let host = location.host;
        if (host.search(/open/i) != -1) {
            signOpenCD();
        } else if (host.search(/hdsky/i) != -1) {
            signHDS();
        }
    }, 1000);

  })();