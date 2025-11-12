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
// @match       *://longpt.org/*
// @match       *://pt.0ff.cc/*
// @match       *://pt.lajidui.top/*
// @match       *://pt.novahd.top/*
// @exclude     */fun.php*
// @exclude     */shoutbox.php*
// @grant        GM_setValue
// @grant        GM_getValue
// @grant        GM_deleteValue
// @grant        GM_notification
// @grant        GM_registerMenuCommand
// @grant        GM_unregisterMenuCommand
// @require      https://code.jquery.com/jquery-1.12.4.js
// @require      https://cdn.jsdelivr.net/gh/kimwuX/various_scripts@master/js/library.js
// @icon         https://img1.pixhost.to/images/10104/659998258_9.png
// @run-at       document-end
// ==/UserScript==

(function () {
    let menu_All = [
        ['on', '自动认领任务', true],
    ];
    let menu = new Menu(menu_All);

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
            func(`---claim_mission---\n[${new Date().toLocaleTimeString()}] ${data}`);
        }
    }

    function isSignable() {
        let re_s = /签\s*到|簽\s*到|打\s*卡|check in/i;
        let re_d = /已|获得|成功|查看|記錄|详情/;
        let res = $('#info_block a').filter(function () {
            return re_s.test(this.textContent) && !re_d.test(this.textContent);
        });

        return res && res.length > 0;
    }

    function canClaim() {
        //签到优先
        if (isSignable()) return false;

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
            log(task)
            return false;
        }

        return true;
    }

    function ly_observer() {
        let ob = new Observer(function(list_add, list_remove) {
            let target = $('div.layui-layer.layui-layer-dialog');
            list_add.forEach(node => {
                target.each(function() {
                    if (node == this) {
                        log(node);
                        let btn = $(this).find('a.layui-layer-btn0');
                        if (btn.length > 0) {
                            log(btn);
                            btn[0].click();

                            menu.set_data('date', new Date().toLocaleString());
                            menu.save_vault();
                        }
                    }
                });
            });
        });
        ob.observe(document.body);
    }

    function handleTask() {
        if (!canClaim()) return;

        if (location.href.search(/task\.php/i) == -1) {
            $('a[href*="task.php"]').each(function() {
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
            } else if(host.search(/0ff/i) != -1) {
                btn = $('input.claim[data-id="12"]');
            } else if (host.search(/lajidui/i) != -1) {
                btn = $('input.claim[data-id="1"]');
            } else if(host.search(/novahd/i) != -1) {
                btn = $('input.claim[data-id="3"]');
            }
            log(btn)
            if (btn.length > 0) {
                ly_observer();
                setTimeout(() => {
                    btn.click();
                }, 500);
            }
        }
    }

    setTimeout(function () {
        log('claim_mission.');
        if (menu.get_menu_value('on')) {
            handleTask();
        }
    }, 2000);

})();
