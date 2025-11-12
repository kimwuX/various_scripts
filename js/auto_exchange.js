// ==UserScript==
// @name         自动点击兑换魔力
// @namespace    http://www.kimwu.com/
// @version      1.0
// @description  自动点击兑换按钮
// @author       kim.wu
// @match       *://rousi.zip/mybonus.php*
// @match       *://pterclub.com/mybonus.php*
// @match       *://pt.btschool.club/mybonus.php*
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
        ['switch_on', '开启自动兑换', false],
        ['limited', '限制兑换次数', true],
    ];
    let menu = new Menu(menu_All);

    setTimeout(function() {
        console.log('auto_exchange');

        if (!menu.get_menu_value('switch_on')) {
            return;
        }

        let max_count = menu.get_menu_value('limited') ? 10 : -1;
        let counter = menu.get_data("counter", 0);
        console.log(`max count = ${max_count}, counter = ${counter}`);

        if (max_count <= 0 || counter < max_count) {
            let btn;
            if (location.host.search(/rousi/i) != -1) {
                btn = $('input[name="submit"]:eq(3)');
            } else {
                btn = $('input[name="submit"]:eq(2)');
            }
            if (btn && btn.length > 0) {
                btn.filter(function() {
                    return !$(this).prop("disabled");
                }).each(function() {
                    menu.set_data("counter", ++counter);
                    menu.save_vault();
                    console.log(this);
                    $(this).click();
                });
            }
        }
    }, 8000);

  })();
