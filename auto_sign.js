// ==UserScript==
// @name         自动签到
// @namespace    http://www.kimwu.com/
// @version      1.0.0
// @description  PT站点自动签到脚本
// @author       kimwu
// @include     *://ourbits.club/*
// @include     *://hdhome.org/*
// @include     *://hdchina.org/*
// @include     *://pterclub.com/*
// @include     *://lemonhd.org/*
// @include     *://pthome.net/*
// @include     *://pt.soulvoice.club/*
// @include     *://1ptba.com/*
// @include     *://www.hddolby.com/*
// @include     *://hdzone.me/*
// @include     *://hddisk.life/*
// @include     *://discfan.net/*
// @include     *://www.hdarea.co/*
// @include     *://hdcity.city/*
// @include     *://dhcmusic.xyz/*
// @include     *://totheglory.im/*
// @include     *://www.nicept.net/*
// @include     *://yingk.com/*
// @include     *://hdstreet.club/*
// @include     *://52pt.site/*
// @include     *://moecat.best/*
// @include     *://pt.hd4fans.org/*
// @include     *://www.haidan.video/*
// @match     *://www.pttime.org/*
// @include     *://hdtime.org/*
// @include     *://hdatmos.club/*
// @include     *://hdsky.me/*
// @include     *://open.cd/*
// @include     *://u2.dmhy.org/*
// @match     *://audiences.me/*
// @exclude     */showup.php*
// @exclude     */shoutbox.php*
// @exclude     */fun.php*
// @icon         https://s1.ax1x.com/2022/05/26/XEHBt0.png
// @grant        none
// ==/UserScript==

(function () {
    var host = window.location.host;
    var getSignBtn = () => {

        let ret, p;

        if(host.search(/open\.cd/i) != -1) {
            p = document.getElementsByClassName('infos-bar')[4]
        }
        else {
            p = document.getElementsByClassName('userinfort')[0] || document.getElementById('sign_in') ||
                document.getElementById('bottomnav') || document.getElementById('sp_signed') ||
                document.getElementById('checkin')
        }

        if(p) {
            if(host.search(/hdchina|hdcity/i) != -1) {
                ret = p.getElementsByTagName('a')[1]
            }
            else {
                ret = p.getElementsByTagName('a')[0]
            }
        }
        if (ret) return ret

        ret = document.getElementById('modalBtn') || document.getElementById('showup') ||
            document.getElementById('sign_in_span') || document.getElementsByClassName('faqlink')[0]
        if (ret) return ret

        return ret
    }

    var isSignable = str => {
        return str.search(/签\s*到|簽\s*到|打\s*卡/) != -1 && str.search(/已|成功|查看|記錄/) == -1
    }

    setTimeout(function() {
        let btnSign = getSignBtn()
        console.log(btnSign)
        if (btnSign && (btnSign.innerText && isSignable(btnSign.innerText) || btnSign.value && isSignable(btnSign.value))) {
            btnSign.click()
            console.log('Signed.')
        }
    }, 1000)

  })();