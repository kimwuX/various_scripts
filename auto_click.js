// ==UserScript==
// @name         自动点击按钮
// @namespace    http://www.kimwu.com/
// @version      1.0
// @description  自动点击按钮
// @author       kim.wu
// @match        https://www.baidu.com/*
// @require      https://code.jquery.com/jquery-1.12.4.js
// @run-at       document-end
// ==/UserScript==

(function () {

    setTimeout(function() {

        if ($("input[value='放弃考核']").length > 0) {
            $("input[value='放弃考核']")[0].click();
        } else if ($("a:contains('这里')").length > 0) {
            $("a:contains('这里')")[0].click();
        } else if ($("a:contains('返回上一页')").length > 0) {
            $("a:contains('返回上一页')")[0].click();
        }
    }, 1000 + Math.random() * 2000);

  })();