// ==UserScript==
// @name         自动签到
// @namespace    http://www.kimwu.com/
// @version      1.0.0
// @description  PT站点自动签到脚本
// @author       kim.wu
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
// @match       *://hdarea.club/*
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
// @match       *://rousi.zip/*
// @match       *://ptchdbits.co/*
// @match       *://ubits.club/*
// @match       *://hhanclub.top/*
// @match       *://lemonhd.club/*
// @match       *://www.smzdm.com/*
// @match       *://ikunshare.com/*
// @exclude     */showup.php*
// @exclude     */attendance.php*
// @exclude     */shoutbox.php*
// @exclude     */fun.php*
// @grant        GM_setValue
// @grant        GM_getValue
// @grant        GM_deleteValue
// @require      https://code.jquery.com/jquery-1.12.4.js
// @icon         https://img95.pixhost.to/images/777/468772956_1.png
// @run-at       document-end
// ==/UserScript==

(function () {

    function isSignable(str) {
        return /签\s*到|簽\s*到|打\s*卡|check in/i.test(str) && !/已|获得|成功|查看|記錄|详情/.test(str)
    }

    setTimeout(function() {

        let res, host = location.host
        if (host.search(/totheglory/i) != -1) {
            res = $('.bottom a').filter(function() {
                return isSignable($(this).text())
            })
        } else if (host.search(/hdchina/i) != -1) {
            res = $('.userinfort a').filter(function() {
                return isSignable($(this).text())
            })
        } else if (host.search(/btschool/i) != -1) {
            res = $('.outer>p a').filter(function() {
                return isSignable($(this).text())
            })
        } else if (host.search(/haidan/i) != -1) {
            res = $('.userinfo #modalBtn').filter(function() {
                return isSignable($(this).prop('value'))
            })
        } else if (host.search(/hdcity/i) != -1) {
            res = $('.button-group a').filter(function() {
                return isSignable($(this).text())
            })
        } else if (host.search(/hhanclub/i) != -1) {
            res = $('#user-info-panel a').filter(function() {
                return isSignable($(this).text())
            })
        } else if (host.search(/smzdm/i) != -1) {
            res = $('a.J_punch').filter(function() {
                return isSignable($(this).text())
            })
        } else if (host.search(/ikunshare/i) != -1) {
            res = $('button#checkInButton').filter(function() {
                return isSignable($(this).text())
            })
        } else {
            res = $('#info_block a').filter(function() {
                return isSignable($(this).text())// && !/(usercp|details|forums|messages)\.php/i.test($(this).prop('href'))
            })
        }

        if (res && res.length > 0) {
            //console.log(res[0])
            let t1 = new Date()
            let v1 = GM_getValue(host)
            if (host.search(/ptchdbits/i) != -1) {
                if (v1 && new Date(v1).toDateString() == t1.toDateString()) {
                    console.log("Aleady Signed.")
                } else {
                    if (location.pathname.search(/bakatest\.php/i) != -1) {
                        let els = $("font").filter(function() { return /连续\d+天签到/.test($(this).text()) })
                        if (els.length > 0) {
                            GM_setValue(host, t1.toLocaleString())
                            console.log('今天已经签过到了')
                        }
                    } else {
                        //console.log(t1.toLocaleTimeString() + ' Signed.')
                        res[0].click()
                    }
                }
            } else if (host.search(/hhanclub/i) != -1) {
                if (v1 && new Date(v1).toDateString() == t1.toDateString()) {
                    console.log("Aleady Signed.")
                } else {
                    GM_setValue(host, t1.toLocaleString())
                    res[0].click()
                }
            } else {
                res[0].click()
            }
        }
    }, 1000)

  })();
