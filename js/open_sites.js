// ==UserScript==
// @name         定时打开网页
// @namespace    http://www.kimwu.com/
// @version      1.0.0
// @description  指定时段自动打开网页，方便后续自动签到
// @author       kim.wu
// @match       *://kim.local/
// @grant        GM_openInTab
// @require      https://code.jquery.com/jquery-1.12.4.js
// @icon         https://img101.pixhost.to/images/125/547184887_6.png
// @run-at       document-end
// ==/UserScript==

(function () {
    Date.prototype.toString = Date.prototype.toLocaleString;
    Date.prototype.toDateString = Date.prototype.toLocaleDateString;
    Date.prototype.toTimeString = Date.prototype.toLocaleTimeString;

    function nextTime(hour, minute, second, offset) {
        let now = new Date();
        let next = new Date();
        next.setHours(hour, minute, second, 0);
        if (next < now) {
            next.setDate(next.getDate() + 1);
        }
        if (offset) {
            //next.setSeconds(next.getSeconds() + offset);
            next.setMilliseconds(next.getMilliseconds() + offset * 1000);
        }
        return next;
    }

    function playAudio() {
        let source = document.createElement('source');
        source.src = 'assets/晴天-周杰伦.mp3';
        //source.type = 'audio/mpeg';

        let audio = new Audio();
        audio.appendChild(source);
        audio.style = 'width: 100%';
        audio.controls = true;
        audio.autoplay = true;
        //audio.muted = true;
        audio.loop = true;

        let div = document.createElement('div');
        div.appendChild(audio);
        $('.content').children(':first').append(div);
    }

    function openSites(arr) {
        if (arr.length > 0) {
            console.log(new Date().toTimeString() + ': \n' + arr[0]);
            let t = 30000;
            if (arr[0].search(/hdsky|open|ourbits/i) != -1) {
                t = 60000;
            }
            //let win = window.open(arr.shift());
            let win = GM_openInTab(arr.shift());
            setTimeout(() => {
                if (win && !win.closed) {
                    win.close();
                }
                openSites(arr);
            }, t);
        } else {
            console.log('openSites done: \n' + new Date());
        }
    }

    function signPlan() {
        let now = new Date();
        let arr = [6, 8, 12, 18, 22];
        for (let i = 0; i < arr.length; i++) {
            let idx = i;
            let tt = nextTime(arr[idx], 20 * Math.random(), 60 * Math.random());
            console.log(`openSites${idx + 1}: \n` + tt);
            setTimeout(() => {
                console.log(`openSites${idx + 1} begin: \n` + new Date());
                openSites(site_list.slice());
            }, tt - now);
        }
    }

    setTimeout(function () {
        console.log('open_sites.');
        signPlan();

        let now = new Date();
        setInterval(() => {
            let temp = new Date();
            console.log('live: ' + temp.toTimeString());
            if (now.getDate() != temp.getDate()) {
                location.reload();
            }
        }, 3600000);

        playAudio(); //防止休眠

    }, 1000);

    let site_list = [
        'https://u2.dmhy.org/',
        'https://hdsky.me/',
        'https://open.cd/',
        'https://www.tjupt.org/',
        'https://ptchdbits.co/',
        'https://kp.m-team.cc/',
        'https://springsunday.net/',
        //'https://pt.hd4fans.org/',
        'https://totheglory.im/',
        'https://www.pttime.org/',
        'https://hdtime.org/',
        //'https://hdchina.org/',
        'https://pterclub.com/',
        'https://hdarea.club/',
        'https://pthome.net/',
        'https://ourbits.club/',
        'https://pt.soulvoice.club/',
        'https://www.haidan.video/',
        'https://hdcity.city/',
        'https://pt.sjtu.edu.cn/',
        //'https://hdatmos.club/',
        'https://hdhome.org/',
        'https://pt.btschool.club/',
        'https://greatposterwall.com/',
        'https://pt.keepfrds.com/',
        'https://www.hddolby.com/',
        'https://www.torrentleech.org/',
        'https://hd-space.org/',
        'https://pt.eastgame.org/',
        'https://www.hitpt.com/',
        'https://audiences.me/',
        'https://dicmusic.com/',
        'https://rousi.zip/',
        'https://ubits.club/',
        'https://hhanclub.top/',
        'https://lemonhd.club/',
        'https://qingwapt.com/',
        'https://zmpt.cc/',
        'https://sewerpt.com/',
        'https://cspt.top/',
        'https://pandapt.net/',
        'https://www.agsvpt.com/',
        'https://www.nicept.net/',
        'https://www.ptskit.com/',
        'https://www.skyey2.com/',
        //'https://ikunshare.com/',
        'https://pting.club/',
        'https://iptv.cc/',
        'https://ssdforum.org/',
        'https://www.wnflb2023.com/'
    ];

})();
