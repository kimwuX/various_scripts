// ==UserScript==
// @name         补全IMDb编号
// @namespace    http://www.kimwu.com/
// @version      1.0.0
// @description  如果IMDb编号少于7位，补全到7位
// @author       kim.wu
// @match       *://hdhome.org/torrents.php*
// @require      https://code.jquery.com/jquery-2.1.1.min.js
// @icon         https://img95.pixhost.to/images/777/468772953_3.png
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
                let n = m[1].padStart(7, '0')
                n = $(this).prop('href').replace(m[1], n)
                $(this).prop('href', n)
            }
        }
        //console.log($(this).prop('href'))
    })

})();
