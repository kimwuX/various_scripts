// ==UserScript==
// @name         自动喊话
// @namespace    http://www.kimwu.com/
// @version      1.0.0
// @description  青蛙、织梦自动喊话
// @author       kim.wu
// @match       *://qingwapt.com/
// @match       *://new.qingwa.pro/
// @match       *://zmpt.cc/
// @match       *://13city.org/
// @match       *://bilibili.download/
// @match       *://pt.luckpt.de/
// @match       *://cangbao.ge/
// @match       *://qingwapt.com/index.php*
// @match       *://new.qingwa.pro/index.php*
// @match       *://zmpt.cc/index.php*
// @match       *://13city.org/index.php*
// @match       *://bilibili.download/index.php*
// @match       *://pt.luckpt.de/index.php*
// @match       *://cangbao.ge/index.php*
// @grant        GM_setValue
// @grant        GM_getValue
// @grant        GM_deleteValue
// @grant        GM_notification
// @grant        GM_registerMenuCommand
// @grant        GM_unregisterMenuCommand
// @require      https://code.jquery.com/jquery-1.12.4.js
// @require      https://cdn.jsdelivr.net/gh/kimwuX/various_scripts@master/js/library.js
// @icon         https://img101.pixhost.to/images/410/552674185__trumpet.png
// @run-at       document-end
// ==/UserScript==

