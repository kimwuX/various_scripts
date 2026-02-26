// ==UserScript==
// @name         签到答题
// @namespace    http://www.kimwu.com/
// @version      1.0.0
// @description  PT站点自动签到答题脚本
// @author       kim.wu
// @match       *://ptchdbits.co/bakatest.php*
// @match       *://tjupt.org/attendance.php*
// @match       *://www.tjupt.org/attendance.php*
// @match       *://u2.dmhy.org/showup.php*
// @match       *://52pt.site/bakatest.php*
// @match       *://pt.0ff.cc/attendance.php*
// @match       *://farmm.cc/attendance.php*
// @grant        GM_setValue
// @grant        GM_getValue
// @grant        GM_deleteValue
// @grant        GM_notification
// @grant        GM_registerMenuCommand
// @grant        GM_unregisterMenuCommand
// @require      https://code.jquery.com/jquery-1.12.4.js
// @require      https://cdn.jsdelivr.net/gh/kimwuX/various_scripts@master/javascript/library.js
// @icon         https://img1.pixhost.to/images/10104/660001680_2.png
// @run-at       document-end
// ==/UserScript==

class MyApp extends AppBase {
    constructor() {
        super('baka_test');
        let menu_All = [
            ['simulated', '模拟答题', false],
        ];
        this.menu = new Menu(menu_All);
        this.main();
    }

    //反序列化表单数据
    deserializeFormData(data) {
        let formData = {};
        data.split('&').forEach(function (item) {
            let keyValuePair = item.split('=');
            if (!keyValuePair[0]) return;

            let key = decodeURIComponent(keyValuePair[0]);
            let value = decodeURIComponent(keyValuePair[1] || '');
            formData[key] = value;
        });
        return formData;
    }

    padStart(value, len, fill) {
        len = len || 2;
        fill = fill || '0';
        return value.toString().padStart(len, fill);
    }

    getLeftTimeString(value) {
        const self = this;
        let h = Math.floor(value / 1000 / 60 / 60);
        let m = Math.floor(value / 1000 / 60 % 60);
        let s = Math.floor(value / 1000 % 60);
        return self.padStart(h) + ':' + self.padStart(m) + ':' + self.padStart(s);
    }

