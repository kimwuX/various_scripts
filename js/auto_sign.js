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
// @match       *://pterclub.net/*
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
// @match       *://qingwapt.com/*
// @match       *://new.qingwa.pro/*
// @match       *://zmpt.cc/*
// @match       *://www.hitpt.com/*
// @match       *://sewerpt.com/*
// @match       *://cspt.top/*
// @match       *://pandapt.net/*
// @match       *://www.agsvpt.com/*
// @match       *://www.ptskit.org/*
// @match       *://13city.org/*
// @match       *://piggo.me/*
// @match       *://www.icc2022.com/*
// @match       *://www.hxpt.org/*
// @match       *://carpt.net/*
// @match       *://www.ptlover.cc/*
// @match       *://bilibili.download/*
// @match       *://cangbao.ge/*
// @match       *://ptsbao.club/*
// @match       *://longpt.org/*
// @match       *://pt.luckpt.de/*
// @match       *://pt.0ff.cc/*
// @match       *://farmm.cc/*
// @match       *://pt.novahd.top/*
// @match       *://tmpt.top/*
// @match       *://ptchina.org/*
// @match       *://ptfans.cc/*
// @match       *://pt.aling.de/*
// @match       *://dubhe.site/*
// @match       *://pt.gtkpw.xyz/*
// @match       *://pt.gtk.pw/*
// @match       *://pt.lajidui.top/*
// @match       *://crabpt.vip/*
// @match       *://www.52movie.top/*
// @match       *://p.t-baozi.cc/*
// @match       *://pt.muxuege.org/*
// @match       *://pt.ying.us.kg/*
// @match       *://www.yemapt.org/*
// @match       *://www.tangpt.top/*
// @match       *://rousi.pro/*
// @match       *://ikunshare.com/*
// @match       *://pting.club/*
// @match       *://www.wnflb2023.com/*
// @exclude     */showup.php*
// @exclude     */attendance.php*
// @exclude     */shoutbox.php*
// @exclude     */fun.php*
// @exclude     */take2fa.php*
// @grant        GM_setValue
// @grant        GM_getValue
// @grant        GM_deleteValue
// @grant        GM.cookie
// @grant        GM.xmlHttpRequest
// @require      https://code.jquery.com/jquery-1.12.4.js
// @require      https://cdn.jsdelivr.net/gh/kimwuX/various_scripts@master/js/library.js
// @icon         https://img1.pixhost.to/images/10104/659998245_1.png
// @run-at       document-end
// ==/UserScript==

