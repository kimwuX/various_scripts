// ==UserScript==
// @name         喊话福利
// @namespace    http://www.kimwu.com/
// @version      1.0.0
// @description  青蛙、织梦等网站求上传、求下载、求魔力等喊话
// @author       kim.wu
// @match       *://qingwapt.com/
// @match       *://new.qingwa.pro/
// @match       *://zmpt.cc/
// @match       *://13city.org/
// @match       *://bilibili.download/
// @match       *://pt.luckpt.de/
// @match       *://cangbao.ge/
// @match       *://dubhe.site/
// @match       *://www.ptskit.org/
// @match       *://qingwapt.com/index.php*
// @match       *://new.qingwa.pro/index.php*
// @match       *://zmpt.cc/index.php*
// @match       *://13city.org/index.php*
// @match       *://13city.org/medal.php*
// @match       *://bilibili.download/index.php*
// @match       *://pt.luckpt.de/index.php*
// @match       *://cangbao.ge/index.php*
// @match       *://dubhe.site/index.php*
// @match       *://www.ptskit.org/index.php*
// @grant        GM_setValue
// @grant        GM_getValue
// @grant        GM_deleteValue
// @grant        GM_notification
// @grant        GM_registerMenuCommand
// @grant        GM_unregisterMenuCommand
// @require      https://code.jquery.com/jquery-1.12.4.js
// @require      https://cdn.jsdelivr.net/gh/kimwuX/various_scripts@master/javascript/library.js
// @icon         https://img1.pixhost.to/images/10104/659998255_7.png
// @run-at       document-end
// ==/UserScript==

class MyApp extends AppBase {
    constructor() {
        super('shout_prize');
        let menu_All = [
            ['sh_up', '求上传喊话', true],
            ['sh_down', '求下载喊话', true],
            ['sh_bonus', '求魔力喊话', true],
            ['sh_vip', '求VIP喊话', true],
        ];
        this.dic_stat = {
            'sh_up': 1,
            'sh_down': 2,
            'sh_bonus': 4,
            'sh_vip': 8,
        };
        this.menu = new Menu(menu_All);
        this.now = new Date();
        this.main();
    }

    isSignable() {
        let re_s = /签\s*到|簽\s*到|打\s*卡|check in/i;
        let re_d = /已|获得|成功|查看|記錄|详情/;
        let res = $('#info_block a').filter(function () {
            return re_s.test(this.textContent) && !re_d.test(this.textContent);
        });

        return res && res.length > 0;
    }

    canShout() {
        const self = this;
        let ds = self.menu.get_data('date');
        if (ds && new Date(ds).toDateString() == self.now.toDateString()) {
            self.log("Aleady shouted.");
            return false;
        }

        //签到优先
        if (self.isSignable()) return false;

        return true;
    }

    matchRegExp(pattern, text) {
        if (text && text.length > 0) {
            return text.match(pattern);
        }
        return null;
    }

    formatValue(act, value) {
        if (/扣减|扣除/.test(act)) {
            return `-${value}`;
        }
        return value;
    }

    getStatValue(key_list) {
        const self = this;
        let stat = 0;
        let temp = self.menu.get_data('date');
        if (new Date(temp).toLocaleDateString() != self.now.toLocaleDateString()) {
            key_list.forEach(key => {
                if (self.menu.get_menu_value(key)) {
                    stat |= self.dic_stat[key];
                }
            });
            self.log(`reset stat to ${stat}`);
            self.menu.set_data('stat', stat);
            self.menu.save_vault();
        }
        stat = self.menu.get_data('stat', 0);
        return stat;
    }

    saveToVault(key, value) {
        const self = this;
        let arr = self.menu.get_str_data(key, []);
        arr.unshift(`${self.now.toLocaleDateString()}:${value}`);
        //保留30天记录
        while(arr.length > 30) {
            arr.pop();
        }
        self.menu.set_str_data(key, arr);
        self.menu.save_vault();
    }

