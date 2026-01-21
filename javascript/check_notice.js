// ==UserScript==
// @name         阅读重要公告
// @namespace    http://www.kimwu.com/
// @version      1.0.0
// @description  重要公告自动点击阅读
// @author       kim.wu
// @match       *://hhanclub.top/*
// @match       *://kp.m-team.cc/*
// @match       *://tjupt.org/*
// @match       *://www.tjupt.org/*
// @match       *://springsunday.net/*
// @match       *://pterclub.com/*
// @exclude     */shoutbox.php*
// @exclude     */fun.php*
// @exclude     */blank.htm*
// @require      https://code.jquery.com/jquery-1.12.4.js
// @icon         https://img1.pixhost.to/images/10104/659998256_8.png
// @run-at       document-end
// ==/UserScript==

(function () {
    function handleCommon(btn, cbx) {
        if (btn.length > 0) {
            console.log(btn);
            if (cbx) {
                cbx.prop('checked', true);
            }

            let id = setInterval(() => {
                console.log(new Date());
                if (!btn.prop('disabled')) {
                    clearInterval(id);
                    btn.click();
                }
            }, 1000);
        }
    }

    setTimeout(function () {
        console.log('check_notice.');
        let host = location.host;
        if (host.search(/hhanclub/i) != -1) {
            handleCommon($('#notify_confirm'), $('#confirm_notify_select'));
        } else if (host.search(/m-team/i) != -1) {
            handleCommon($('.ant-modal-root .ant-btn'));
        } else if (host.search(/tjupt/i) != -1) {
            handleCommon($('#confirm-read-button'), $('#readed'));
        } else if (host.search(/springsunday/i) != -1) {
            handleCommon($('.news-modal-main #NewsModalCloseBtn'));
        } else if (host.search(/pterclub/i) != -1) {
            let pb = $('input[name="confirm-news"]');
            handleCommon(pb.siblings('button'), pb);
        }
    }, 5000);

})();
