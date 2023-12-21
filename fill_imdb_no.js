// ==UserScript==
// @name         补全IMDb编号
// @namespace    http://www.kimwu.com/
// @version      1.0.0
// @description  如果IMDb编号少于7位，补全到7位
// @author       kim.wu
// @match       *://hdhome.org/torrents.php*
// @require      https://code.jquery.com/jquery-2.1.1.min.js
// @run-at       document-end
// ==/UserScript==

(function () {

    $('.torrentname a').filter(function() {
        return /imdb\.com/i.test($(this).prop('href'))
    }).each(function() {
        //console.log($(this).prop('href'))
        let m = /tt(\d+)/.exec($(this).prop('href'))
        if (m && m.length > 1) {
            if (m[1].length < 7) {
                let n = ('0000000' + m[1]).slice(-7)
                n = $(this).prop('href').replace(m[1], n)
                $(this).prop('href', n)
            }
        }
        //console.log($(this).prop('href'))
    })

})();
