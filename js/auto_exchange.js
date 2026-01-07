// ==UserScript==
// @name         自动点击兑换魔力
// @namespace    http://www.kimwu.com/
// @version      1.0.0
// @description  自动点击兑换按钮
// @author       kim.wu
// @match       *://rousi.zip/mybonus.php*
// @match       *://sewerpt.com/mybonus.php*
// @match       *://pterclub.com/mybonus.php*
// @match       *://www.hitpt.com/mybonus.php*
// @match       *://www.ptlover.cc/mybonus.php*
// @match       *://pt.eastgame.org/mybonus.php*
// @match       *://pt.btschool.club/mybonus.php*
// @match       *://pt.soulvoice.club/mybonus.php*
// @match       *://bilibili.download/mybonus.php*
// @grant        GM_setValue
// @grant        GM_getValue
// @grant        GM_deleteValue
// @grant        GM_notification
// @grant        GM_registerMenuCommand
// @grant        GM_unregisterMenuCommand
// @require      https://code.jquery.com/jquery-1.12.4.js
// @require      https://cdn.jsdelivr.net/gh/kimwuX/various_scripts@master/js/library.js
// @icon         https://img1.pixhost.to/images/10104/659998259_10.png
// @run-at       document-end
// ==/UserScript==

(function () {
    let menu_All = [
        ['switch_up', '🔼开启兑换上传', false],
        ['reset_up', '🔼重置兑换上传计数[需要刷新]', false],
        ['limited_up_00', '🔼不限制兑换上传次数[需要刷新]', false],
        ['limited_up_05', '🔼限制兑换上传5次[需要刷新]', false],
        ['limited_up_10', '🔼限制兑换上传10次[需要刷新]', false],
        ['limited_up_20', '🔼限制兑换上传20次[需要刷新]', false],
        ['limited_up_50', '🔼限制兑换上传50次[需要刷新]', false],
        ['switch_down', '🔻开启兑换下载', false],
        ['reset_down', '🔻重置兑换下载计数[需要刷新]', false],
        ['limited_down_00', '🔻不限制兑换下载次数[需要刷新]', false],
        ['limited_down_05', '🔻限制兑换下载5次[需要刷新]', false],
        ['limited_down_10', '🔻限制兑换下载10次[需要刷新]', false],
        ['limited_down_20', '🔻限制兑换下载20次[需要刷新]', false],
        ['limited_down_50', '🔻限制兑换下载50次[需要刷新]', false],
    ];
    let menu = new Menu(menu_All);
    handleMenu();

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
            func(`---auto_exchange---\n[${new Date().toLocaleTimeString()}] ${data}`);
        }
    }

    function handleMenu() {
        let flag = false;
        let dic = menu.get_menu_data();
        // 重置上传计数
        if (menu.get_menu_value('reset_up')) {
            menu.delete_data('counter_up');
            menu.save_vault();
            dic['reset_up'] = false;
            flag = true;
        }
        // 兑换上传次数限制
        if (menu.get_menu_value('limited_up_50')) {
            menu.set_data('limited_up', 50);
            menu.save_vault();
            dic['limited_up_50'] = false;
            flag = true;
        }
        if (menu.get_menu_value('limited_up_20')) {
            menu.set_data('limited_up', 20);
            menu.save_vault();
            dic['limited_up_20'] = false;
            flag = true;
        }
        if (menu.get_menu_value('limited_up_10')) {
            menu.set_data('limited_up', 10);
            menu.save_vault();
            dic['limited_up_10'] = false;
            flag = true;
        }
        if (menu.get_menu_value('limited_up_05')) {
            menu.set_data('limited_up', 5);
            menu.save_vault();
            dic['limited_up_05'] = false;
            flag = true;
        }
        if (menu.get_menu_value('limited_up_00')) {
            menu.delete_data('limited_up');
            menu.save_vault();
        }
        // 重置下载计数
        if (menu.get_menu_value('reset_down')) {
            menu.delete_data('counter_down');
            menu.save_vault();
            dic['reset_down'] = false;
            flag = true;
        }
        // 兑换下载次数限制
        if (menu.get_menu_value('limited_down_50')) {
            menu.set_data('limited_down', 50);
            menu.save_vault();
            dic['limited_down_50'] = false;
            flag = true;
        }
        if (menu.get_menu_value('limited_down_20')) {
            menu.set_data('limited_down', 20);
            menu.save_vault();
            dic['limited_down_20'] = false;
            flag = true;
        }
        if (menu.get_menu_value('limited_down_10')) {
            menu.set_data('limited_down', 10);
            menu.save_vault();
            dic['limited_down_10'] = false;
            flag = true;
        }
        if (menu.get_menu_value('limited_down_05')) {
            menu.set_data('limited_down', 5);
            menu.save_vault();
            dic['limited_down_05'] = false;
            flag = true;
        }
        if (menu.get_menu_value('limited_down_00')) {
            menu.delete_data('limited_down');
            menu.save_vault();
        }
        // 重新注册脚本菜单
        if (flag) {
            menu.set_menu_data(dic);
            menu.save_vault();
            menu.register_menu();
        }
    }

    function exchangeUp() {
        log('exchange upload');

        let res = false;
        let max_count = menu.get_data('limited_up', -1);
        let counter = menu.get_data("counter_up", 0);
        log(`max count = ${max_count}, counter = ${counter}`);

        if (max_count > 0 && counter >= max_count)
            return res;

        let reg = null;
        if (location.host.search(/bilibili|hitpt|ptlover|sewerpt|soulvoice/i) != -1) {
            reg = /100(.0)?\s*GB\s*上(传|傳)量/i;
        } else {
            reg = /10(.0)?\s*GB\s*上(传|傳)量/i;
        }

        $('form[action="?action=exchange"]').parent().filter(function () {
            let txt = $(this).find('h1').text();
            return reg.test(txt) && !/出售|减少|減少/i.test(txt);
        }).find('input[name="submit"]').filter(function() {
            return !$(this).prop("disabled");
        }).each(function() {
            menu.set_data("counter_up", ++counter);
            menu.save_vault();
            log(this);
            $(this).click();
            res = true;
        });
        return res;
    }

    function exchangeDown() {
        log('exchange download');

        let res = false;
        let max_count = menu.get_data('limited_down', -1);
        let counter = menu.get_data("counter_down", 0);
        log(`max count = ${max_count}, counter = ${counter}`);

        if (max_count > 0 && counter >= max_count)
            return res;

        let reg = null;
        if (location.host.search(/bilibili|hitpt|sewerpt|soulvoice/i) != -1) {
            reg = /100(.0)?\s*GB\s*下(载|載)量/i;
        } else if (location.host.search(/ptlover/i) != -1) {
            reg = /20(.0)?\s*GB\s*下(载|載)量/i;
        } else {
            reg = /10(.0)?\s*GB\s*下(载|載)量/i;
        }

        $('form[action="?action=exchange"]').parent().filter(function () {
            let txt = $(this).find('h1').text();
            return reg.test(txt) && !/出售|减少|減少/i.test(txt);
        }).find('input[name="submit"]').filter(function() {
            return !$(this).prop("disabled");
        }).each(function() {
            menu.set_data("counter_down", ++counter);
            menu.save_vault();
            log(this);
            $(this).click();
            res = true;
        });
        return res;
    }

    setTimeout(function() {
        log('auto_exchange');

        let ms = 0;
        if (location.host.search(/bilibili|hitpt|ptlover|sewerpt|soulvoice/i) != -1) {
            ms = 5000;
        }
        setTimeout(() => {
            let res = false;
            if (!res && menu.get_menu_value('switch_up')) {
                res = exchangeUp();
            }
            if (!res && menu.get_menu_value('switch_down')) {
                res = exchangeDown();
            }
        }, ms);
    }, 3000);

  })();
