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
// @icon         https://img101.pixhost.to/images/125/547184887_6.png
// @run-at       document-end
// ==/UserScript==

(function () {
    Date.prototype.toString = Date.prototype.toLocaleString;
    Date.prototype.toDateString = Date.prototype.toLocaleDateString;
    Date.prototype.toTimeString = Date.prototype.toLocaleTimeString;

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
            func(`---open_sites---\n[${new Date().toTimeString()}] ${data}`);
        }
    }

    function getConfig(url, callback) {
        GM_xmlhttpRequest({
            method: 'GET',
            url: url,
            timeout: 30000,
            responseType: "json",
            onerror: function(error) {
                log('get config error.', 2);
                log(error, 2);
            },
            onloadstart: function() {
                log('getting config.');
            },
            ontimeout: function() {
                log('get config timeout.', 2);
            },
            onload: function(response) {
                //console.log(response);
                if (response.status == 200) {
                    log('config getted successfully.');
                    log(response.response);
                    callback(response.response);
                } else {
                    log(`failed to get config: ${response.status} ${response.statusText}`, 2);
                }
            }
        });
    }

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
            log(arr[0]);
            let t = 30000;
            if (arr[0].search(/tjupt|hdsky|open|zmpt|cangbao/i) != -1) {
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
            log('openSites done.');
        }
    }

    function signPlan() {
        let urls = GM_getValue('urls');
        log(urls);
        let now = new Date();
        let arr = [2, 4, 6, 8, 12, 18, 20, 22];
        for (let i = 0; i < arr.length; i++) {
            let idx = i;
            let tt = nextTime(arr[idx], 0, 0, -15);
            log(`openSites${idx + 1} at ${tt}`);
            setTimeout(() => {
                log(`openSites${idx + 1} begin.`);
                openSites(urls.slice());
            }, tt - now);
        }

        setInterval(() => {
            log('heartbeat.');
            if (now.getDate() != new Date().getDate()) {
                location.reload();
            }
        }, 3600000);

        playAudio(); //防止休眠
    }

    setTimeout(function () {
        log('open_sites.');
        let urls = GM_getValue('urls');
        if (urls == undefined) {
            let path = 'https://cdn.jsdelivr.net/gh/kimwuX/various_scripts@master/config/signin.json';
            getConfig(path, obj => {
                GM_setValue('urls', obj.urls);
                signPlan();
            });
        } else {
            signPlan();
        }

    }, 1000);

})();
