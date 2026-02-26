// ==UserScript==
// @name         Discuz论坛签到
// @namespace    http://www.kimwu.com/
// @version      1.0.0
// @description  Discuz论坛自动签到
// @author       kim.wu
// @match       *://ssdforum.org/*
// @require      https://code.jquery.com/jquery-1.12.4.js
// @require      https://cdn.jsdelivr.net/gh/kimwuX/various_scripts@master/javascript/library.js
// @icon         https://www.discuz.vip/Yunnuo_website/v1/static/index/discuz/img/icon.png
// @run-at       document-end
// ==/UserScript==

class MyApp extends AppBase {
    constructor() {
        super('sign_discuz');
        this.main();
    }

    sign_page() {
        const self = this;
        $('form[name="qiandao"]').first().each(function () {
            $(this).find('li#kx').click();
            $(this).find('input.btn').click();
        });
    }

    sign_popup() {
        const self = this;
        $('div#um a').filter(function () {
            return /签到/i.test($(this).text());
        }).each(function () {
            //self.log(this);
            this.click();
        });

        let t = Date.now();
        let id = setInterval(() => {
            self.log(`sign_popup: ${Date.now() - t}`);
            if (Date.now() - t > 15000) { //timeout
                clearInterval(id);
            }

            if ($('form#qiandao').length > 0) {
                clearInterval(id);

                $('form#qiandao').first().each(function () {
                    $(this).find('li#kx').click();
                    $(this).find('#todaysay').val('今日签到');
                    $(this).find('button').click();
                });
            }
        }, 200);
    }

    main() {
        const self = this;
        //self.log(location.href);
        if (location.pathname.search(/dsu_paulsign-sign\.html/i) != -1) {
            self.sign_page();
        } else {
            self.sign_popup();
        }
    }
}

setTimeout(function () {
    new MyApp();
}, 1000);
