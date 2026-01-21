// ==UserScript==
// @name         论坛签到
// @namespace    http://www.kimwu.com/
// @version      1.0.0
// @description  Discuz论坛自动签到
// @author       kim.wu
// @match       *://iptv.cc/*
// @match       *://ssdforum.org/*
// @require      https://code.jquery.com/jquery-1.12.4.js
// @icon         https://www.discuz.vip/Yunnuo_website/v1/static/index/discuz/img/icon.png
// @run-at       document-end
// ==/UserScript==

(function () {

    function sign_page() {
        $('form[name="qiandao"]').first().each(function() {
            $(this).find('li#kx').click();
            $(this).find('input.btn').click();
        });
    }

    function sign_popup() {
        $('div#um a').filter(function() {
            return /签到/i.test($(this).text())
        }).each(function() {
            //console.log(this);
            this.click();
        });

        let t = Date.now();
        let id = setInterval(() => {
            console.log(`sign_popup: ${Date.now() - t}`);
            if (Date.now() - t > 15000) { //timeout
                clearInterval(id);
            }

            if ($('form#qiandao').length > 0) {
                clearInterval(id);

                $('form#qiandao').first().each(function() {
                    $(this).find('li#kx').click();
                    $(this).find('#todaysay').val('今日签到');
                    $(this).find('button').click();
                });
            }
        }, 200);
    }

    setTimeout(function() {
        console.log('sign_discuz.');
        //console.log(location.href);
        if (location.pathname.search(/dsu_paulsign-sign\.html/i) != -1) {
            sign_page();
        } else {
            sign_popup();
        }

    }, 1000);

  })();