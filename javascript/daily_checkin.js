// ==UserScript==
// @name         每日签到
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
// @match       *://hhanclub.net/*
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
// @exclude     */blank.htm*
// @exclude     */take2fa.php*
// @exclude     *qingwa*/banner/
// @grant        GM_setValue
// @grant        GM_getValue
// @grant        GM_deleteValue
// @grant        GM_cookie
// @grant        GM_xmlhttpRequest
// @require      https://code.jquery.com/jquery-1.12.4.js
// @require      https://cdn.jsdelivr.net/gh/kimwuX/various_scripts@master/javascript/library.js
// @icon         https://img1.pixhost.to/images/10104/659998245_1.png
// @run-at       document-end
// ==/UserScript==

class MyApp extends AppBase {
    constructor() {
        super('daily_checkin');
        this.now = new Date();
        this.main();
    }

    isSignable(str) {
        return /签\s*到|簽\s*到|打\s*卡|check in/i.test(str) && !/已|获得|成功|查看|記錄|详情/.test(str);
    }

    formatDate(date, sep) {
        let res = [];
        res[0] = date.getFullYear();                      // 获取年份
        res[1] = ('0' + (date.getMonth() + 1)).slice(-2); // 获取月份，并确保月份是两位数
        res[2] = ('0' + date.getDate()).slice(-2);        // 获取日期，并确保日期是两位数
        return res.join(sep);                             // 拼接格式
    }

    observeAdd(selector, callback) {
        const self = this;
        let ob = new Observer(function(list_add, list_remove) {
            let target = $(selector);
            list_add.forEach(node => {
                //self.log(node);
                target.each(function () {
                    if (node == this) {
                        self.log(node);
                        if (callback()) {
                            ob.disconnect();
                        }
                    }
                });
            });
        });
        ob.observe(document.body);
    }

    handleYema(result) {
        const self = this;
        let checked = false;
        if (result.success) {
            let t = self.formatDate(self.now, '');
            for (const element of result.data) {
                if (String(element.checkDay) == t) {
                    checked = true;
                    break;
                }
            }
        }
        if (checked) {
            GM_setValue(location.host, self.now.toLocaleString());
            self.log('今天已经签过到了');
            return;
        }

        let hash = "#/consumer/checkIn";
        if (location.href.indexOf(hash) == -1) {
            location.hash = hash;
            location.reload();
        } else {
            let selector = 'div.ant-flex.css-mgrif2.ant-flex-align-stretch.ant-flex-gap-middle.ant-flex-vertical';
            if ($(selector).length > 0) {
                innerCheck();
            } else {
                self.log('未找到签到节点，开始监听节点');
                self.observeAdd(selector, innerCheck);
            }
            function innerCheck() {
                self.log('开始签到...');
                let btn = $(selector).find('button').filter(function () {
                    return /签\s*到/i.test($(this).text());
                });
                if (btn.length > 0) {
                    let t = Date.now();
                    let id = setInterval(() => {
                        self.log(`interval ${Date.now() - t}`);
                        if (Date.now() - t > 30000) { //timeout
                            self.log('timeout.');
                            clearInterval(id);
                        }
                        btn.click();
                    }, 5000);
                    return true;
                }
                return false;
            }
        }
    }

    checkInYema() {
        const self = this;
        Utils.getCookie('auth').then(result => {
            self.log(result);
            let cookies = {};
            result.forEach(item => 
                cookies[item.name] = item.value
            );
            //self.log(cookies);
            return Utils.load(
                `${location.origin}/api/consumer/fetch365AttendanceList`,
                'json', {
                    'cookie': cookies
                }
            );
        }).then(result => {
            self.log(result);
            self.handleYema(result);
        }).catch(error => {
            self.log(error, 2);
        });
    }