    handleQW() {
        const self = this;
        if (!self.canShout()) return;

        if ($('input#shbox_text').length == 0) return;

        if (self.menu.get_menu_value('sh_up')) {
            $('input#shbox_text').val("蛙总，求上传");
            $('input#hbsubmit').click();
        }
        setTimeout(() => {
            if (self.menu.get_menu_value('sh_down')) {
                $('input#shbox_text').val("蛙总，求下载");
                $('input#hbsubmit').click();
            }

            self.menu.set_data('date', self.now.toLocaleString());
            self.menu.save_vault();
        }, 1500);
    }

    analyzeZM() {
        const self = this;
        let res = 0;
        let stat = self.menu.get_data('stat', 0);
        let user = $('#info_block a[href*="userdetails.php"]').text().trim();
        //self.log(user);
        let rows = $('#iframe-shout-box').contents().find('td.shoutrow');
        //[< 1分钟前]  zmpt @xxx：皮总响应了你的请求，赠送/扣减 你【3998电力】
        let re_bonus = /\[< 1分钟前\]\s*zmpt\s*@(\S+)：皮总响应了你的请求，(赠送|扣减) 你【(\d+)电力】/
        //[< 1分钟前]  zmpt @xxx：皮总响应了你的请求，赠送/扣减 你【10GB上传量】
        let re_up = /\[< 1分钟前\]\s*zmpt\s*@(\S+)：皮总响应了你的请求，(赠送|扣减) 你【(\d+GB)上传量】/
        if ((stat & self.dic_stat['sh_up']) == self.dic_stat['sh_up']) {
            rows.each(function () {
                let match = self.matchRegExp(re_up, $(this).text());
                if (match && match[1] == user) {
                    self.log(match);
                    self.saveToVault('up', self.formatValue(match[2], match[3]));

                    stat ^= self.dic_stat['sh_up'];
                    self.menu.set_data('stat', stat);
                    self.menu.save_vault();
                    res += 1;
                }
            });
        }
        if ((stat & self.dic_stat['sh_bonus']) == self.dic_stat['sh_bonus']) {
            rows.each(function () {
                let match = self.matchRegExp(re_bonus, $(this).text());
                if (match && match[1] == user) {
                    self.log(match);
                    self.saveToVault('bonus', self.formatValue(match[2], match[3]));

                    stat ^= self.dic_stat['sh_bonus'];
                    self.menu.set_data('stat', stat);
                    self.menu.save_vault();
                    res += 1;
                }
            });
        }
        return res > 0;
    }

    handleZM() {
        const self = this;
        let stat = self.getStatValue(['sh_up', 'sh_bonus']);
        self.log(`stat is ${stat}`);
        if (stat < 1) {
            self.log("Aleady shouted.");
            return;
        }

        //签到优先
        if (self.isSignable()) return;

        if ($('input#shbox_text').length == 0) return;

        let temp = self.menu.get_data('date');
        // 上次喊话超过 1 分钟，继续喊话
        if (temp == undefined || self.now - new Date(temp) > 1 * 60 * 1000) {
            if ((stat & self.dic_stat['sh_bonus']) == self.dic_stat['sh_bonus']) {
                $('input#shbox_text').val("皮总，求电力");
                $('input#hbsubmit').click();
            } else if ((stat & self.dic_stat['sh_up']) == self.dic_stat['sh_up']) {
                $('input#shbox_text').val("皮总，求上传");
                $('input#hbsubmit').click();
            }

            self.menu.set_data('date', self.now.toLocaleString());
            self.menu.save_vault();

            let t = Date.now();
            let id = setInterval(() => {
                self.log(`handleZM: ${Date.now() - t}`);
                if (Date.now() - t > 60000) { //timeout
                    self.log('timeout.');
                    clearInterval(id);
                }

                if (self.analyzeZM()) {
                    clearInterval(id);
                } else {
                    $('input#hbsubmit').click();
                }
            }, 5000);
        }
    }