(function () {
    let menu_All = [
        ['sh_up', '求上传喊话', true],
        ['sh_down', '求下载喊话', true],
        ['sh_bonus', '求魔力喊话', true],
        ['sh_vip', '求VIP喊话', true],
    ];
    let dic_stat = {
        'sh_up': 1,
        'sh_down': 2,
        'sh_bonus': 4,
        'sh_vip': 8,
    };
    let menu = new Menu(menu_All);
    let now = new Date();

    function isSignable(str) {
        return /签\s*到|簽\s*到|打\s*卡|check in/i.test(str) && !/已|获得|成功|查看|記錄|详情/.test(str);
    }

    function canShout() {
        let res = $('#info_block a').filter(function () {
            return isSignable($(this).text());
        });

        //签到优先
        if (res && res.length > 0) return false;

        let ds = menu.get_data('date');
        if (ds && new Date(ds).toDateString() == now.toDateString()) {
            console.log("Aleady shouted.");
            return false;
        }

        return true;
    }

    function matchRegExp(pattern, text) {
        if (text && text.length > 0) {
            return text.match(pattern);
        }
        return null;
    }

    function formatValue(act, value) {
        if (/扣减|扣除/.test(act)) {
            return `-${value}`;
        }
        return value;
    }

    function getStatValue(key_list) {
        let stat = 0;
        let temp = menu.get_data('temp');
        if (new Date(temp).toLocaleDateString() != now.toLocaleDateString()) {
            key_list.forEach(key => {
                if (menu.get_menu_value(key)) {
                    stat |= dic_stat[key];
                }
            });
            console.log(`reset stat to ${stat}`);
            menu.set_data('stat', stat);
            menu.save_vault();
        }
        stat = menu.get_data('stat', 0);
        return stat;
    }

    function saveToVault(key, value) {
        let arr = menu.get_str_data(key, []);
        arr.push(`${now.toLocaleDateString()}:${value}`);
        //保留30天记录
        while(arr.length > 30) {
            arr.shift();
        }
        menu.set_str_data(key, arr);
        menu.save_vault();
    }

    function handleQW() {
        if (!canShout()) return;

        if (menu.get_menu_value('sh_up')) {
            $('input#shbox_text').val("蛙总，求上传");
            $('input#hbsubmit').click();
        }
        setTimeout(() => {
            if (menu.get_menu_value('sh_down')) {
                $('input#shbox_text').val("蛙总，求下载");
                $('input#hbsubmit').click();
            }

            menu.set_data('date', now.toLocaleString());
            menu.save_vault();
        }, 1500);
    }

    function analyzeZM() {
        let res = 0;
        let stat = menu.get_data('stat', 0);
        let user = $('#info_block a[href*="userdetails.php"]').text().trim();
        console.log(user);
        let rows = $('#iframe-shout-box').contents().find('td.shoutrow');
        //[< 1分钟前]  zmpt @xxx：皮总响应了你的请求，赠送/扣减 你【3998电力】
        let re_bonus = /\[< 1分钟前\]\s*zmpt\s*@(\S+)：皮总响应了你的请求，(赠送|扣减) 你【(\d+)电力】/
        //[< 1分钟前]  zmpt @xxx：皮总响应了你的请求，赠送/扣减 你【10GB上传量】
        let re_up = /\[< 1分钟前\]\s*zmpt\s*@(\S+)：皮总响应了你的请求，(赠送|扣减) 你【(\d+GB)上传量】/
        if ((stat & dic_stat['sh_up']) == dic_stat['sh_up']) {
            rows.each(function() {
                let match = matchRegExp(re_up, $(this).text());
                if (match && match[1] == user) {
                    console.log(match);
                    saveToVault('up', formatValue(match[2], match[3]));

                    stat ^= dic_stat['sh_up'];
                    menu.set_data('stat', stat);
                    menu.save_vault();
                    res += 1;
                }
            });
        }
        if ((stat & dic_stat['sh_bonus']) == dic_stat['sh_bonus']) {
            rows.each(function() {
                let match = matchRegExp(re_bonus, $(this).text());
                if (match && match[1] == user) {
                    console.log(match);
                    saveToVault('bonus', formatValue(match[2], match[3]));

                    stat ^= dic_stat['sh_bonus'];
                    menu.set_data('stat', stat);
                    menu.save_vault();
                    res += 1;
                }
            });
        }
        if (stat < 1) {
            menu.set_data('date', now.toLocaleString());
            menu.save_vault();
        }
        return res > 0;
    }

    function handleZM() {
        if (!canShout()) return;

        let stat = getStatValue(['sh_up', 'sh_bonus']);
        console.log(stat);

        let temp = menu.get_data('temp');
        // 上次喊话超过 1 分钟，继续喊话
        if (temp == undefined || now - new Date(temp) > 1 * 60 * 1000) {
            if ((stat & dic_stat['sh_up']) == dic_stat['sh_up']) {
                $('input#shbox_text').val("皮总，求上传");
                $('input#hbsubmit').click();
            } else if ((stat & dic_stat['sh_bonus']) == dic_stat['sh_bonus']) {
                $('input#shbox_text').val("皮总，求电力");
                $('input#hbsubmit').click();
            }

            menu.set_data('temp', now.toLocaleString());
            menu.save_vault();

            let t = Date.now();
            let id = setInterval(() => {
                console.log(`handleZM: ${Date.now() - t}`);
                if (Date.now() - t > 60000) { //timeout
                    clearInterval(id);
                }

                if (analyzeZM()) {
                    clearInterval(id);
                } else {
                    $('input#hbsubmit').click();
                }
            }, 5000);
        }
    }

    function handle13City() {
        if (!canShout()) return;

        if (menu.get_menu_value('sh_bonus')) {
            $('input#shbox_text').val("掌管啤酒瓶的神请赐予我啤酒瓶");
            $('input#hbsubmit').click();
        }

        menu.set_data('date', now.toLocaleString());
        menu.save_vault();

        setTimeout(() => {
            let user = $('#info_block a[href*="userdetails.php"]').text().trim();
            console.log(user);
            //[< 1分钟前]  掌管啤酒瓶的神 @xxx 掌管啤酒瓶的神听到了你的愿望，增加了-39啤酒瓶
            let re_bonus = /\[< 1分钟前\]\s*掌管啤酒瓶的神\s*@(\S+)\s+掌管啤酒瓶的神听到了你的愿望，增加了(-?\d+)啤酒瓶/
            $('#iframe-shout-box').contents().find('td.shoutrow').each(function() {
                let match = matchRegExp(re_bonus, $(this).text());
                if (match && match[1] == user) {
                    console.log(match);
                    saveToVault('bonus', match[2]);
                }
            });
        }, 3000);
    }

    function handleRailgun() {
        if (!canShout()) return;

        if (menu.get_menu_value('sh_up')) {
            $('input#shbox_text').val("炮姐，求上传");
            $('input#hbsubmit').click();
        }
        setTimeout(() => {
            if (menu.get_menu_value('sh_bonus')) {
                $('input#shbox_text').val("炮姐，求魔力");
                $('input#hbsubmit').click();
            }
        }, 1500);
        setTimeout(() => {
            if (menu.get_menu_value('sh_vip')) {
                $('input#shbox_text').val("炮姐，求永V");
                $('input#hbsubmit').click();
            }

            menu.set_data('date', now.toLocaleString());
            menu.save_vault();
        }, 3000);

        setTimeout(() => {
            let user = $('#info_block a[href*="userdetails.php"]').text().trim();
            console.log(user);
            //[< 1分钟前]  炮姐 @xxx 炮姐很开心，已赠送你 103 魔力值！
            let re_bonus = /\[< 1分钟前\]\s*炮姐\s*@(\S+)\s+炮姐很开心，已赠送你\s*(\d+)\s*魔力值/
            //[< 1分钟前]  炮姐 @xxx 炮姐很开心，已赠送你 314572800 B上传量！
            let re_up = /\[< 1分钟前\]\s*炮姐\s*@(\S+)\s+炮姐很开心，已赠送你\s*(\d+)\s*B上传量/
            //[< 1分钟前]  炮姐 @xxx 恭喜！炮姐的硬币射中了你，获得 7 天 VIP！
            let re_vip1 = /\[< 1分钟前\]\s*炮姐\s*@(\S+)\s+恭喜！炮姐的硬币射中了你，获得\s*(.+?)！/
            //[< 1分钟前]  炮姐 @xxx 没有抽中永V，炮姐决定安慰你一下，已赠送你 134 魔力值！
            //[< 1分钟前]  炮姐 @xxx 没有抽中永V，炮姐很伤心，扣除了你 50 魔力值！
            let re_vip2 = /\[< 1分钟前\]\s*炮姐\s*@(\S+)\s+没有抽中永V，炮姐.*?(赠送|扣除).*?你\s*(.+?)！/
            $('#iframe-shout-box').contents().find('td.shoutrow').each(function() {
                let match = matchRegExp(re_bonus, $(this).text());
                if (match && match[1] == user) {
                    console.log(match);
                    saveToVault('bonus', match[2]);
                }
                match = matchRegExp(re_up, $(this).text());
                if (match && match[1] == user) {
                    console.log(match);
                    saveToVault('up', `${parseInt(match[2])/1024/1024}MB`);
                }
                match = matchRegExp(re_vip1, $(this).text());
                if (match && match[1] == user) {
                    console.log(match);
                    saveToVault('vip', match[2].replace(/\s+/g, ''));
                }
                match = matchRegExp(re_vip2, $(this).text());
                if (match && match[1] == user) {
                    console.log(match);
                    saveToVault('vip', formatValue(match[2], match[3].replace(/\s+/g, '')));
                }
            });
        }, 6000);
    }

    function handleLuck() {
        if (!canShout()) return;

        if (menu.get_menu_value('sh_bonus')) {
            $('input#shbox_text').val("幸运池祈愿");
            $('input#hbsubmit').click();
        }

        menu.set_data('date', now.toLocaleString());
        menu.save_vault();

        setTimeout(() => {
            let user = $('#info_block a[href*="userdetails.php"]').text().trim();
            console.log(user);
            //@xxx 幸运池听到了你的愿望，增加了800.6幸运星
            let re_bonus = /@(\S+)\s+幸运池听到了你的愿望，增加了([\d\.]+)幸运星/
            $('#iframe-shout-box').contents().find('div.wish-bubble-system').each(function() {
                let match = matchRegExp(re_bonus, $(this).text());
                if (match && match[1] == user) {
                    console.log(match);
                    saveToVault('bonus', match[2]);
                }
            });
        }, 3000);
    }

    function analyzeCBG() {
        let res = 0;
        let stat = menu.get_data('stat', 0);
        let user = $('#info_block a[href*="userdetails.php"]').text().trim();
        console.log(user);
        let rows = $('#iframe-shout-box').contents().find('td.shoutrow');
        //[< 1分钟前]  系统: 响应了 xxx 的请求，奖励 3 魔力值！
        let re_bonus = /\[< 1分钟前\]\s*系统: 响应了\s*(\S+)\s*的请求，奖励\s*(\d+)\s*魔力值/
        //[< 1分钟前]  系统: 响应了 xxx 的请求，奖励 2 GB上传！
        let re_up = /\[< 1分钟前\]\s*系统: 响应了 \s*(\S+)\s*的请求，奖励\s*(\d+)\s*GB上传/
        if ((stat & dic_stat['sh_up']) == dic_stat['sh_up']) {
            rows.each(function() {
                let match = matchRegExp(re_up, $(this).text());
                if (match && match[1] == user) {
                    console.log(match);
                    saveToVault('up', match[2] + 'GB');

                    stat ^= dic_stat['sh_up'];
                    menu.set_data('stat', stat);
                    menu.save_vault();
                    res += 1;
                }
            });
        }
        if ((stat & dic_stat['sh_bonus']) == dic_stat['sh_bonus']) {
            rows.each(function() {
                let match = matchRegExp(re_bonus, $(this).text());
                if (match && match[1] == user) {
                    console.log(match);
                    saveToVault('bonus', match[2]);

                    stat ^= dic_stat['sh_bonus'];
                    menu.set_data('stat', stat);
                    menu.save_vault();
                    res += 1;
                }
            });
        }
        if (stat < 1) {
            menu.set_data('date', now.toLocaleString());
            menu.save_vault();
        }
        return res > 0;
    }

    function handleCBG() {
        if (!canShout()) return;

        let stat = getStatValue(['sh_up', 'sh_bonus']);
        console.log(stat);

        let temp = menu.get_data('temp');
        // 上次喊话超过 1 分钟，继续喊话
        if (temp == undefined || now - new Date(temp) > 1 * 60 * 1000) {
            if ((stat & dic_stat['sh_up']) == dic_stat['sh_up']) {
                $('input#shbox_text').val("阁主，求上传");
                $('input#hbsubmit').click();
            } else if ((stat & dic_stat['sh_bonus']) == dic_stat['sh_bonus']) {
                $('input#shbox_text').val("阁主，求魔力");
                $('input#hbsubmit').click();
            }

            menu.set_data('temp', now.toLocaleString());
            menu.save_vault();

            let t = Date.now();
            let id = setInterval(() => {
                console.log(`handleCBG: ${Date.now() - t}`);
                if (Date.now() - t > 60000) { //timeout
                    clearInterval(id);
                }

                if (analyzeCBG()) {
                    clearInterval(id);
                } else {
                    $('input#hbsubmit').click();
                }
            }, 5000);
        }
    }

    setTimeout(function () {
        let host = location.host;
        if (host.search(/qingwa/i) != -1) {
            handleQW();
        } else if (host.search(/zmpt/i) != -1) {
            handleZM();
        } else if (host.search(/13city/i) != -1) {
            handle13City();
        } else if (host.search(/bilibili/i) != -1) {
            handleRailgun();
        } else if (host.search(/luckpt/i) != -1) {
            handleLuck();
        } else if (host.search(/cangbao/i) != -1) {
            handleCBG();
        }
    }, 3000);

})();
