// ==UserScript==
// @name         自动签到
// @namespace    http://www.kimwu.com/
// @version      1.0.0
// @description  PT站点自动签到脚本
// @author       kimwu
// @match       *://ourbits.club/*
// @match       *://hdhome.org/*
// @match       *://hdchina.org/*
// @match       *://pterclub.com/*
// @match       *://lemonhd.org/*
// @match       *://pthome.net/*
// @match       *://pt.soulvoice.club/*
// @match       *://pt.btschool.club/*
// @match       *://1ptba.com/*
// @match       *://www.hddolby.com/*
// @match       *://hdzone.me/*
// @match       *://hddisk.life/*
// @match       *://discfan.net/*
// @match       *://www.hdarea.co/*
// @match       *://hdcity.city/*
// @match       *://dhcmusic.xyz/*
// @match       *://totheglory.im/*
// @match       *://www.nicept.net/*
// @match       *://yingk.com/*
// @match       *://hdstreet.club/*
// @match       *://52pt.site/*
// @match       *://moecat.best/*
// @match       *://pt.hd4fans.org/*
// @match       *://www.haidan.video/*
// @match       *://www.pttime.org/*
// @match       *://hdtime.org/*
// @match       *://hdatmos.club/*
// @match       *://hdsky.me/*
// @match       *://open.cd/*
// @match       *://u2.dmhy.org/*
// @match       *://audiences.me/*
// @match       *://tjupt.org/*
// @match       *://www.tjupt.org/*
// @exclude     */showup.php*
// @exclude     */attendance.php*
// @exclude     */shoutbox.php*
// @exclude     */fun.php*
// @require      https://code.jquery.com/jquery-1.12.4.js
// @icon         https://s1.ax1x.com/2022/05/26/XEHBt0.png
// @run-at       document-end
// ==/UserScript==

(function () {

    function isSignable(str) {
        return /签\s*到|簽\s*到|打\s*卡/.test(str) && !/已|成功|查看|記錄/.test(str)
    }

    setTimeout(function() {
        let site_url = decodeURI(location.href)

        let res
        if (site_url.search(/haidan\.video/i) != -1) {
            res = $('#modalBtn').filter(function() {
                return isSignable($(this).attr('value'))
            })
        }
        else {
            res = $('a').filter(function() {
                return isSignable($(this).text()) && !/(usercp|details)\.php/i.test($(this).attr('href'))
            })
        }

        if (res && res.length > 0) {
            res[0].click()
            console.log(res[0])
            console.log('Signed.')
        }
    }, 1000)

  })();