    observer_13city() {
        const self = this;
        let ob = new Observer(function(list_add, list_remove) {
            let target = $('div.layui-layer.layui-layer-dialog.layui-layer-molv');
            list_add.forEach(node => {
                target.each(function () {
                    if (node == this) {
                        self.log(node);
                        if ($(this).find('div:contains("购买确认")').length > 0) {
                            let btn = $(this).find('a.layui-layer-btn0');
                            if (btn.length > 0) {
                                self.menu.set_data('temp', Date.now());
                                self.menu.save_vault();
                                btn[0].click();
                            }
                        }
                    }
                });
            });
        });
        ob.observe(document.body);
    }

    buy13CityMedal() {
        const self = this;
        self.log('buy13CityMedal');

        let offset = Date.now() - self.menu.get_data('temp');
        self.log(`${offset/1000}s`);
        if (!isNaN(offset) && offset < 60000) {
            $('button.buy[data-id="11"]').each(function () {
                self.log(this);
                if (/已经购买/i.test($(this).text())) {
                    // 7*24*60*60*1000=604800000
                    let exp = new Date(self.now.getTime() + 604800000);
                    self.menu.set_data('medal', exp.toLocaleString());
                    self.menu.delete_data('temp');
                    self.menu.save_vault();
                }
            });
        } else {
            $('button.buy[data-id="11"]').filter(function () {
                return !$(this).prop('disabled');
            }).first().each(function () {
                self.observer_13city();
                this.click();
            });
        }
    }

    handle13City() {
        const self = this;
        if (!self.canShout()) return;

        let offset = new Date(self.menu.get_data('medal')) - self.now;
        if (isNaN(offset) || offset < 0) {
            self.log('medal has expired.');
            if (location.href.search(/medal/i) != -1) {
                self.buy13CityMedal();
            } else {
                $('#info_block a').filter(function () {
                    return /\[勋章\]/i.test($(this).text());
                }).each(function () {
                    this.click();
                });
            }
            return;
        }
        // 24*60*60=86400000
        self.log(`medal has ${(offset/86400000).toFixed(2)} days left.`);

        if ($('input#shbox_text').length == 0) return;

        if (self.menu.get_menu_value('sh_bonus')) {
            $('input#shbox_text').val("掌管啤酒瓶的神请赐予我啤酒瓶");
            $('input#hbsubmit').click();
        }

        self.menu.set_data('date', self.now.toLocaleString());
        self.menu.save_vault();

        setTimeout(() => {
            let user = $('#info_block a[href*="userdetails.php"]').text().trim();
            self.log(user);
            //[< 1分钟前]  掌管啤酒瓶的神 @xxx 听到了你的愿望，增加了-39啤酒瓶
            let re_bonus = /\[< 1分钟前\]\s*掌管啤酒瓶的神\s*@(\S+)\s+听到了你的愿望，增加了(-?\d+)啤酒瓶/
            $('#iframe-shout-box').contents().find('td.shoutrow').each(function () {
                let match = self.matchRegExp(re_bonus, $(this).text());
                if (match && match[1] == user) {
                    self.log(match);
                    self.saveToVault('bonus', match[2]);
                }
            });
        }, 3000);
    }

