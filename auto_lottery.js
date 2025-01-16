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
    let vault = GM_getValue(location.host) || {};

    function cleanVault() {
        let rms = [];
        let t1 = new Date().toLocaleDateString();
        for (const key in vault) {
            if (getDays(key, t1) > 30) {
                rms.push(key);
            }
        }
        if (rms.length > 0) {
            for (const key of rms) {
                delete vault[key];
            }
            GM_setValue(location.host, vault);
        }
    }

    function saveToVault(key, arr) {
        vault[key] = JSON.stringify(arr);
        GM_setValue(location.host, vault);
    }

    function isSignable(str) {
        return /签\s*到|簽\s*到|打\s*卡|check in/i.test(str) && !/已|获得|成功|查看|記錄|详情/.test(str);
    }

    function isValidDate(date) {
        return date instanceof Date && !isNaN(date.getTime());
    }

    function getDays(date1, date2) {
        var d1 = new Date(date1);
        var d2 = new Date(date2);

        if (!isValidDate(d1) || !isValidDate(d2)) {
            return Number.MAX_SAFE_INTEGER;
        }

        // 计算两个日期的时间差（毫秒）
        var timeDiff = Math.abs(d2.getTime() - d1.getTime());
        // 计算天数
        var days = Math.ceil(timeDiff / (1000 * 3600 * 24));
        return days;
    }

    setTimeout(function () {
        let res = $('#info_block a').filter(function () {
            return isSignable($(this).text());
        });

        //签到优先
        if (res && res.length > 0) return;

        cleanVault();
        //console.log(vault);

        let t1 = new Date().toLocaleDateString();
        let arr = vault[t1] ? JSON.parse(vault[t1]) : [];
        if (arr && arr.length > 0) {
            console.log("Aleady clicked.");
        } else if (location.href.search(/lottery\.php/i) == -1) {
            res = $('#info_block a').filter(function () {
                return /神游三清天/i.test($(this).text());
            });
            if (res && res.length > 0) {
                res[0].click();
            }
        } else {
            arr.push(new Date().toLocaleTimeString());
            saveToVault(t1, arr);

            res = $('button.item').filter(function () {
                return /（免费）/i.test($(this).text()) && !$(this).prop("disabled");
            });
            if (res && res.length > 0) {
                res[0].click();
            }
        }

        if (location.href.search(/lottery\.php/i) != -1) {
            let txt = $('div').filter(function () {
                return /这是您今天第.*?次神游/.test($(this).text());
            }).parent();
            if (txt && txt.length > 0) {
                let reg = txt.text().trim().match(/本次神游到了\s*(.*)/);
                if (reg) {
                    arr.push(reg[1]);
                } else if (txt.text().trim().match(/本次什么都没有得到/)) {
                    arr.push('无');
                }
                if (arr.length > 0) {
                    saveToVault(t1, arr);
                }
            }
        }
        //console.log(vault);
    }, 1000);

})();
