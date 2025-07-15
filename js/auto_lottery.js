// ==UserScript==
// @name         福利抽奖
// @namespace    http://www.kimwu.com/
// @version      1.0.0
// @description  青蛙每日福利，柠檬自动抽奖
// @author       kim.wu
// @match       *://qingwapt.com/*
// @match       *://new.qingwa.pro/*
// @match       *://lemonhd.club/*
// @exclude     */shoutbox.php*
// @exclude     *qingwa*/banner/
// @grant        GM_setValue
// @grant        GM_getValue
// @grant        GM_deleteValue
// @require      https://code.jquery.com/jquery-1.12.4.js
// @require      https://cdn.jsdelivr.net/gh/kimwuX/various_scripts@master/js/library.js
// @icon         https://img100.pixhost.to/images/604/539401618_5.png
// @run-at       document-end
// ==/UserScript==

(function () {
    let vault = new Vault();

    function cleanVault() {
        let rms = [];
        let t1 = new Date().toLocaleDateString();
        for (const key of vault.get_keys()) {
            if (getDays(key, t1) > 30) {
                rms.push(key);
            }
        }
        if (rms.length > 0) {
            for (const key of rms) {
                vault.delete_data(key);
            }
            vault.save_vault();
        }
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

    function qw_observer() {
        let ob = new Observer(function(list_add, list_remove) {
            list_add.forEach(node => {
                $('div.layui-layer.layui-layer-page').each(function() {
                    if (node == this) {
                        console.log(node);
                        if ($(this).find('div:contains("每日福利")').length > 0) {
                            //$(this).find('input[name="amount"]').val(5);
                            $(this).find('button').click();
                        }
                    }
                });
            });
        });
        ob.observe(document.body);
    }

    function handleQW() {
        let res = $('#info_block a').filter(function () {
            return isSignable($(this).text());
        });

        //签到优先
        if (res && res.length > 0) return;

        let t1 = new Date();
        let ds = vault.get_data('date');
        if (ds && new Date(ds).toDateString() == t1.toDateString()) {
            console.log("Aleady lottery.");
        } else if (location.href.search(/bonusshop\.php/i) == -1) {
            $('a[href*="bonusshop.php"]').each(function() {
                this.click();
            });
        } else {
            console.log($('div.item:contains("每日福利")'));
            $('div.item:contains("每日福利")').each(function() {
                let num = $(this).find('li[title="限购"]').text().trim();
                console.log(num);
                if (num == '0') {
                    vault.set_data('date', t1.toLocaleString());
                    vault.save_vault();
                } else {
                    qw_observer();
                    setTimeout(() => {
                        $(this).find('button').click();
                    }, 500);
                }
            });
        }
    }

    function handleNM() {
        let res = $('#info_block a').filter(function () {
            return isSignable($(this).text());
        });

        //签到优先
        if (res && res.length > 0) return;

        cleanVault();

        let t1 = new Date().toLocaleDateString();
        let arr = vault.get_str_data(t1, []);
        if (arr && arr.length > 0) {
            console.log("Aleady lottery.");
        } else if (location.href.search(/lottery\.php/i) == -1) {
            res = $('#info_block a').filter(function () {
                return /神游三清天/i.test($(this).text());
            });
            if (res && res.length > 0) {
                res[0].click();
            }
        } else {
            arr.push(new Date().toLocaleTimeString());
            vault.set_str_data(t1, arr);
            vault.save_vault();

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
                    vault.set_str_data(t1, arr);
                    vault.save_vault();
                }
            }
        }
    }

    setTimeout(function () {
        let host = location.host;
        if (host.search(/qingwa/i) != -1) {
            handleQW();
        } else if (host.search(/lemonhd/i) != -1) {
            handleNM();
        }
    }, 1500);

})();