    handleRailgun() {
        const self = this;
        if (!self.canShout()) return;

        if ($('input#shbox_text').length == 0) return;

        if (self.menu.get_menu_value('sh_up')) {
            $('input#shbox_text').val("炮姐，求上传");
            $('input#hbsubmit').click();
        }
        setTimeout(() => {
            if (self.menu.get_menu_value('sh_bonus')) {
                $('input#shbox_text').val("炮姐，求魔力");
                $('input#hbsubmit').click();
            }
        }, 1500);
        setTimeout(() => {
            if (self.menu.get_menu_value('sh_vip')) {
                $('input#shbox_text').val("炮姐，求永V");
                $('input#hbsubmit').click();
            }

            self.menu.set_data('date', self.now.toLocaleString());
            self.menu.save_vault();
        }, 3000);

        setTimeout(() => {
            let user = $('#info_block a[href*="userdetails.php"]').text().trim();
            self.log(user);
            //[< 1分钟前]  炮姐 @xxx 炮姐很开心，已赠送你 103 魔力值！
            let re_bonus = /\[< 1分钟前\]\s*炮姐\s*@(\S+)\s+炮姐很开心，已赠送你\s*(\d+)\s*魔力值/
            //[< 1分钟前]  炮姐 @xxx 炮姐很开心，已赠送你 314572800 B上传量！
            let re_up = /\[< 1分钟前\]\s*炮姐\s*@(\S+)\s+炮姐很开心，已赠送你\s*(\d+)\s*B上传量/
            //[< 1分钟前]  炮姐 @xxx 恭喜！炮姐的硬币射中了你，获得 7 天 VIP！
            let re_vip1 = /\[< 1分钟前\]\s*炮姐\s*@(\S+)\s+恭喜！炮姐的硬币射中了你，获得\s*(.+?)！/
            //[< 1分钟前]  炮姐 @xxx 没有抽中永V，炮姐决定安慰你一下，已赠送你 134 魔力值！
            //[< 1分钟前]  炮姐 @xxx 没有抽中永V，炮姐很伤心，扣除了你 50 魔力值！
            let re_vip2 = /\[< 1分钟前\]\s*炮姐\s*@(\S+)\s+没有抽中永V，炮姐.*?(赠送|扣除).*?你\s*(.+?)！/
            $('#iframe-shout-box').contents().find('td.shoutrow').each(function () {
                let match = self.matchRegExp(re_bonus, $(this).text());
                if (match && match[1] == user) {
                    self.log(match);
                    self.saveToVault('bonus', match[2]);
                }
                match = self.matchRegExp(re_up, $(this).text());
                if (match && match[1] == user) {
                    self.log(match);
                    self.saveToVault('up', `${parseInt(match[2])/1024/1024}MB`);
                }
                match = self.matchRegExp(re_vip1, $(this).text());
                if (match && match[1] == user) {
                    self.log(match);
                    self.saveToVault('vip', match[2].replace(/\s+/g, ''));
                }
                match = self.matchRegExp(re_vip2, $(this).text());
                if (match && match[1] == user) {
                    self.log(match);
                    self.saveToVault('vip', self.formatValue(match[2], match[3].replace(/\s+/g, '')));
                }
            });
        }, 6000);
    }

    handleLuck() {
        const self = this;
        if (!self.canShout()) return;

        if ($('input#shbox_text').length == 0) return;

        if (self.menu.get_menu_value('sh_bonus')) {
            $('input#shbox_text').val("幸运池祈愿");
            $('input#hbsubmit').click();
        }

        self.menu.set_data('date', self.now.toLocaleString());
        self.menu.save_vault();

        setTimeout(() => {
            let user = $('#info_block a[href*="userdetails.php"]').text().trim();
            self.log(user);
            //@xxx 幸运池听到了你的愿望，增加了800.6幸运星
            let re_bonus = /@(\S+)\s+幸运池听到了你的愿望，增加了([\d\.]+)幸运星/
            $('#iframe-shout-box').contents().find('div.wish-bubble-system').each(function () {
                let match = self.matchRegExp(re_bonus, $(this).text());
                if (match && match[1] == user) {
                    self.log(match);
                    self.saveToVault('bonus', match[2]);
                }
            });
        }, 3000);
    }

