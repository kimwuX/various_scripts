// ==UserScript==
// @name         福利抽奖
// @namespace    http://www.kimwu.com/
// @version      1.0.0
// @description  青蛙每日福利，柠檬自动抽奖
// @author       kim.wu
// @match       *://qingwapt.com/*
// @match       *://new.qingwa.pro/*
// @match       *://lemonhd.club/*
// @match       *://longpt.org/*
// @exclude     */fun.php*
// @exclude     */shoutbox.php*
// @exclude     *qingwa*/banner/
// @grant        GM_setValue
// @grant        GM_getValue
// @grant        GM_deleteValue
// @require      https://code.jquery.com/jquery-1.12.4.js
// @require      https://cdn.jsdelivr.net/gh/kimwuX/various_scripts@master/js/library.js
// @icon         https://img1.pixhost.to/images/10104/659998253_5.png
// @run-at       document-end
// ==/UserScript==

(function () {
    let vault = new Vault();
    let now = new Date();

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
            func(`---auto_lottery---\n[${new Date().toLocaleTimeString()}] ${data}`);
        }
    }

    function cleanVault() {
        let rms = [];
        let t1 = now.toLocaleDateString();
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

    function savePrize(key, value) {
        let arr = vault.get_str_data(key, []);
        arr.unshift(`${now.toLocaleDateString()}:${value}`);
        //保留30天记录
        while(arr.length > 30) {
            arr.pop();
        }
        vault.set_str_data(key, arr);
        vault.save_vault();
    }

    function isSignable() {
        let re_s = /签\s*到|簽\s*到|打\s*卡|check in/i;
        let re_d = /已|获得|成功|查看|記錄|详情/;
        let res = $('#info_block a').filter(function () {
            return re_s.test(this.textContent) && !re_d.test(this.textContent);
        });

        return res && res.length > 0;
    }

    function canLottery() {
        let ds = vault.get_data('date');
        if (ds && new Date(ds).toDateString() == now.toDateString()) {
            log("Aleady lottery.");
            return false;
        }

        //签到优先
        if (isSignable()) return false;

        return true;
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

    function matchRegExp(pattern, text) {
        if (text && text.length > 0) {
            return text.match(pattern);
        }
        return null;
    }

    function qw_observer() {
        let ob = new Observer(function(list_add, list_remove) {
            let target = $('div.layui-layer.layui-layer-page');
            list_add.forEach(node => {
                target.each(function() {
                    if (node == this) {
                        log(node);
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
        if (!canLottery()) return;

        if (location.href.search(/bonusshop\.php/i) == -1) {
            $('a[href*="bonusshop.php"]').each(function() {
                this.click();
            });
        } else {
            log($('div.item:contains("每日福利")'));
            $('div.item:contains("每日福利")').each(function() {
                let num = $(this).find('li[title="限购"]').text().trim();
                log(`限购：${num}`);
                if (num == '0') {
                    vault.set_data('date', now.toLocaleString());
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

        let t1 = now.toLocaleDateString();
        let arr = vault.get_str_data(t1, []);
        if (arr && arr.length > 0) {
            log("Aleady lottery.");
        } else if (location.href.search(/lottery\.php/i) == -1) {
            res = $('#info_block a').filter(function () {
                return /神游三清天/i.test($(this).text());
            });
            if (res && res.length > 0) {
                res[0].click();
            }
        } else {
            arr.push(now.toLocaleTimeString());
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

    function doLongPT() {
        //求上传、求魔力
        log("喊话");
        $('input[placeholder="喊话"]').val("求上传").each(function () {
            this.dispatchEvent(new Event('input'));
        });
        $('button:contains("喊话")').click();

        setTimeout(() => {
            let re_prize = /龙宝响应了你的请求,获得(.*?),/
            $('p.el-message__content').each(function () {
                log(this.textContent);
                let match = matchRegExp(re_prize, this.textContent);
                if (match) {
                    log(match);
                    savePrize('prize', match[1]);
                }
            });

            log("参与抽奖");
            $('button:contains("立即参与")').click();

            vault.set_data('date', now.toLocaleString());
            vault.save_vault();
        }, 1500);
    }

    function long_observer() {
        log("long_observer1");
        let ob = new Observer(function(list_add, list_remove) {
            let target = $('main.el-main > section.el-container');
            list_add.forEach(node => {
                target.each(function() {
                    if (node == this) {
                        log("long_observer2");
                        log(node);
                        doLongPT();
                    }
                });
            });
        });
        ob.observe(document.body);
    }

    function handleLongPT() {
        if (!canLottery()) return;

        if (location.href.search(/plugins/i) == -1) {
            let res = $('#nav a').filter(function () {
                return /插件管理/i.test($(this).text());
            });
            if (res && res.length > 0) {
                //log(res)
                location.href = res[0].href;
            }
        } else {
            if ($('button:contains("喊话")').length > 0) {
                doLongPT();
            } else {
                long_observer();
            }
        }
    }

    setTimeout(function () {
        let host = location.host;
        if (host.search(/qingwa/i) != -1) {
            handleQW();
        } else if (host.search(/lemonhd/i) != -1) {
            handleNM();
        } else if (host.search(/longpt/i) != -1) {
            handleLongPT();
        }
    }, 1500);

})();
