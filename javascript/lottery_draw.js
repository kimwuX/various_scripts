// ==UserScript==
// @name         福利抽奖
// @namespace    http://www.kimwu.com/
// @version      1.0.0
// @description  青蛙每日福利，柠檬神游三清天，LongPT每日抽奖
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
// @require      https://cdn.jsdelivr.net/gh/kimwuX/various_scripts@master/javascript/library.js
// @icon         https://img1.pixhost.to/images/10104/659998253_5.png
// @run-at       document-end
// ==/UserScript==

class MyApp extends AppBase {
    constructor() {
        super('lottery_draw');
        this.vault = new Vault();
        this.now = new Date();
        this.main();
    }

    cleanVault() {
        const self = this;
        let rms = [];
        let t1 = self.now.toLocaleDateString();
        for (const key of self.vault.get_keys()) {
            if (self.getDays(key, t1) > 30) {
                rms.push(key);
            }
        }
        if (rms.length > 0) {
            for (const key of rms) {
                self.vault.delete_data(key);
            }
            self.vault.save_vault();
        }
    }

    savePrize(key, value) {
        const self = this;
        let arr = self.vault.get_str_data(key, []);
        arr.unshift(`${self.now.toLocaleDateString()}:${value}`);
        //保留30天记录
        while(arr.length > 30) {
            arr.pop();
        }
        self.vault.set_str_data(key, arr);
        self.vault.save_vault();
    }

    isSignable() {
        let re_s = /签\s*到|簽\s*到|打\s*卡|check in/i;
        let re_d = /已|获得|成功|查看|記錄|详情/;
        let res = $('#info_block a').filter(function () {
            return re_s.test(this.textContent) && !re_d.test(this.textContent);
        });

        return res && res.length > 0;
    }

    canDraw() {
        const self = this;
        let ds = self.vault.get_data('date');
        if (ds && new Date(ds).toDateString() == self.now.toDateString()) {
            self.log("Aleady drawn.");
            return false;
        }

        //签到优先
        if (self.isSignable()) return false;

        return true;
    }

    getDays(date1, date2) {
        var d1 = new Date(date1);
        var d2 = new Date(date2);

        if (!Utils.isValidDate(d1) || !Utils.isValidDate(d2)) {
            return Number.MAX_SAFE_INTEGER;
        }

        // 计算两个日期的时间差（毫秒）
        var timeDiff = Math.abs(d2.getTime() - d1.getTime());
        // 计算天数
        var days = Math.ceil(timeDiff / (1000 * 3600 * 24));
        return days;
    }

    matchRegExp(pattern, text) {
        if (text && text.length > 0) {
            return text.match(pattern);
        }
        return null;
    }

    qw_observer() {
        const self = this;
        let ob = new Observer(function(list_add, list_remove) {
            let target = $('div.layui-layer.layui-layer-page');
            list_add.forEach(node => {
                target.each(function () {
                    if (node == this) {
                        self.log(node);
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

    handleQW() {
        const self = this;
        if (!self.canDraw()) return;

        if (location.href.search(/bonusshop\.php/i) == -1) {
            $('a[href*="bonusshop.php"]').each(function () {
                this.click();
            });
        } else {
            self.log($('div.item:contains("每日福利")'));
            $('div.item:contains("每日福利")').each(function () {
                let num = $(this).find('li[title="限购"]').text().trim();
                self.log(`限购：${num}`);
                if (num == '0') {
                    self.vault.set_data('date', self.now.toLocaleString());
                    self.vault.save_vault();
                } else {
                    self.qw_observer();
                    setTimeout(() => {
                        $(this).find('button').click();
                    }, 500);
                }
            });
        }
    }

    handleNM() {
        const self = this;
        let res = $('#info_block a').filter(function () {
            return self.isSignable($(this).text());
        });

        //签到优先
        if (res && res.length > 0) return;

        self.cleanVault();

        let t1 = self.now.toLocaleDateString();
        let arr = self.vault.get_str_data(t1, []);
        if (arr && arr.length > 0) {
            self.log("Aleady drawn.");
        } else if (location.href.search(/lottery\.php/i) == -1) {
            res = $('#info_block a').filter(function () {
                return /神游三清天/i.test($(this).text());
            });
            if (res && res.length > 0) {
                res[0].click();
            }
        } else {
            arr.push(self.now.toLocaleTimeString());
            self.vault.set_str_data(t1, arr);
            self.vault.save_vault();

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
                    self.vault.set_str_data(t1, arr);
                    self.vault.save_vault();
                }
            }
        }
    }

    doLongPT() {
        const self = this;
        //求上传、求魔力
        self.log("喊话");
        $('input[placeholder="喊话"]').val("求上传").each(function () {
            this.dispatchEvent(new Event('input'));
        });
        $('button:contains("喊话")').click();

        setTimeout(() => {
            //龙宝响应了你的请求,获得魔力:744.81,[em88]
            //龙宝邦邦给你两拳,获得上传量:-0.33GB,[em51]
            let re_prize = /,获得(.*?),/
            $('p.el-message__content').each(function () {
                self.log(this.textContent);
                let match = self.matchRegExp(re_prize, this.textContent);
                if (match) {
                    self.log(match);
                    self.savePrize('prize', match[1]);
                }
            });

            self.log("参与抽奖");
            $('button:contains("立即参与")').click();

            self.vault.set_data('date', self.now.toLocaleString());
            self.vault.save_vault();
        }, 1500);
    }

    long_observer() {
        const self = this;
        self.log("long_observer1");
        let ob = new Observer(function(list_add, list_remove) {
            let target = $('main.el-main > section.el-container');
            list_add.forEach(node => {
                target.each(function () {
                    if (node == this) {
                        self.log("long_observer2");
                        self.log(node);
                        self.doLongPT();
                    }
                });
            });
        });
        ob.observe(document.body);
    }

    handleLongPT() {
        const self = this;
        if (!self.canDraw()) return;

        if (location.href.search(/plugins/i) == -1) {
            let res = $('#nav a').filter(function () {
                return /插件管理/i.test($(this).text());
            });
            if (res && res.length > 0) {
                //self.log(res);
                location.href = res[0].href;
            }
        } else {
            if ($('button:contains("喊话")').length > 0) {
                self.doLongPT();
            } else {
                self.long_observer();
            }
        }
    }

    main() {
        const self = this;
        let host = location.host;
        if (host.search(/qingwa/i) != -1) {
            self.handleQW();
        } else if (host.search(/lemonhd/i) != -1) {
            self.handleNM();
        } else if (host.search(/longpt/i) != -1) {
            self.handleLongPT();
        }
    }
}

setTimeout(function () {
    new MyApp();
}, 1500);