(function () {
    let now = new Date();

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
            func(`---auto_sign---\n[${new Date().toLocaleTimeString()}] ${data}`);
        }
    }

    function isSignable(str) {
        return /签\s*到|簽\s*到|打\s*卡|check in/i.test(str) && !/已|获得|成功|查看|記錄|详情/.test(str);
    }

    function formatDate(date, sep) {
        let res = [];
        res[0] = date.getFullYear();                      // 获取年份
        res[1] = ('0' + (date.getMonth() + 1)).slice(-2); // 获取月份，并确保月份是两位数
        res[2] = ('0' + date.getDate()).slice(-2);        // 获取日期，并确保日期是两位数
        return res.join(sep);                             // 拼接格式
    }

    function observeAdd(selector, callback) {
        let ob = new Observer(function(list_add, list_remove) {
            let target = $(selector);
            list_add.forEach(node => {
                // log(node);
                target.each(function() {
                    if (node == this) {
                        log(node);
                        callback(node, ob);
                    }
                });
            });
        });
        ob.observe(document.body);
    }

    function checkYema(result) {
        let checked = false;
        if (result.success) {
            let t = formatDate(now, '');
            for (const element of result.data) {
                if (String(element.checkDay) == t) {
                    checked = true;
                    break;
                }
            }
        }
        if (checked) {
            GM_setValue(location.host, now.toLocaleString());
            log('今天已经签过到了');
            return;
        }

        let hash = "#/consumer/checkIn";
        if (location.href.indexOf(hash) == -1) {
            location.hash = hash;
            location.reload();
        } else {
            observeAdd('div.ant-flex.css-mgrif2.ant-flex-align-stretch.ant-flex-gap-middle.ant-flex-vertical', (node, ob) => {
                let btn = $(node).find('button').filter(function () {
                    return /签\s*到/i.test($(this).text());
                });
                if (btn.length > 0) {
                    ob.disconnect();
                    let t = Date.now();
                    let id = setInterval(() => {
                        log(`interval ${Date.now() - t}`);
                        if (Date.now() - t > 30000) { //timeout
                            log('timeout.');
                            clearInterval(id);
                        }
                        btn.click();
                    }, 5000);
                }
            });
        }
    }

    function signYema() {
        Utils.getCookie('auth').then(result => {
            log(result);
            return Utils.httpGet(
                `${location.origin}/api/consumer/fetch365AttendanceList`,
                null,
                'json',
                {'auth': result}
            );
        }).then(result => {
            log(result);
            checkYema(result);
        }).catch(error => {
            log(error, 2);
        });
    }

    function checkRousi(result) {
        if (result?.code > 0) {
            log(result?.message, 1);
            return;
        }
        if (result?.attendance?.attended_dates) {
            let t = formatDate(now, '-');
            if (result.attendance.attended_dates.includes(t)) {
                GM_setValue(location.host, now.toLocaleString());
                log('今天已经签过到了');
                return;
            }
        }

        let path = "/points";
        if (location.href.indexOf(path) == -1) {
            location.pathname = path;
            //location.reload();
        } else {
            observeAdd('div.space-y-6', (node, ob) => {
                let btn = $(node).find('button').filter(function () {
                    // 签到 +100
                    // return /签\s*到/i.test($(this).text());
                    // 试试手气
                    return /试试手气/i.test($(this).text());
                });
                if (btn.length > 0) {
                    ob.disconnect();
                    btn.click();
                }
            });
        }
    }

    function signRousi() {
        let token = localStorage.getItem('token');
        log(token);
        if (!token) {
            log('未登录，请登录后重试', 1);
            return;
        }

        Utils.httpGet(
            `${location.origin}/api/points/init`,
            {'Authorization': `Bearer ${token}`},
            'json'
        ).then(result => {
            log(result);
            checkRousi(result);
        }).catch(error => {
            log(error, 2);
        });
    }

    setTimeout(function () {
        let host = location.host;
        let v1 = GM_getValue(host);
        if (v1 && new Date(v1).toDateString() == now.toDateString()) {
            log("Aleady Signed.");
            return;
        }

        let res;
        if (host.search(/yemapt/i) != -1) {
            signYema();
        } else if (host.search(/rousi\.pro/i) != -1) {
            signRousi();
        } else if (host.search(/totheglory/i) != -1) {
            res = $('.bottom a').filter(function () {
                return isSignable($(this).text());
            });
        } else if (host.search(/hdchina/i) != -1) {
            res = $('.userinfort a').filter(function () {
                return isSignable($(this).text());
            });
        } else if (host.search(/btschool/i) != -1) {
            res = $('.outer>p a').filter(function () {
                return isSignable($(this).text());
            });
        } else if (host.search(/haidan/i) != -1) {
            res = $('.userinfo #modalBtn').filter(function () {
                return isSignable($(this).prop('value'));
            });
        } else if (host.search(/hdcity/i) != -1) {
            res = $('.button-group a').filter(function () {
                return isSignable($(this).text());
            });
        } else if (host.search(/hhanclub/i) != -1) {
            res = $('#user-info-panel a').filter(function () {
                return isSignable($(this).text());
            });
        } else if (host.search(/cspt/i) != -1) {
            res = $('a.not-attended');
        } else if (host.search(/ikunshare|pting/i) != -1) {
            res = $('button#checkInButton').filter(function () {
                return isSignable($(this).text());
            });
        } else if (host.search(/wnflb2023/i) != -1) {
            res = $('img#fx_checkin_b').filter(function () {
                return isSignable($(this).attr('alt'));
            }).parent();
        } else {
            res = $('#info_block a').filter(function () {
                return isSignable($(this).text());
            });
        }

        if (res && res.length > 0) {
            //log(res[0]);
            if (host.search(/ptchdbits|52pt/i) != -1) {
                if (location.pathname.search(/bakatest\.php/i) != -1) {
                    let els = $("font").filter(function () {
                        return /连续\d+天签到/.test($(this).text());
                    });
                    if (els.length > 0) {
                        GM_setValue(host, now.toLocaleString());
                        log('今天已经签过到了');
                    }
                } else {
                    res[0].click();
                }
            } else if (host.search(/hhanclub/i) != -1) {
                GM_setValue(host, now.toLocaleString());
                res[0].click();
            } else {
                res[0].click();
            }
        }
    }, 1000);

})();
