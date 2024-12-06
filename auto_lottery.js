// ==UserScript==
// @name         自动抽奖
// @namespace    http://www.kimwu.com/
// @version      1.0.0
// @description  柠檬自动抽奖
// @author       kim.wu
// @match       *://lemonhd.club/*
// @grant        GM_setValue
// @grant        GM_getValue
// @grant        GM_deleteValue
// @require      https://code.jquery.com/jquery-1.12.4.js
// @icon         https://img100.pixhost.to/images/604/539401618_5.png
// @run-at       document-end
// ==/UserScript==

(function () {

    function isSignable(str) {
        return /签\s*到|簽\s*到|打\s*卡|check in/i.test(str) && !/已|获得|成功|查看|記錄|详情/.test(str)
    }

    setTimeout(function() {

        let res = $('#info_block a').filter(function() {
            return isSignable($(this).text())
        })

        //签到优先
        if (res && res.length > 0) return

        let t1 = new Date()
        let v1 = GM_getValue(location.host)

        if (v1 && new Date(v1).toDateString() == t1.toDateString()) {
            console.log("Aleady clicked.")
        } else if(location.href.search(/lottery\.php/i) == -1) {
            res = $('#info_block a').filter(function() {
                return /神游三清天/i.test($(this).text())
            })
            if (res && res.length > 0) {
                res[0].click()
            }
        } else {
            GM_setValue(location.host, t1.toLocaleString())
            res = $('button.item').filter(function() {
                return /（免费）/i.test($(this).text())
            })
            if (res && res.length > 0) {
                if (!res.prop("disabled")) {
                    res[0].click()
                }
            }
        }
    }, 1000)

  })();
