// ==UserScript==
// @name         自动喊话
// @namespace    http://www.kimwu.com/
// @version      1.0.0
// @description  青蛙自动喊话求上传、求下载
// @author       kim.wu
// @match       *://qingwapt.com/
// @match       *://new.qingwa.pro/
// @match       *://qingwapt.com/index.php*
// @match       *://new.qingwa.pro/index.php*
// @grant        GM_setValue
// @grant        GM_getValue
// @grant        GM_deleteValue
// @grant        GM_notification
// @grant        GM_registerMenuCommand
// @grant        GM_unregisterMenuCommand
// @require      https://code.jquery.com/jquery-1.12.4.js
// @icon         https://img101.pixhost.to/images/410/552674185__trumpet.png
// @run-at       document-end
// ==/UserScript==

let menu_All = [
    ['sh_up', '求上传喊话', true],
    ['sh_down', '求下载喊话', true],
], menu_ID = [];
let vault = GM_getValue(location.host) || {};

registerMenu();

// 注册脚本菜单
function registerMenu() {

    for (let i = 0; i < menu_ID.length; i++) {
        GM_unregisterMenuCommand(menu_ID[i]);
    }

    //console.log(vault);
    let dic = vault.menu ? JSON.parse(vault.menu) : {};
    for (const arr of menu_All) {
        if (dic.hasOwnProperty(arr[0])) {
            arr[2] = dic[arr[0]];
        }
    }
    //console.log(menu_All);

    for (let i = 0; i < menu_All.length; i++){ // 循环注册脚本菜单
        menu_ID[i] = GM_registerMenuCommand(
            `${menu_All[i][2] ? '✅' : '❌'} ${menu_All[i][1]}`,
            function(){
                menu_switch(menu_All[i][2], menu_All[i][0], menu_All[i][1])
            }
        );
    }
}

// 菜单开关
function menu_switch(menuStatus, key, tips) {

    let dic = vault.menu ? JSON.parse(vault.menu) : {};
    if (menuStatus) {
        dic[key] = false;
        GM_notification({text: `已禁用【${tips}】功能`, timeout: 3000});
    } else {
        dic[key] = true;
        GM_notification({text: `已启用【${tips}】功能`, timeout: 3000});
    }
    vault.menu = JSON.stringify(dic);
    saveVault();
    registerMenu(); // 重新注册脚本菜单
}

// 返回菜单值
function menu_value(menuName) {
    for (let menu of menu_All) {
        if (menu[0] == menuName) {
            return menu[2]
        }
    }
}

function saveVault() {
    GM_setValue(location.host, vault);
}

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
        if (vault.date && new Date(vault.date).toDateString() == t1.toDateString()) {
            console.log("Aleady shouted.")
        } else {
            if (menu_value('sh_up')) {
                setTimeout(() => {
                    $('input#shbox_text').val("蛙总，求上传")
                    $('input#hbsubmit').click()
                }, 0)
            }
            if (menu_value('sh_down')) {
                setTimeout(() => {
                    $('input#shbox_text').val("蛙总，求下载")
                    $('input#hbsubmit').click()
                }, 1500)
            }
            setTimeout(() => {
                vault.date = t1.toLocaleString()
                saveVault()
            }, 3000);
        }
    }, 1000)

  })();