    handleRousi(result) {
        const self = this;
        if (result?.code > 0) {
            self.log(result?.message, 1);
            return;
        }
        if (result?.data?.attendance?.attended_dates) {
            let t = self.formatDate(self.now, '-');
            if (result.data.attendance.attended_dates.includes(t)) {
                GM_setValue(location.host, self.now.toLocaleString());
                self.log('今天已经签过到了');
                return;
            }
        }

        let path = "/points";
        if (location.href.indexOf(path) == -1) {
            location.pathname = path;
            //location.reload();
        } else {
            let selector = 'div.space-y-6';
            if ($(selector).length > 0) {
                innerCheck();
            } else {
                self.log('未找到签到节点，开始监听节点');
                self.observeAdd(selector, innerCheck);
            }
            function innerCheck() {
                self.log('开始签到...');
                let btn = $(selector).find('button').filter(function () {
                    // 签到 +100
                    // return /签\s*到/i.test($(this).text());
                    // 试试手气
                    return /试试手气/i.test($(this).text());
                });
                if (btn.length > 0) {
                    btn.click();
                    return true;
                }
                return false;
            }
        }
    }

    checkInRousi() {
        const self = this;
        let token = localStorage.getItem('token');
        self.log(token);
        if (!token) {
            self.log('未登录，请登录后重试', 1);
            return;
        }

        Utils.load(
            `${location.origin}/api/points/init`,
            'json', {
                'headers': {'Authorization': `Bearer ${token}`}
            }
        ).then(result => {
            self.log(result);
            self.handleRousi(result);
        }).catch(error => {
            self.log(error, 2);
        });
    }

    main() {
        const self = this;
        let host = location.host;
        let v1 = GM_getValue(host);
        if (v1 && new Date(v1).toDateString() == self.now.toDateString()) {
            self.log("Aleady checked in.");
            return;
        }

        let res;
        if (host.search(/yemapt/i) != -1) {
            self.checkInYema();
        } else if (host.search(/rousi\.pro/i) != -1) {
            self.checkInRousi();
        } else if (host.search(/totheglory/i) != -1) {
            res = $('.bottom a').filter(function () {
                return self.isSignable($(this).text());
            });
        } else if (host.search(/hdchina/i) != -1) {
            res = $('.userinfort a').filter(function () {
                return self.isSignable($(this).text());
            });
        } else if (host.search(/btschool/i) != -1) {
            res = $('.outer>p a').filter(function () {
                return self.isSignable($(this).text());
            });
        } else if (host.search(/haidan/i) != -1) {
            res = $('.userinfo #modalBtn').filter(function () {
                return self.isSignable($(this).prop('value'));
            });
        } else if (host.search(/hdcity/i) != -1) {
            res = $('.button-group a').filter(function () {
                return self.isSignable($(this).text());
            });
        } else if (host.search(/hhanclub/i) != -1) {
            res = $('#user-info-panel a').filter(function () {
                return self.isSignable($(this).text());
            });
        } else if (host.search(/cspt/i) != -1) {
            res = $('a.not-attended');
        } else if (host.search(/ikunshare|pting/i) != -1) {
            res = $('button#checkInButton').filter(function () {
                return self.isSignable($(this).text());
            });
        } else if (host.search(/wnflb2023/i) != -1) {
            res = $('img#fx_checkin_b').filter(function () {
                return self.isSignable($(this).attr('alt'));
            }).parent();
        } else {
            res = $('#info_block a').filter(function () {
                return self.isSignable($(this).text());
            });
        }

        if (res && res.length > 0) {
            //self.log(res[0]);
            if (host.search(/ptchdbits|52pt/i) != -1) {
                if (location.pathname.search(/bakatest\.php/i) != -1) {
                    let els = $("font").filter(function () {
                        return /连续\d+天签到/.test($(this).text());
                    });
                    if (els.length > 0) {
                        GM_setValue(host, self.now.toLocaleString());
                        self.log('今天已经签过到了');
                    }
                } else {
                    res[0].click();
                }
            } else if (host.search(/hhanclub/i) != -1) {
                GM_setValue(host, self.now.toLocaleString());
                res[0].click();
            } else {
                res[0].click();
            }
        }
    }
}

setTimeout(function () {
    new MyApp();
}, 1000);
