// ==UserScript==
// @name         B站登录弹窗消失术
// @namespace    http://www.kimwu.com/
// @version      1.0.0
// @description  去除B站登录弹窗，并继续播放
// @author       kim.wu
// @match       *://www.bilibili.com/video/*
// @require      https://code.jquery.com/jquery-1.12.4.js
// @icon         https://www.bilibili.com/favicon.ico
// @run-at       document-end
// ==/UserScript==

(function() {

    $('video').on('pause', function() {
        console.log('bili_login: pause');
        console.log(this);

        let t = Date.now();
        let id = setInterval(vd => {
            //console.log(`bili_login: ${Date.now() - t}`);
            if (Date.now() - t > 15000) { //timeout
                clearInterval(id);
            }

            $('.bili-mini-close-icon').each(function() {
                console.log(this);
                this.click();
                vd.play();

                clearInterval(id);
            });
        }, 200, this);
    });

})();
