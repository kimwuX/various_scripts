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