    correctTime(time_str) {
        const self = this;
        let now = new Date();
        let dt = new Date(time_str);
        if (Utils.isValidDate(dt)) {
            dt.setFullYear(now.getFullYear());
            //self.log('page time: ' + dt);
            self.log(self.getLeftTimeString(now - dt) + ' faster than server.');
            return (now - dt) / 1000;
        }
        return 0;
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

    nextListTime(arr, offset) {
        const self = this;
        let next;
        let now = new Date();
        for (let i = 0; i < arr.length; i++) {
            if (now.getHours() < arr[i]) {
                next = self.nextTime(arr[i], 0, 0, offset);
                break;
            }
        }
        if (next == null && arr.length > 0) {
            next = self.nextTime(arr[0], 0, 0, offset);
        }
        //self.log('nextListTime: ' + next);
        return next;
    }

    startTicktock(tick) {
        const self = this;
        setInterval(() => {
            self.log('ticktock.');
        }, tick);
    }

    signCHD(training) {
        const self = this;
        let delay = 0;
        if (training) {
            if ($("*:contains('签到记录')").length > 0) {
                setTimeout(function () {
                    $('a[href="bakatest.php"]')[0].click();
                }, 1000);
                return;
            }
            delay += 3000 * (0.5 + Math.random());
            self.log(`delay ${delay}ms.`);
        } else {
            let els = $("font").filter(function () {
                return /连续\d+天签到/.test($(this).text());
            });
            if (els.length > 0) {
                return;
            }
        }

        let dic_chd = self.menu.get_str_data('dic', {});
        self.log(dic_chd);
        let id = $('input[name="questionid"]').val();
        //self.log(id);
        if (Utils.isEmptyString(id)) {
            return;
        }
        let a = dic_chd[id];

        $('input[type="submit"]').click(function () {
            //self.log('click.');
            a = [];
            $('input[name="choice[]"]').each(function () {
                if ($(this).prop('checked') == true) {
                    a.push($(this).val());
                }
            });
            //self.log(a);
            if (id && a.length > 0) {
                dic_chd[id] = a.sort();
            }
            //self.log(dic_chd);
            //self.log(JSON.stringify(dic_chd));
            self.menu.set_str_data('dic', dic_chd);
            self.menu.save_vault();
        });

        let chk = false;
        if (a) {
            $('input[name="choice[]"]').each(function () {
                if (a.indexOf($(this).val()) != -1) {
                    $(this).prop("checked", true);
                    chk = true;
                }
            });
        }
        //提交
        if (chk) {
            setTimeout(function () {
                //$('input[name="submit"]').click();
                $('input[name="wantskip"]').click();
            }, delay);
        }
    }

    sign52() {
        const self = this;
        let els = $("font").filter(function () {
            return /连续\d+天签到/.test($(this).text());
        });
        if (els.length > 0) {
            return;
        }

        let dic_52 = self.menu.get_str_data('dic', {});
        self.log(dic_52);
        let id = $('input[name="questionid"]').val();
        //self.log(id);
        if (Utils.isEmptyString(id)) {
            return;
        }
        let a = dic_52[id];

        $('input[type="submit"]').click(function () {
            //self.log('click.');
            a = [];
            $('input[name="choice[]"]').each(function () {
                if ($(this).prop('checked') == true) {
                    a.push($(this).val());
                }
            });
            //self.log(a);
            if (id && a.length > 0) {
                dic_52[id] = a.sort();
            }
            //self.log(dic_52);
            //self.log(JSON.stringify(dic_52));
            self.menu.set_str_data('dic', dic_52);
            self.menu.save_vault();
        });

        let chk = false;
        if (a) {
            $('input[name="choice[]"]').each(function () {
                if (a.indexOf($(this).val()) != -1) {
                    $(this).prop("checked", true);
                    chk = true;
                }
            });
        }
        //提交
        if (chk) {
            setTimeout(function () {
                //$('input[name="submit"]').click();
                $('input[name="wantskip"]').click();
            }, 100);
        }
    }

    signTJU(training) {
        const self = this;
        let delay = 0;
        if (training) {
            //阻止提交表单
            $('form').submit(function (event) {
                event.preventDefault();
                self.log($(this).serialize());
                location.reload();
            });
            delay += 3000 * (0.5 + Math.random());
            self.log(`delay ${delay}ms.`);
        } else {
            if ($("*:contains('签到记录')").length > 0) {
                location.reload();
                return;
            }
            //刷新，题库未收录
            setTimeout(() => {
                let ta = [];
                try {
                    $('input[name="ban_robot"]').each(function () {
                        ta.push($(this).parent().text());
                    });
                } catch (error) {
                    self.log(error, 2);
                }
                //self.log(ta);

                if (id && ta.length > 0) {
                    let dic_tmp = self.menu.get_str_data('temp', {});
                    dic_tmp[id] = ta;
                    //self.log(dic_tmp);
                    //self.log(JSON.stringify(dic_tmp));
                    self.menu.set_str_data('temp', dic_tmp);
                    self.menu.save_vault();
                }
                location.reload();
            }, 60000);
        }

        let dic_tju = self.menu.get_str_data('dic', {});
        let dic_tmp = self.menu.get_str_data('temp', {});
        self.log(dic_tju);
        let id;
        try {
            id = $('table.captcha').find('img').prop('src').split('/').pop();
        } catch (error) {
            self.log(error, 2);
        }
        self.log(id);
        if (Utils.isEmptyString(id)) {
            return;
        }
        let a = dic_tju[id];

        $('input[name="submit"]').click(function () {
            //self.log('click.');
            a = [];
            $('input[name="ban_robot"]').each(function () {
                if ($(this).prop('checked') == true) {
                    //let v = $(this).val().split('&').pop();
                    //if (v && a.indexOf(v) == -1) {
                    //    a.push(v);
                    //}
                    let n = $(this).parent().text();
                    if (n && a.indexOf(n) == -1) {
                        a.push(n);
                    }
                }
            });
            //self.log(a);
            if (id && a.length > 0) {
                dic_tju[id] = a.sort();
            }
            if (id && dic_tmp[id]) {
                delete dic_tmp[id];
                self.menu.set_str_data('temp', dic_tmp);
            }
            //self.log(dic_tju);
            //self.log(JSON.stringify(dic_tju));
            self.menu.set_str_data('dic', dic_tju);
            self.menu.save_vault();
        });

        let chk = false;
        if (a) {
            $('input[name="ban_robot"]').each(function () {
                //if (a.indexOf($(this).val().split('&').pop()) != -1) {
                if (a.indexOf($(this).parent().text()) != -1) {
                    $(this).prop("checked", true);
                    chk = true;
                }
            });
        }
        //提交
        if (chk) {
            setTimeout(function () {
                $('input[name="submit"]').click();
            }, delay);
        }
    }

    delay_signTJU() {
        const self = this;
        //验证码超时，请点击重新进行验证
        let err1 = $("a:contains('重新进行验证')");
        if (err1.length > 0) {
            err1[0].click();
            return;
        }
        //补签弥补连续天数
        let err2 = $("a:contains('补签弥补连续天数')");
        if (err2.length > 0) {
            err2[0].click();
            return;
        }

        //let offset = self.correctTime($('span#datetime').text()) || 1;
        let arr = [0, 6, 7, 8, 12, 18, 20, 22];
        let next = self.nextListTime(arr, 0 + 5 * Math.random());
        let now = new Date();
        self.log('next: ' + next);
        let val = next - now;
        self.log(self.getLeftTimeString(val) + ' left.');
        if (val <= 0) {
            self.signTJU();
        } else if (val < 90000) {
            setTimeout(() => {
                self.signTJU();
            }, val);
            self.startTicktock(1000);
        } else {
            setTimeout(() => {
                location.reload();
            }, val - 90000);
            self.startTicktock(300000);
        }
    }

    signU2(training, partial) {
        const self = this;
        let delay = 0;
        if (training) {
            if (!partial) {
                //阻止提交表单
                $('td.outer form').first().submit(function (event) {
                    event.preventDefault();
                    self.log($(this).serialize());
                    //location.reload();
                    $('div#showup a.faqlink').click();
                });
            }
            delay += 3000 * (0.5 + Math.random());
            self.log(`delay ${delay}ms.`);
        } else {
            if ($("*:contains('今天已签到')").length > 0) {
                return;
            }
        }
        if (!partial) {
            //监听节点删除
            const observer = new MutationObserver(function (mutationsList, observer) {
                for (let mutation of mutationsList) {
                    if (mutation.type === 'childList') {
                        self.log('MutationObserver: childList');
                        //observer.disconnect();
                        setTimeout(function () {
                            //console.clear();
                            self.signU2(training, true);
                        }, 500);
                    }
                }
            });
            observer.observe($('div#showup')[0], { childList: true });
        }

        let dic_u2 = self.menu.get_str_data('dic', {});
        //self.log(dic_u2);

        let p = $('table.captcha');
        let req = p.find('input[name="req"]');
        let hash = p.find('input[name="hash"]');
        let form = p.find('input[name="form"]');

        let id = `req=${req.val()}&hash=${hash.val()}&form=${form.val()}`;
        self.log(id);
        if (Utils.isEmptyString(id)) {
            return;
        }
        let a = dic_u2[id];

        $('textarea[name="message"]').val('今日份签到');

        p.find('input[type="submit"]').click(function () {
            let str = $(this).prop('name') + '|' + $(this).val();
            self.log(str);
            if (a == null) {
                a = [];
            }
            a.push(str);

            //self.log(a);
            if (id && a.length > 0) {
                dic_u2[id] = a;
            }
            //self.log(dic_u2);
            //self.log(JSON.stringify(dic_u2));
            //self.menu.set_str_data('dic', dic_u2);
            //self.menu.save_vault();
        });

        //搜索
        self.log('add search buttons.');
        p.find('input[type="submit"]').each(function () {
            let div = document.createElement('div');
            let arr = $(this).val().split(' / ').map(function (item) {
                return `<a href="https://www.baidu.com/s?wd=${item.trim()}" target="_blank" style="color: #008600;">${item.trim()}</a>`;
            });
            div.innerHTML = arr.join(' | ');
            $(this).after(div);
        });

        let answer;
        if (a) {
            p.find('input[type="submit"]').each(function () {
                let str = $(this).prop('name') + '|' + $(this).val();
                if (a.indexOf(str) != -1) {
                    answer = $(this);
                }
            });
        }
        if (answer) {
            self.log(answer);
            answer.css('color', 'blue');
            //提交
            //setTimeout(function () {
            //    answer.click();
            //}, delay);
        } else {
            if (new Date().getHours() > 20) {
                let i = Math.floor(Math.random() * 4);
                //self.log(p.find('input[type="submit"]').eq(i));
                p.find('input[type="submit"]').eq(i).click();
            }
        }
    }

    signFarmm() {
        const self = this;
        let btns = $('input.btn[value="立即签到"]');
        if (btns.length > 0) {
            self.log("find checkin button, delay 10s...");
            setTimeout(() => {
                btns.first().click();
            }, 10000);
        }
    }

    main() {
        const self = this;
        let host = location.host;
        //是否开启刷题
        let training = self.menu.get_menu_value('simulated');
        if (host.search(/ptchdbits/i) != -1) {
            self.signCHD(training);
        } else if (host.search(/tjupt/i) != -1) {
            if (training) {
                self.signTJU(true);
            } else {
                self.delay_signTJU();
            }
        } else if (host.search(/dmhy/i) != -1) {
            self.signU2(training);
        } else if (host.search(/52pt/i) != -1) {
            self.sign52();
        } else if (host.search(/0ff|farmm/i) != -1) {
            self.signFarmm();
        }
    }
}

setTimeout(function () {
    new MyApp();
}, 1000);