    analyzeCBG() {
        const self = this;
        let res = 0;
        let user = $('#info_block a[href*="userdetails.php"]').text().trim();
        //self.log(user);
        //[< 1分钟前]  系统: 响应了 xxx 的请求，奖励 3 魔力值！
        let re_bonus = /\[< 1分钟前\]\s*系统: 响应了\s*(\S+)\s*的请求，奖励\s*(\d+)\s*魔力值/
        //[< 1分钟前]  系统: 响应了 xxx 的请求，奖励 2 GB上传！
        let re_up = /\[< 1分钟前\]\s*系统: 响应了 \s*(\S+)\s*的请求，奖励\s*(\d+)\s*GB上传/
        $('#iframe-shout-box').contents().find('td.shoutrow').each(function () {
            let match = self.matchRegExp(re_up, $(this).text());
            if (match && match[1] == user) {
                self.log(match);
                self.saveToVault('up', match[2] + 'GB');
                res += 1;
            }
            match = self.matchRegExp(re_bonus, $(this).text());
            if (match && match[1] == user) {
                self.log(match);
                self.saveToVault('bonus', match[2]);
                res += 1;
            }
        });
        return res > 0;
    }

    handleCBG() {
        const self = this;
        let stat = self.getStatValue(['sh_up', 'sh_bonus']);
        self.log(`stat is ${stat}`);
        if (stat < 1) {
            self.log("Aleady shouted.");
            return;
        }

        //签到优先
        if (self.isSignable()) return;

        if ($('input#shbox_text').length == 0) return;

        let temp = self.menu.get_data('date');
        // 上次喊话超过 1 分钟，继续喊话
        if (temp == undefined || self.now - new Date(temp) > 1 * 60 * 1000) {
            if ((stat & self.dic_stat['sh_up']) == self.dic_stat['sh_up']) {
                $('input#shbox_text').val("阁主，求上传");
                $('input#hbsubmit').click();

                stat ^= self.dic_stat['sh_up'];
                self.menu.set_data('stat', stat);
            } else if ((stat & self.dic_stat['sh_bonus']) == self.dic_stat['sh_bonus']) {
                $('input#shbox_text').val("阁主，求魔力");
                $('input#hbsubmit').click();

                stat ^= self.dic_stat['sh_bonus'];
                self.menu.set_data('stat', stat);
            }

            self.menu.set_data('date', self.now.toLocaleString());
            self.menu.save_vault();

            let t = Date.now();
            let id = setInterval(() => {
                self.log(`handleCBG: ${Date.now() - t}`);
                if (Date.now() - t > 60000) { //timeout
                    self.log('timeout.');
                    clearInterval(id);
                }

                if (self.analyzeCBG()) {
                    clearInterval(id);
                } else {
                    $('input#hbsubmit').click();
                }
            }, 5000);
        }
    }

    analyzeTS() {
        const self = this;
        let res = 0;
        let user = $('#info_block a[href*="userdetails.php"]').text().trim();
        //self.log(user);
        //[< 1分钟前]  🔍✨💚📥admin 奇迹发生了！xxx获得了神明赠送的949点魔力值！
        //[< 1分钟前]  🔍✨💚📥admin 天降祥瑞！xxx获得了神明赠送的796点魔力值！
        //[< 1分钟前]  🔍✨💚📥admin 神明被xxx的坚持感动，送出了392点魔力值！
        //[< 1分钟前]  🔍✨💚📥admin xxx的诚心感动了天地，获得了639点魔力值奖励！
        //[< 1分钟前]  🔍✨💚📥admin xxx的虔诚打动了神明，获得了325点魔力值！
        //[< 1分钟前]  🔍✨💚📥admin xxx的感言感动了神明，获得了941点魔力值！
        //[< 1分钟前]  🔍✨💚📥admin xxx的愿望实现了！神明赐予了1109点魔力值！
        let re_bonus = /\[< 1分钟前\]\W*admin .*?(\w+).*?(\d+)点魔力值/
        //[< 1分钟前]  🔍✨💚📥admin 神明听到了xxx的呼唤，慷慨地送出了50MB上传量！
        //[< 1分钟前]  🔍✨💚📥admin 神明被xxx的真诚打动，赐予了50MB上传量！
        //[< 1分钟前]  🔍✨💚📥admin xxx的祈祷得到了回应，神明送来了50MB上传量！
        let re_up = /\[< 1分钟前\]\W*admin .*?(\w+).*?(\d+)MB上传量/
        $('#iframe-shout-box').contents().find('td.shoutrow').each(function () {
            let match = self.matchRegExp(re_up, $(this).text());
            if (match && match[1] == user) {
                self.log(match);
                self.saveToVault('up', match[2] + 'MB');
                res += 1;
            }
            match = self.matchRegExp(re_bonus, $(this).text());
            if (match && match[1] == user) {
                self.log(match);
                self.saveToVault('bonus', match[2]);
                res += 1;
            }
        });
        return res > 0;
    }

