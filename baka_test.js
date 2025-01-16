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
// @grant        GM_setValue
// @grant        GM_getValue
// @grant        GM_deleteValue
// @require      https://code.jquery.com/jquery-1.12.4.js
// @icon         https://img95.pixhost.to/images/777/468772954_2.png
// @run-at       document-end
// ==/UserScript==

(function () {
    Date.prototype.toString = Date.prototype.toLocaleString;
    Date.prototype.toDateString = Date.prototype.toLocaleDateString;
    Date.prototype.toTimeString = Date.prototype.toLocaleTimeString;

    //反序列化表单数据
    function deserializeFormData(data) {
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

    function isValidDate(date) {
        return date instanceof Date && !isNaN(date.getTime());
    }

    function isEmptyString(str) {
        return !(str != null && str.length > 0);
    }

    function padStart(value, len, fill) {
        len = len || 2;
        fill = fill || '0';
        return value.toString().padStart(len, fill);
    }

    function getLeftTimeString(value) {
        let h = Math.floor(value / 1000 / 60 / 60);
        let m = Math.floor(value / 1000 / 60 % 60);
        let s = Math.floor(value / 1000 % 60);
        return padStart(h) + ':' + padStart(m) + ':' + padStart(s);
    }

    function correctTime(time_str) {
        let now = new Date();
        let dt = new Date(time_str);
        if (isValidDate(dt)) {
            dt.setFullYear(now.getFullYear());
            //console.log('pgtime: \n' + dt);
            console.log(getLeftTimeString(now - dt) + ' faster than server.');
            return (now - dt) / 1000;
        }
        return 0;
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

    function nextListTime(arr, offset) {
        let next;
        let now = new Date();
        for (let i = 0; i < arr.length; i++) {
            if (now.getHours() < arr[i]) {
                next = nextTime(arr[i], 0, 0, offset);
                break;
            }
        }
        if (next == null && arr.length > 0) {
            next = nextTime(arr[0], 0, 0, offset);
        }
        //console.log('nextListTime: \n' + next);
        return next;
    }

    function startTicktock(tick) {
        setInterval(() => {
            console.log(new Date().toTimeString());
        }, tick);
    }

    function signCHD(training) {
        let delay = 0;
        if (training) {
            if ($("*:contains('签到记录')").length > 0) {
                setTimeout(function () {
                    $('a[href="bakatest.php"]')[0].click();
                }, 1000);
                return;
            }
            delay += 3000 * (0.5 + Math.random());
            console.log('delay: ' + delay);
        } else {
            let els = $("font").filter(function () {
                return /连续\d+天签到/.test($(this).text());
            });
            if (els.length > 0) {
                return;
            }
        }

        let dic_chd = {};
        if (GM_getValue('dic_chd')) {
            dic_chd = JSON.parse(GM_getValue('dic_chd'));
        }
        console.log(dic_chd);
        let id = $('input[name="questionid"]').val();
        //console.log(id);
        if (isEmptyString(id)) {
            return;
        }
        let a = dic_chd[id];

        $('input[name="submit"]').click(function () {
            //console.log('click.');
            a = [];
            $('input[name="choice[]"]').each(function () {
                if ($(this).prop('checked') == true) {
                    a.push($(this).val());
                }
            });
            //console.log(a);
            if (id && a.length > 0) {
                dic_chd[id] = a.sort();
            }
            //console.log(dic_chd);
            //console.log(JSON.stringify(dic_chd));
            GM_setValue('dic_chd', JSON.stringify(dic_chd));
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
                $('input[name="submit"]').click();
            }, delay);
        }
    }

    function signTJU(training) {
        let delay = 0;
        if (training) {
            //阻止提交表单
            $('form').submit(function (event) {
                event.preventDefault();
                console.log($(this).serialize());
                location.reload();
            });
            delay += 3000 * (0.5 + Math.random());
            console.log('delay: ' + delay);
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
                    console.log(error);
                }
                //console.log(ta);

                if (id && ta.length > 0) {
                    let dic_tmp = {};
                    if (GM_getValue('dic_tmp')) {
                        dic_tmp = JSON.parse(GM_getValue('dic_tmp'));
                    }
                    dic_tmp[id] = ta;
                    //console.log(dic_tmp);
                    //console.log(JSON.stringify(dic_tmp));
                    GM_setValue('dic_tmp', JSON.stringify(dic_tmp));
                }
                location.reload();
            }, 60000);
        }

        let dic_tju = {};
        if (GM_getValue('dic_tju')) {
            dic_tju = JSON.parse(GM_getValue('dic_tju'));
        }
        console.log(dic_tju);
        let id;
        try {
            id = $('table.captcha').find('img').prop('src').split('/').pop();
        } catch (error) {
            console.log(error);
        }
        console.log(id);
        if (isEmptyString(id)) {
            return;
        }
        let a = dic_tju[id];

        $('input[name="submit"]').click(function () {
            //console.log('click.');
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
            //console.log(a);
            if (id && a.length > 0) {
                dic_tju[id] = a.sort();
            }
            //console.log(dic_tju);
            //console.log(JSON.stringify(dic_tju));
            GM_setValue('dic_tju', JSON.stringify(dic_tju));
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

    function delay_signTJU() {
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
        //有未读的站点公告，请先阅读并确认
        // if ($('input#confirm-read-button').length > 0) {
        //     $('input#readed').prop("checked", true);
        //     setTimeout(function() {
        //         $('input#confirm-read-button').click();
        //     }, 12000);
        //     return;
        // }

        //let offset = correctTime($('span#datetime').text()) || 1;
        let arr = [6, 7, 8, 12, 18, 20, 22];
        let next = nextListTime(arr, 3 + 5 * Math.random());
        let now = new Date();
        console.log('now: \n' + now);
        console.log('next: \n' + next);
        let val = next - now;
        console.log(getLeftTimeString(val) + ' left.');
        if (val <= 0) {
            signTJU();
        } else if (val < 90000) {
            setTimeout(() => {
                signTJU();
            }, val);
            startTicktock(1000);
        } else {
            setTimeout(() => {
                location.reload();
            }, val - 90000);
            startTicktock(300000);
        }
    }

    function signU2(training, partial) {
        let delay = 0;
        if (training) {
            if (!partial) {
                //阻止提交表单
                $('td.outer form').first().submit(function (event) {
                    event.preventDefault();
                    console.log($(this).serialize());
                    //location.reload();
                    $('div#showup a.faqlink').click();
                });
            }
            delay += 3000 * (0.5 + Math.random());
            console.log('delay: ' + delay);
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
                        console.log('MutationObserver: childList');
                        //observer.disconnect();
                        setTimeout(function () {
                            //console.clear();
                            signU2(training, true);
                        }, 500);
                    }
                }
            });
            observer.observe($('div#showup')[0], { childList: true });
        }

        let dic_u2 = {};
        if (GM_getValue('dic_u2')) {
            dic_u2 = JSON.parse(GM_getValue('dic_u2'));
        }
        //console.log(dic_u2);

        let p = $('table.captcha');
        let req = p.find('input[name="req"]');
        let hash = p.find('input[name="hash"]');
        let form = p.find('input[name="form"]');

        let id = `req=${req.val()}&hash=${hash.val()}&form=${form.val()}`;
        console.log(id);
        if (isEmptyString(id)) {
            return;
        }
        let a = dic_u2[id];

        $('textarea[name="message"]').val('今日份签到');

        p.find('input[type="submit"]').click(function () {
            let str = $(this).prop('name') + '|' + $(this).val();
            console.log(str);
            if (a == null) {
                a = [];
            }
            a.push(str);

            //console.log(a);
            if (id && a.length > 0) {
                dic_u2[id] = a;
            }
            //console.log(dic_u2);
            //console.log(JSON.stringify(dic_u2));
            //GM_setValue('dic_u2', JSON.stringify(dic_u2));
        });

        //搜索
        console.log('add search buttons.');
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
            console.log(answer);
            answer.css('color', 'blue');
            //提交
            //setTimeout(function() {
            //    answer.click();
            //}, delay);
        } else {
            if (new Date().getHours() > 20) {
                let i = Math.floor(Math.random() * 4);
                //console.log(p.find('input[type="submit"]').eq(i));
                p.find('input[type="submit"]').eq(i).click();
            }
        }
    }

    setTimeout(function () {
        //刷题
        let training = false;
        console.log('baka_test.');
        let host = location.host;
        if (host.search(/ptchdbits/i) != -1) {
            signCHD(training);
        } else if (host.search(/tjupt/i) != -1) {
            if (training) {
                signTJU(true);
            } else {
                delay_signTJU();
            }
        } else if (host.search(/dmhy/i) != -1) {
            signU2(training);
        }

    }, 1000);

})();
