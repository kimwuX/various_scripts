// ==UserScript==
// @name         自动点击兑换魔力
// @namespace    http://www.kimwu.com/
// @version      1.0
// @description  自动点击兑换按钮
// @author       kim.wu
// @match        https://pt.hd4fans.org/mybonus.php*
// @require      https://code.jquery.com/jquery-1.12.4.js
// @icon         https://www.google.com/s2/favicons?sz=64&domain=baidu.com
// @run-at       document-end
// ==/UserScript==

(function () {

    setTimeout(function() {

        let res = $('input[name="submit"]:eq(2)');
        //let res = $('input[name="submit"]:eq(-2)');

        if (res && !res.prop("disabled") && res.length > 0) {
            console.log(res[0]);
            //res[0].click();
        }
    }, 1000);

  })();
