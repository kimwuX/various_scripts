// ==UserScript==
// @name         定时打开网页
// @namespace    http://www.kimwu.com/
// @version      1.0.0
// @description  指定时段自动打开网页，方便后续自动签到
// @author       kim.wu
// @match       *://kim.local/
// @connect      cdn.jsdelivr.net
// @grant        GM_setValue
// @grant        GM_getValue
// @grant        GM_openInTab
// @grant        GM_xmlhttpRequest
// @require      https://code.jquery.com/jquery-1.12.4.js
// @require      https://cdn.jsdelivr.net/gh/kimwuX/various_scripts@master/javascript/library.js
// @icon         https://img1.pixhost.to/images/10104/659998254_6.png
// @run-at       document-end
// ==/UserScript==

class MyApp extends AppBase {
    constructor() {
        super('open_sites');
        this.main();
    }

    nextTime(hour, minute, second, offset) {
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

    playAudio() {
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

    openSites(arr) {
        const self = this;
        if (arr.length > 0) {
            self.log(arr[0]);
            let t = 30000;
            if (arr[0].search(/tjupt|hdsky|open|zmpt|13city|cangbao|longpt/i) != -1) {
                t = 60000;
            }
            //let win = window.open(arr.shift());
            let win = GM_openInTab(arr.shift());
            setTimeout(() => {
                if (win && !win.closed) {
                    win.close();
                }
                self.openSites(arr);
            }, t);
        } else {
            self.log('openSites done.');
        }
    }

    signPlan() {
        const self = this;
        let urls = GM_getValue('urls');
        self.log(urls);
        let now = new Date();
        let arr = [2, 4, 6, 8, 12, 18, 20, 22];
        for (let i = 0; i < arr.length; i++) {
            let idx = i;
            let tt = self.nextTime(arr[idx], 0, 0, -15);
            self.log(`openSites${idx + 1} at ${tt}`);
            setTimeout(() => {
                self.log(`openSites${idx + 1} begin.`);
                self.openSites(urls.slice());
            }, tt - now);
        }

        setInterval(() => {
            self.log('heartbeat.');
            if (now.getDate() != new Date().getDate()) {
                location.reload();
            }
        }, 3600000);

        self.playAudio(); //防止休眠
    }

    main() {
        const self = this;
        let urls = GM_getValue('urls');
        if (urls == undefined) {
            self.log('getting config json...');
            Utils.load(
                'https://cdn.jsdelivr.net/gh/kimwuX/various_scripts@master/javascript/open_sites.json',
                'json'
            ).then(result => {
                self.log(result);
                GM_setValue('urls', result.urls);
                self.signPlan();
            }).catch(error => {
                self.log(error, 2);
            });
        } else {
            self.signPlan();
        }
    }
}

setTimeout(function () {
    new MyApp();
}, 1000);
