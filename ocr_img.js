// ==UserScript==
// @name         验证码识别
// @namespace    http://www.kimwu.com/
// @version      1.0
// @description  自动识别验证码
// @author       kim.wu
// @match       *://open.cd/plugin_sign-in.php
// @match       *://hdsky.me/*
// @exclude     */fun.php*
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

    function recoCaptcha(img64, mylog, onload) {
        if (isEmptyString(img64)) {
            return;
        }
        //console.log(img64);
        GM_xmlhttpRequest({
            method: "POST",
            url: "https://movie-pilot.org/captcha/base64",
            headers: { "Content-Type": "application/json" },
            data: JSON.stringify({base64_img: img64}),
            responseType: "json",
            onerror: function(error) {
                console.error('capture recognition error:');
                console.error(error);
            },
            onloadstart: function() {
                console.log('capture recognition start.');
                mylog && mylog('正在识别验证码...');
            },
            onload: function(response) {
                console.log('capture recognition success.');
                console.log(response.response);
                //console.log(response.responseText);
                onload && onload(response.response);
            }
        });
    }

    function getImage(url, mylog, onload) {
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
                mylog && mylog('正在加载验证码...');
            },
            onload: function(response) {
                console.log('load image success.');
                //console.log(response.response);
                //console.log(response.responseText);
                let reader = new FileReader();
                reader.onloadend = function() {
                    //console.log(reader.result);
                    let img64 = reader.result.replace(/^.+,/, "");
                    //console.log(img64);
                    recoCaptcha(img64, mylog, onload);
                }
                reader.readAsDataURL(response.response);
            }
        });
    }

    function signOpenCD() {
        if ($("#frmSignin img").length > 0) {

            let div = document.createElement('div');
            div.id = 'captips';
            div.style = 'font-size:12px;';
            $("#frmSignin img").after(div);

            try {
                getImage($("#frmSignin img").prop('src'), text => {
                    $('#captips').text(text);
                }, res => {
                    if (res && res.result && res.result.length == 6) {
                        $('#imagestring').val(res.result);
                        console.log($('#ok'));
                        //$('#ok')[0].click();
                    } else {
                        $('#captips').css('color', 'red');
                        $('#captips').text('识别失败！');
                    }
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

                let div = document.createElement('div');
                div.id = 'captips';
                div.style = 'font-size:12px;';
                $('#showupimg').after(div);
                $('#layui-layer2').css('height', '200px');
                $('.layui-layer-content').css('height', '150px');

                try {
                    getImage($('#showupimg').prop('src'), text => {
                        $('#captips').text(text);
                    }, res => {
                        if (res && res.result && res.result.length == 6) {
                            $('#imagestring').val(res.result);
                            console.log($('#showupbutton'));
                            //$('#showupbutton')[0].click();
                        } else {
                            $('#captips').css('color', 'red');
                            $('#captips').text('识别失败！');
                        }
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