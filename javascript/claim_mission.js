// ==UserScript==
// @name         自动认领任务
// @namespace    http://www.kimwu.com/
// @version      1.0.0
// @description  自动认领周期任务
// @author       kim.wu
// @match       *://13city.org/*
// @match       *://cangbao.ge/*
// @match       *://carpt.net/*
// @match       *://crabpt.vip/*
// @match       *://cspt.top/*
// @match       *://farmm.cc/*
// @match       *://longpt.org/*
// @match       *://pt.0ff.cc/*
// @match       *://pt.lajidui.top/*
// @match       *://pt.novahd.top/*
// @match       *://www.ptskit.org/*
// @match       *://www.ptlover.cc/*
// @exclude     */fun.php*
// @exclude     */shoutbox.php*
// @grant        GM_setValue
// @grant        GM_getValue
// @grant        GM_deleteValue
// @grant        GM_notification
// @grant        GM_registerMenuCommand
// @grant        GM_unregisterMenuCommand
// @require      https://code.jquery.com/jquery-1.12.4.js
// @require      https://cdn.jsdelivr.net/gh/kimwuX/various_scripts@master/javascript/library.js
// @icon         https://img1.pixhost.to/images/10104/659998258_9.png
// @run-at       document-end
// ==/UserScript==

class MyApp extends AppBase {
    constructor() {
        super('claim_mission');
        let menu_All = [
            ['on', '自动认领任务', true],
        ];
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

    canClaim() {
        const self = this;
        //签到优先
        if (self.isSignable()) return false;

        //存在进行中的任务
        let task = null;
        let host = location.host;
        let reg = /名称.*\n时间.*\n指标/
        if(host.search(/carpt/i) != -1) {
            task = $('td.outer a[href*="messages.php"]').filter(function () {
                return reg.test(this.textContent);
            });
        } else if(host.search(/cspt/i) != -1) {
            task = $('a.msgalert_text').filter(function () {
                return reg.test(this.textContent);
            });
        } else {
            task = $('td.outer a[href*="task.php"]').filter(function () {
                return reg.test(this.textContent);
            });
        }
        if (task && task.length > 0) {
            self.log(task);
            return false;
        }

        //特殊站点判断
        if(host.search(/0ff|farmm/i) != -1) {
            //周循环任务
            return self.now.getDay() == 1;
        }

        return true;
    }

    ly_observer() {
        const self = this;
        let ob = new Observer(function(list_add, list_remove) {
            let target = $('div.layui-layer.layui-layer-dialog');
            list_add.forEach(node => {
                target.each(function () {
                    if (node == this) {
                        self.log(node);
                        let btn = $(this).find('a.layui-layer-btn0');
                        if (btn.length > 0) {
                            self.log(btn);
                            btn[0].click();

                            self.menu.set_data('date', new Date().toLocaleString());
                            self.menu.save_vault();
                        }
                    }
                });
            });
        });
        ob.observe(document.body);
    }

    handleTask() {
        const self = this;
        if (!self.canClaim()) return;

        if (location.href.search(/task\.php/i) == -1) {
            $('a[href*="task.php"]').each(function () {
                this.click();
            });
        } else {
            let btn = null;
            let host = location.host;
            if(host.search(/13city/i) != -1) {
                btn = $('input.claim[data-id="6"]');
            } else if(host.search(/cangbao/i) != -1) {
                btn = $('input.claim[data-id="12"]');
            } else if(host.search(/carpt/i) != -1) {
                btn = $('input.claim[data-id="5"]');
            } else if(host.search(/crabpt/i) != -1) {
                btn = $('input.claim[data-id="11"]');
            } else if(host.search(/cspt/i) != -1) {
                btn = $('input.claim[data-id="6"]');
            } else if(host.search(/longpt/i) != -1) {
                btn = $('input.claim[data-id="2"]');
            } else if(host.search(/0ff|farmm/i) != -1) {
                btn = $('input.claim[data-id="12"]');
            } else if (host.search(/lajidui/i) != -1) {
                btn = $('input.claim[data-id="1"]');
            } else if(host.search(/novahd/i) != -1) {
                btn = $('input.claim[data-id="3"]');
            } else if(host.search(/ptskit/i) != -1) {
                btn = $('input.claim[data-id="12"]');
            } else if(host.search(/ptlover/i) != -1) {
                btn = $('input.claim[data-id="10"]');
            }
            self.log(btn);
            if (btn.length > 0) {
                self.ly_observer();
                setTimeout(() => {
                    btn.click();
                }, 500);
            }
        }
    }

    main() {
        const self = this;
        if (self.menu.get_menu_value('on')) {
            self.handleTask();
        }
    }
}

setTimeout(function () {
    new MyApp();
}, 2000);
