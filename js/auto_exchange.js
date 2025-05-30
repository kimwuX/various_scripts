// ==UserScript==
// @name         自动点击兑换魔力
// @namespace    http://www.kimwu.com/
// @version      1.0
// @description  自动点击兑换按钮
// @author       kim.wu
// @match       *://pterclub.com/mybonus.php*
// @match       *://pt.btschool.club/mybonus.php*
// @grant        GM_setValue
// @grant        GM_getValue
// @require      https://code.jquery.com/jquery-1.12.4.js
// @require      https://cdn.jsdelivr.net/gh/kimwuX/various_scripts@master/js/library.js
// @icon         https://www.baidu.com/favicon.ico
// @run-at       document-end
// ==/UserScript==

(function () {
    let vault = new Vault();

    setTimeout(function() {
        console.log('auto_exchange');

        let max_count = 10;
        let counter = vault.get_data("counter", 0);
        console.log(`max count = ${max_count}, counter = ${counter}`);

        if (max_count <= 0 || counter < max_count) {
            $('input[name="submit"]:eq(2)').filter(function() {
                return !$(this).prop("disabled");
            }).each(function() {
                vault.set_data("counter", ++counter);
                vault.save_vault();
                console.log(this);
                //$(this).click();
            });
        }
    }, 5000);

  })();