    handleTS() {
        const self = this;
        let stat = self.getStatValue(['sh_up', 'sh_bonus']);
        self.log(`stat is ${stat}`);
        if (stat < 1) {
            self.log("Aleady shouted.");
            return;
        }

        //签到优先
        if (self.isSignable()) return;

        if ($('input#shbox_text').length == 0) return;

        let temp = self.menu.get_data('date');
        // 上次喊话超过 1 分钟，继续喊话
        if (temp == undefined || self.now - new Date(temp) > 1 * 60 * 1000) {
            if ((stat & self.dic_stat['sh_up']) == self.dic_stat['sh_up']) {
                $('input#shbox_text').val("天枢娘 求上传");
                $('input#hbsubmit').click();

                stat ^= self.dic_stat['sh_up'];
                self.menu.set_data('stat', stat);
            } else if ((stat & self.dic_stat['sh_bonus']) == self.dic_stat['sh_bonus']) {
                $('input#shbox_text').val("天枢娘 求魔力");
                $('input#hbsubmit').click();

                stat ^= self.dic_stat['sh_bonus'];
                self.menu.set_data('stat', stat);
            }

            self.menu.set_data('date', self.now.toLocaleString());
            self.menu.save_vault();

            let t = Date.now();
            let id = setInterval(() => {
                self.log(`handleTS: ${Date.now() - t}`);
                if (Date.now() - t > 60000) { //timeout
                    self.log('timeout.');
                    clearInterval(id);
                }

                if (self.analyzeTS()) {
                    clearInterval(id);
                } else {
                    $('input#hbsubmit').click();
                }
            }, 5000);
        }
    }

    handlePTSKit() {
        const self = this;
        if (!self.canShout()) return;

        if ($('input#shbox_text').length == 0) return;

        if (self.menu.get_menu_value('sh_bonus')) {
            $('input#shbox_text').val("短剧第一站");
            $('input#hbsubmit').click();
        }

        self.menu.set_data('date', self.now.toLocaleString());
        self.menu.save_vault();

        setTimeout(() => {
            let user = $('#info_block a[href*="userdetails.php"]').text().trim();
            self.log(user);
            //[< 1分钟前]  [系统] 恭喜用户「xxx」触发关键词「短剧第一站」，获得291点魔力值！
            let re_bonus = /\[< 1分钟前\]\s*\[系统\] 恭喜用户「(\S+)」触发关键词「短剧第一站」，获得(\d+)点魔力值/
            $('#iframe-shout-box').contents().find('td.shoutrow').each(function () {
                let match = self.matchRegExp(re_bonus, $(this).text());
                if (match && match[1] == user) {
                    self.log(match);
                    self.saveToVault('bonus', match[2]);
                }
            });
        }, 3000);
    }

    main() {
        const self = this;
        let host = location.host;
        if (host.search(/qingwa/i) != -1) {
            self.handleQW();
        } else if (host.search(/zmpt/i) != -1) {
            self.handleZM();
        } else if (host.search(/13city/i) != -1) {
            self.handle13City();
        } else if (host.search(/bilibili/i) != -1) {
            self.handleRailgun();
        } else if (host.search(/luckpt/i) != -1) {
            self.handleLuck();
        } else if (host.search(/cangbao/i) != -1) {
            self.handleCBG();
        } else if (host.search(/dubhe/i) != -1) {
            self.handleTS();
        } else if (host.search(/ptskit/i) != -1) {
            self.handlePTSKit();
        }
    }
}

setTimeout(function () {
    new MyApp();
}, 3000);
