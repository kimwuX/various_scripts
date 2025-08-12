// ==UserScript==
// @name         自动喊话
// @namespace    http://www.kimwu.com/
// @version      1.0.0
// @description  青蛙、织梦自动喊话
// @author       kim.wu
// @match       *://qingwapt.com/
// @match       *://new.qingwa.pro/
// @match       *://zmpt.cc/
// @match       *://bilibili.download/
// @match       *://qingwapt.com/index.php*
// @match       *://new.qingwa.pro/index.php*
// @match       *://zmpt.cc/index.php*
// @match       *://bilibili.download/index.php
// @grant        GM_setValue
// @grant        GM_getValue
// @grant        GM_deleteValue
// @grant        GM_notification
// @grant        GM_registerMenuCommand
// @grant        GM_unregisterMenuCommand
// @require      https://code.jquery.com/jquery-1.12.4.js
// @require      https://cdn.jsdelivr.net/gh/kimwuX/various_scripts@master/js/library.js
// @icon         https://img101.pixhost.to/images/410/552674185__trumpet.png
// @run-at       document-end
// ==/UserScript==

(function () {
    let menu_All = [
        ['sh_up', '求上传喊话', true],
        ['sh_down', '求下载喊话', true],
        ['sh_bonus', '求魔力喊话', true],
        ['sh_vip', '求VIP喊话', true],
    ];
    let menu = new Menu(menu_All);

    function isSignable(str) {
        return /签\s*到|簽\s*到|打\s*卡|check in/i.test(str) && !/已|获得|成功|查看|記錄|详情/.test(str);
    }

    function handleQW() {
        let res = $('#info_block a').filter(function () {
            return isSignable($(this).text());
        });

        //签到优先
        if (res && res.length > 0) return;

        let t1 = new Date();
        let ds = menu.get_data('date');
        if (ds && new Date(ds).toDateString() == t1.toDateString()) {
            console.log("Aleady shouted.");
        } else {
            if (menu.get_menu_value('sh_up')) {
                $('input#shbox_text').val("蛙总，求上传");
                $('input#hbsubmit').click();
            }
            setTimeout(() => {
                if (menu.get_menu_value('sh_down')) {
                    $('input#shbox_text').val("蛙总，求下载");
                    $('input#hbsubmit').click();
                }

                menu.set_data('date', t1.toLocaleString());
                menu.save_vault();
            }, 1500);
        }
    }

    function handleZM() {
        let res = $('#info_block a').filter(function () {
            return isSignable($(this).text());
        });

        //签到优先
        if (res && res.length > 0) return;

        let t1 = new Date();
        let ds = menu.get_data('date');
        if (ds && new Date(ds).toDateString() == t1.toDateString()) {
            console.log("Aleady shouted.");
        } else {
            if (menu.get_menu_value('sh_up')) {
                $('input#shbox_text').val("皮总，求上传");
                $('input#hbsubmit').click();
            }
            setTimeout(() => {
                if (menu.get_menu_value('sh_bonus')) {
                    $('input#shbox_text').val("皮总，求电力");
                    $('input#hbsubmit').click();
                }

                menu.set_data('date', t1.toLocaleString());
                menu.save_vault();
            }, 1500);
        }
    }

    function handleRailgun() {
        let res = $('#info_block a').filter(function () {
            return isSignable($(this).text());
        });

        //签到优先
        if (res && res.length > 0) return;

        let t1 = new Date();
        let ds = menu.get_data('date');
        if (ds && new Date(ds).toDateString() == t1.toDateString()) {
            console.log("Aleady shouted.");
        } else {
            if (menu.get_menu_value('sh_up')) {
                $('input#shbox_text').val("炮姐，求上传");
                $('input#hbsubmit').click();
            }
            setTimeout(() => {
                if (menu.get_menu_value('sh_bonus')) {
                    $('input#shbox_text').val("炮姐，求魔力");
                    $('input#hbsubmit').click();
                }
            }, 1500);
            setTimeout(() => {
                if (menu.get_menu_value('sh_vip')) {
                    $('input#shbox_text').val("炮姐，求永V");
                    $('input#hbsubmit').click();
                }

                menu.set_data('date', t1.toLocaleString());
                menu.save_vault();
            }, 3000);
        }
    }

    setTimeout(function () {
        let host = location.host;
        if (host.search(/qingwa/i) != -1) {
            handleQW();
        } else if (host.search(/zmpt/i) != -1) {
            handleZM();
        } else if (host.search(/bilibili/i) != -1) {
            handleRailgun();
        }
    }, 2000);

})();
