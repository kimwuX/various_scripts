// ==UserScript==
// @name         验证码识别
// @namespace    http://www.kimwu.com/
// @version      1.0.0
// @description  自动识别验证码
// @author       kim.wu
// @match       */login.php*
// @match       */signup.php*
// @match       */recover.php*
// @match       */attendance.php*
// @match       */confirm_resend.php*
// @match       *://open.cd/plugin_sign-in.php
// @match       *://hdsky.me/*
// @exclude     */fun.php*
// @connect      server.local
// @connect      movie-pilot.org
// @grant        GM_xmlhttpRequest
// @require      https://code.jquery.com/jquery-1.12.4.js
// @require      https://cdn.jsdelivr.net/npm/js-base64@3.7.7/base64.min.js
// @require      https://cdn.jsdelivr.net/gh/kimwuX/various_scripts@master/javascript/library.js
// @icon         https://img1.pixhost.to/images/10104/659998252_4.png
// @run-at       document-end
// ==/UserScript==

class MyApp extends AppBase {
    constructor() {
        super('captcha_ocr');
        this.main();
    }

    isSignable() {
        let re_s = /签\s*到|簽\s*到|打\s*卡|check in/i;
        let re_d = /已|获得|成功|查看|記錄|详情/;
        let res = $('#info_block a').filter(function () {
            return re_s.test(this.textContent) && !re_d.test(this.textContent);
        });

        return res && res.length > 0;
    }

    async recoCaptcha(img64, handler) {
        const self = this;
        let hosts = ['http://server.local:9899', 'https://movie-pilot.org'];
        for (let attempt = 0; attempt < hosts.length; attempt++) {
            try {
                let url = hosts[attempt] + '/captcha/base64';
                if (attempt > 0) {
                    self.log(`Retrying(${attempt}) to post: ${url}`);
                    self.showTips(`第${attempt}次重试...`);
                } else {
                    self.log(`Posting: ${url}`);
                    self.showTips('正在识别验证码...');
                }
                const result = await Utils.post(url, 
                    JSON.stringify({base64_img: img64}),
                    'json', {
                        'headers': {"Content-Type": "application/json"},
                        'timeout': 20000
                    }
                );
                self.log(result);
                if (handler && handler(result)) {
                    self.showTips('验证码识别成功。', 'green');
                    return result;
                }
            } catch (error) {
                self.log(error.message, 1);
                if (attempt + 1 == hosts.length) {
                    throw new Error(`Failed to recognize captcha: ${error.message}`);
                }
            }
        }
    }

    readFile(file) {
        const self = this;
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = function(e) {
                //self.log(reader.result);
                //删除 data:*/*;base64, 前缀
                let img64 = reader.result.replace(/^.+,/, '');
                //self.log(img64);
                resolve(img64);
            };
            reader.onerror = function(e) {
                reject(new Error(`图片读取失败: ${reader.error.message}`));
            };
            reader.onabort = function() {
                reject(new Error('图片读取被中断'));
            };
            reader.readAsDataURL(file);
        });
    }

    ocr(url, handler) {
        const self = this;
        if (Utils.isEmptyString(url)) {
            return;
        }
        self.log(url);
        self.showTips('正在加载验证码...');
        Utils.load(
            url,
            'blob'
        ).then(result =>
            self.readFile(result)
        ).then(result =>
            self.recoCaptcha(result, handler)
        ).catch(error => {
            self.log(error, 2);
            self.showTips('验证码识别失败！', 'red');
        });
    }

    createTips() {
        let div = document.createElement('div');
        div.id = 'captips';
        div.style = 'font-size:12px;';
        return div;
    }

    showTips(text, color='black') {
        $('#captips').css('color', color);
        $('#captips').text(text);
    }

    regLogin() {
        const self = this;
        $('img[src*="action=regimage"]').each(function () {
            this.after(self.createTips());

            try {
                self.ocr(this.src, res => {
                    if (res && res.result && res.result.length == 6) {
                        $('input[name="imagestring"]').val(res.result);
                        return true;
                    }
                    return false;
                });
            }
            catch (error) {
                self.log(error, 2);
            }
        });
    }

    signOpenCD() {
        const self = this;
        if ($('#frmSignin img').length > 0) {
            $('#frmSignin img').after(self.createTips());

            try {
                self.ocr($('#frmSignin img').prop('src'), res => {
                    if (res && res.result && res.result.length == 6) {
                        $('#imagestring').val(res.result);
                        self.log($('#ok'));
                        $('#ok')[0].click();
                        return true;
                    }
                    return false;
                });
            }
            catch (error) {
                self.log(error, 2);
            }
        }
    }

    signHDS() {
        const self = this;
        if (!self.isSignable()) {
            return;
        }
        let t = Date.now();
        let id = setInterval(() => {
            self.log(`interval ${Date.now() - t}`);
            if (Date.now() - t > 15000) { //timeout
                self.log('timeout.');
                clearInterval(id);
            }

            if ($('#showupimg').length > 0) {
                clearInterval(id);

                $('#showupimg').after(self.createTips());
                $('.layui-layer').css('height', '200px');
                $('.layui-layer-content').css('height', '150px');

                try {
                    self.ocr($('#showupimg').prop('src'), res => {
                        if (res && res.result && res.result.length == 6) {
                            $('#imagestring').val(res.result);
                            self.log($('#showupbutton'));
                            $('#showupbutton')[0].click();
                            return true;
                        }
                        return false;
                    });
                }
                catch (error) {
                    self.log(error, 2);
                }
            }
        }, 1000);
    }

    signCommon() {
        const self = this;
        if (!self.isSignable()) {
            return;
        }
        let form = $('form[action="attendance.php"]');
        let img = form.find('img[alt="CAPTCHA"]');
        if (img.length > 0) {
            img.after(self.createTips());

            try {
                self.ocr(img.prop('src'), res => {
                    if (res && res.result && res.result.length == 6) {
                        form.find('input[name="imagestring"]').val(res.result);
                        form.find('input[type="submit"]').filter(function () {
                            return /签\s*到|簽\s*到/i.test(this.value);
                        }).each(function () {
                            self.log(this);
                            this.click();
                        });
                        return true;
                    }
                    return false;
                });
            }
            catch (error) {
                self.log(error, 2);
            }
        }
    }

    main() {
        const self = this;
        //self.log(location.href);
        if (location.pathname.search(/(login|signup|recover|confirm_resend)\.php/i) != -1) {
            self.regLogin();
        } else if (location.host.search(/open/i) != -1) {
            self.signOpenCD();
        } else if (location.host.search(/hdsky/i) != -1) {
            self.signHDS();
        } else if (location.pathname.search(/attendance\.php/i) != -1) {
            self.signCommon();
        }
    }
}

setTimeout(function () {
    new MyApp();
}, 1000);
