// ==UserScript==
// @name         PT站点魔力计算器
// @version      2.1.0.1
// @description  在使用NexusPHP架构的PT站点显示每个种子的A值和每GB的A值。
// @author       kim.wu, neoblackxt, LaneLau
// @require      https://cdn.jsdelivr.net/npm/jquery@3/dist/jquery.min.js
// @require      https://cdn.jsdelivr.net/npm/echarts@5/dist/echarts.min.js
// @require      https://cdn.jsdelivr.net/gh/kimwuX/various_scripts@master/javascript/library.js
// @icon         https://img2.pixhost.to/images/7914/726570621_11.png

// @match        *://*.tjupt.org/torrents.php*
// @match        *://ptchdbits.co/torrents.php*
// @match        *://ptchdbits.co/renewtorrents.php*
// @match        *://hdsky.me/torrents.php*
// @match        *://open.cd/torrents.php*
// @match        *://www.pttime.org/torrents.php*
// @match        *://www.pttime.org/adults.php*
// @match        *://hdtime.org/torrents.php*
// @match        *://pterclub.net/torrents.php*
// @match        *://pterclub.net/music.php*
// @match        *://pterclub.net/reseed.php*
// @match        *://pterclub.net/officialgroup.php*
// @match        *://hdarea.club/torrents.php*
// @match        *://pthome.net/torrents.php*
// @match        *://pthome.net/live.php*
// @match        *://ourbits.club/torrents.php*
// @match        *://pt.soulvoice.club/torrents.php*
// @match        *://pt.soulvoice.club/special.php*
// @match        *://www.haidan.cc/torrents.php*
// @match        *://www.haidan.cc/videos.php*
// @match        *://pt.sjtu.edu.cn/torrents.php*
// @match        *://hdhome.org/torrents.php*
// @match        *://hdhome.org/live.php*
// @match        *://pt.btschool.club/torrents.php*
// @match        *://pt.keepfrds.com/torrents.php*
// @match        *://www.hddolby.com/torrents.php*
// @match        *://pt.eastgame.org/torrents.php*
// @match        *://www.hitpt.com/torrents.php*
// @match        *://www.hitpt.com/special.php*
// @match        *://audiences.me/torrents.php*
// @match        *://ubits.club/torrents.php*
// @match        *://hhanclub.net/torrents.php*
// @match        *://hhanclub.net/special.php*
// @match        *://zmpt.cc/torrents.php*
// @match        *://sewerpt.com/torrents.php*
// @match        *://cspt.top/torrents.php*
// @match        *://pandapt.net/torrents.php*
// @match        *://pandapt.net/rescue.php*
// @match        *://pt.agsvpt.cn/torrents.php*
// @match        *://pt.agsvpt.cn/special.php*
// @match        *://www.nicept.net/torrents.php*
// @match        *://www.ptskit.org/torrents.php*
// @match        *://13city.org/torrents.php*
// @match        *://discfan.net/torrents.php*
// @match        *://piggo.me/torrents.php*
// @match        *://piggo.me/special.php*
// @match        *://www.hxpt.org/torrents.php*
// @match        *://carpt.net/torrents.php*
// @match        *://www.ptlover.cc/torrents.php*
// @match        *://bilibili.download/torrents.php*
// @match        *://cangbao.ge/torrents.php*
// @match        *://ptsbao.club/torrents.php*
// @match        *://longpt.org/torrents.php*
// @match        *://pt.luckpt.de/torrents.php*
// @match        *://52pt.site/torrents.php*
// @match        *://pt.0ff.cc/torrents.php*
// @match        *://pt.0ff.cc/special.php*
// @match        *://1ptba.com/torrents.php*
// @match        *://1ptba.com/special.php*
// @match        *://pt.novahd.top/torrents.php*
// @match        *://tmpt.top/torrents.php*
// @match        *://ptfans.cc/torrents.php*
// @match        *://ptfans.cc/special.php*
// @match        *://pt.aling.de/torrents.php*
// @match        *://pt.gtkpw.xyz/torrents.php*
// @match        *://pt.lajidui.top/torrents.php*
// @match        *://crabpt.vip/torrents.php*
// @match        *://crabpt.vip/special.php*
// @match        *://www.52movie.top/torrents.php*
// @match        *://p.t-baozi.cc/torrents.php*
// @match        *://pt.muxuege.org/torrents.php*
// @match        *://pt.ying.us.kg/torrents.php*
// @match        *://www.tangpt.top/torrents.php*
// @match        *://hdfans.org/torrents.php*
// @match        *://hdfans.org/special.php*
// @match        *://pt.xingyungept.org/torrents.php*
// @match        *://hdvideo.top/torrents.php*
// @match        *://sunnypt.top/torrents.php*
// @match        *://pt.hdclone.top/torrents.php*
// @match        *://duckboobee.org/torrents.php*
// @match        *://mua.xloli.cc/torrents.php*
// @match        *://dstudio.me/torrents.php*

// @match        *://dubhe.site/*
// @match        *://kp.m-team.cc/*
// @match        *://hdcity.city/pt*
// @match        *://wiki.hhanclub.net/zh/%E7%AB%99%E7%82%B9%E8%A7%84%E5%88%99/%E6%86%A8%E8%B1%86%E4%B8%8E%E5%81%9A%E7%A7%8D%E7%A7%AF%E5%88%86
// @match        *://*.tjupt.org/bonus.php?show=description
// @match        *://www.hxpt.org/mybonusmine.php
// @match        *://hdcity.city/mybonus
// @match        */mybonus.php*

// @exclude      *://www.tjupt.org/mybonus.php*
// @exclude      *://tjupt.org/mybonus.php*
// @exclude      *://hdarea.club/mybonus.php*
// @exclude      *://www.qingwapt.com/*
// @exclude      *://qingwapt.com/*
// @exclude      *://springsunday.net/*
// @exclude      *://totheglory.im/*
// @exclude      */shoutbox.php*
// @exclude      */fun.php*

// @license      GPL License
// @grant        GM_setValue
// @grant        GM_getValue
// @grant        window.onurlchange
// @run-at       document-end
// ==/UserScript==


class MyApp extends AppBase {

    constructor() {
        super('calc_bonusA');
        this.init();
        this.main();
    }

    get_site_name() {
        const self = this;
        if (!self._sites) {
            self._sites = {
                '1ptba': ['1ptba.com'],
                'audiences': ['audiences.me'],
                'cspt': ['cspt.top'],
                'discfan': ['discfan.net'],
                'dubhe': ['dubhe.site'],
                'haidan': ['www.haidan.cc'],
                'hdarea': ['hdarea.club'],
                'hdcity': ['hdcity.city'],
                'hddolby': ['www.hddolby.com'],
                'hdhome': ['hdhome.org'],
                'hdsky': ['hdsky.me'],
                'hhanclub': ['hhanclub.net', 'wiki.hhanclub.net'],
                'hxpt': ['www.hxpt.org'],
                'm-team': ['kp.m-team.cc'],
                'muxuege': ['pt.muxuege.org'],
                'piggo': ['piggo.me'],
                'pterclub': ['pterclub.net'],
                'pthome': ['pthome.net'],
                'sewerpt': ['sewerpt.com'],
                'tjupt': ['tjupt.org', 'www.tjupt.org'],
                'ubits': ['ubits.club'],
                'xloli': ['mua.xloli.cc'],
            };
        }
        let res;
        for (const key in self._sites) {
            const arr = self._sites[key];
            if (arr.includes(self.host)) {
                res = key;
                break;
            }
        }
        return res;
    }

    get_font_colors() {
        const self = this;
        if (!self._colors) {
            // 不同 A 值对应不同的颜色及字重
            self._colors = [
                // null表示使用默认颜色和字重
                {min: 0, max: 1, color: null, fontWeight: null}, // 黑色
                {min: 1, max: 1.5, color: '#00008B', fontWeight: 700}, // 蓝色
                {min: 1.5, max: 2, color: '#8B4513', fontWeight: 800}, // 棕色
                {min: 2, max: Infinity, color: '#ff0000', fontWeight: 900} // 红色
            ];
        }
        return self._colors;
    }

    init() {
        const self = this;
        self.host = location.hostname.replace(/^wiki\./, '');
        self.formulaPath = undefined;
        self.bonusPath = undefined;
        let site = self.get_site_name();
        if (site == 'm-team') {
            self.bonusPath = location.origin + '/mybonus';
        } else if (site == 'tjupt') {
            self.bonusPath = location.origin + '/bonus.php?show=description';
        } else if (site == 'hdcity') {
            self.bonusPath = location.origin + '/mybonus';
        } else if (site == 'hxpt') {
            self.bonusPath = location.origin + '/mybonusmine.php';
        } else if (site == 'hhanclub') {
            self.formulaPath = location.origin.replace('://hhanclub', '://wiki.hhanclub') + encodeURI('/zh/站点规则/憨豆与做种积分');
            self.bonusPath = location.origin + '/mybonus.php';
        } else {
            self.bonusPath = location.origin + '/mybonus.php';
        }
        if (!self.formulaPath) {
            self.formulaPath = self.bonusPath;
        }
        self.isFormulaPage = location.href.includes(self.formulaPath);
        self.isMybonusPage = location.href.includes(self.bonusPath);
        self.log([self.host, self.isFormulaPage, self.isMybonusPage].join());
        self.vault = new Vault(self.host);
    }

    calcA(T, S, N, isW, isSp) {
        const self = this;
        let res;
        let site = self.get_site_name();
        if (site == 'xloli') {
            res = calcLoli();
        } else {
            let c1 = 1 - Math.pow(10, -(T / self.coef.T0));
            let c2;
            if (site == 'pterclub') {
                c2 = 1 + Math.pow(10, -(N - 1) / (self.coef.N0 - 1));
            } else {
                c2 = 1 + Math.sqrt(2) * Math.pow(10, -(N - 1) / (self.coef.N0 - 1));
            }
            res = c1 * S * c2;
            if (site == 'hdsky') {
                if (isSp && self.coef.K_s !== undefined) {
                    res *= self.coef.K_s;
                } else if (!isSp && self.coef.K !== undefined) {
                    res *= self.coef.K;
                }
                if (self.coef.M !== undefined) {
                    res *= self.coef.M / (N + 1);
                }
            }
        }
        let w = isW && self.coef.Wi_s !== undefined ? self.coef.Wi_s : self.coef.Wi;
        if (site == 'piggo') {
            // D为小于2G官种第i个种子的权重系数，此时Wi=C。D = 0.01
            if (isSp && S < 2 && self.coef.D !== undefined) {
                w = 1 + self.coef.D * (2 / Math.PI) * Math.atan((Math.exp(-0.1 * S) + Math.exp(-0.05 * N) - 0.5) / T);
            }
        } else if (['audiences', 'hdhome', 'pthome'].includes(site)) {
            if (isW) {
                // 当种子有【零魔】标签且做种人数大于等于10人时，无法获取A值加成，如果做种人数低于10人时按照1/5体积计算保种爆米花。
                w = N < 10 ? 0.2 : 0;
            } else if (isSp && self.coef.Wi_s !== undefined) {
                // Wi为第i个种子权重参数，其中，普通种子权重=0.5，官种种子权重=1.5
                w = self.coef.Wi_s;
            } else {
                w = self.coef.Wi;
            }
        } else if (site == 'discfan') {
            // 種子體積要求至少爲 286.10 MB，小於此體積的種子不參與魔力計算
            if (S < 286.1 / 1024) {
                w = 0;
            }
        } else if (site == '1ptba') {
            // 种子体积要求至少为 1.00 GB，小于此体积的种子不参与魔力计算
            if (S < 1) {
                w = 0;
            }
        } else if (['hddolby', 'pterclub'].includes(site)) {
            // hddolby: 当种子有‘零魔’标签时，无法获取A值加成。
            // pterclub: 通用大包/无意义大包[榜单/导演/演员合集]Si=0, 一些过了时效性的种子也可能被设置Si=0，例如合集发布后对应的分集
            if (isW) {
                w = 0;
            }
        }
        if (w !== undefined) {
            res *= w;
        }
        return res;

        function calcLoli() {
            let gt = T < 1 ? 0.5 + 0.5 * T : 1;
            let fs, hn;
            if (isSp) {
                if (S < 27) {
                    fs = S;
                } else if (S < 828) {
                    fs = S * (1.481 - 0.146 * Math.log(S));
                } else {
                    fs = 0.5 * S;
                }
                hn = 1.7 * Math.pow(10, -0.35 * (-3 + Math.sqrt(9 + 8 * N)) / 2);
            } else {
                if (S > 200) {
                    fs = 140;
                } else if (S > 27) {
                    fs = S * (1.481 - 0.146 * Math.log(S));
                } else {
                    fs = S;
                }
                hn = N < 22 ? 1 - 0.31 * Math.log(N) : 0.1876 * Math.pow(10, -0.05756 * N);
            }
            return gt * fs * hn;
        }
    }

    calcB(A, isSp) {
        const self = this;
        let res;
        let buff = 1;
        let site = self.get_site_name();
        if (site == 'xloli') {
            res = self.coef.E * Math.log(1 + A / self.coef.D);
            buff = isSp ? 1 : self.coef.Buff;
        } else {
            let b0 = isSp && self.coef.B0_s !== undefined ? self.coef.B0_s : self.coef.B0;
            let l = isSp && self.coef.L_s !== undefined ? self.coef.L_s : self.coef.L;
            if (site == 'hhanclub') {
                res = b0 * (2 / Math.PI) * Math.atan(A / l - 5) + 20;
            } else {
                res = b0 * (2 / Math.PI) * Math.atan(A / l);
            }
            if (isSp && self.coef.Buff !== undefined) {
                buff += self.coef.Buff;
            }
        }
        return res * buff;
    }

    /**
     * B 值反推 A 值（通用公式）
     */
    calcAbyB(B) {
        const self = this;
        return Math.tan(B / self.coef.B0 / (2 / Math.PI)) * self.coef.L;
    }

    initChart() {
        const self = this;
        let A, B;
        let site = self.get_site_name();
        let isSp = site == 'xloli';
        if (site == 'm-team') {
            B = parseFloat($('td:contains("基本獎勵")+td+td')[0].innerText);
            // 剔除M-Team的基本奖励中做种数奖励
            let matches = $('li:contains("你的做種數")').text().match(/(\d+(?:\.\d+)?)個魔力值.*最多計(\d+)個/);
            let seedingBonusPerSeed = parseFloat(matches[1]);
            let seedingBonusLimit = parseInt(matches[2]);
            let currentSeeding = parseInt($('span:contains("當前活動")').siblings('span:eq(1)').text());
            B = B - (currentSeeding > seedingBonusLimit ? seedingBonusPerSeed * seedingBonusLimit : seedingBonusPerSeed * currentSeeding);
            A = self.calcAbyB(B);
        } else {
            if (site == 'hddolby') {
                let row, col, idx;
                $('table:contains("您目前每小时可以获取到的鲸币")').last().find('tr').each(function (i) {
                    row = $(this);
                    row.children().each(function (j) {
                        col = $(this);
                        if (i == 1 && col.text() == 'A值') {
                            idx = j;
                        }
                        if (i == 2 && j == idx) {
                            A = parseFloat(col.text());
                        }
                    })
                });
            } else {
                let mat;
                let nodeA = $('div:contains("当前每小时能获取"),div:contains("當前每小時能獲取")');
                if (site == 'audiences') {
                    mat = nodeA.text().match(/官组种子A\s*=\s*(\d+(?:\.\d+)?).*?普通种子A\s*=\s*(\d+(?:\.\d+)?)/s);
                    A = parseFloat(mat[2]);
                } else {
                    mat = nodeA.text().match(/A\s*=\s*(\d+(?:\.\d+)?)/);
                    A = parseFloat(mat[1]);
                }
            }
            if (A === undefined) {
                throw new Error('A 值获取失败！');
            }
            B = self.calcB(A, isSp);
        }

        let data = [];
        let tL = self.coef.L || 600;
        let max = Math.max(1.1 * A, 30 * tL, 10000);
        for (let i = 0, step = tL / 4; i < max; i = i + step) {
            data.push([i, self.calcB(i, isSp)]);
        }
        data.push([max, self.calcB(max, isSp)]);

        let spot = [A, B];
        self.insertChart(data, spot);
    }

    insertChart(data, spot) {
        const self = this;
        let insertPos;
        let site = self.get_site_name();
        if (site == 'm-team') {
            insertPos = $('ul+table');
        } else if (['hdcity', 'pterclub'].includes(site)) {
            insertPos = $('div+h3');
        } else if (site == 'hhanclub') {
            insertPos = $('h1:contains("官种加成每小时将额外得到如下的憨豆")').parent();
        } else if (site == 'hxpt') {
            insertPos = $('div.mybonus-info-card>div:contains("当前每小时能获取")');
        } else {
            insertPos = $('table+h1').first();
        }
        if (insertPos.length == 0) {
            self.log('未找到 B - A 图插入位置！', 1);
            return;
        }
        insertPos.before('<div id="ba_chart" style="width: 600px;height:400px; margin:auto;"></div>')

        let myChart = echarts.init(document.getElementById('ba_chart'));
        // 指定图表的配置项和数据
        let option = {
            title: {
                text: 'B - A 图',
                top: 'bottom',
                left: 'center'
            },
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'cross'
                },
                backgroundColor: 'rgba(255, 255, 255, 0.8)',
                position: function (pos, params, el, elRect, size) {
                    let obj = {top: 10};
                    obj[['left', 'right'][+(pos[0] < size.viewSize[0] / 2)]] = 30;
                    return obj;
                },
                extraCssText: 'width: 170px'
            },
            xAxis: {
                name: 'A',
            },
            yAxis: {
                name: 'B'
            },
            axisPointer: {
                label: {
                    backgroundColor: '#777'
                }
            },
            series: [{
                type: 'line',
                data: data,
                symbol: 'none'
            },
            {
                type: 'line',
                data: [spot],
                symbolSize: 6
            }]
        };

        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(option);
    }

    /**
     * @param time 种子发布时间
     * @param size 种子体积
     * @param seeder 做种人数
     * @param isW 是否零魔种子
     * @param isSp 是否特殊种子
     * @returns [当前魔力值、做种魔力值]
     */
    makeText(time, size, seeder, isW, isSp) {
        const self = this;
        time = time && time.trim();
        size = size && size.replace(/\s/g, '');
        seeder = seeder && seeder.replace(/[\s,]/g, '').trim();
        if (!(time && size && seeder)) {
            self.log('获取的魔力值参数有误！\n' + [time, size, seeder].join(), 1);
            return ['<span>NaN</span>', '<span>NaN</span>'];
        }
        // self.log(['发布：' + time + '，大小：' + size + '，种子：' + seeder].join());

        let T = (new Date().getTime() - new Date(time).getTime()) / 1e3 / 86400 / 7;

        let size_tp = 1;
        let S = size.replace(/[KMGT]i?B/, function (tp) {
            if (tp == 'KB' || tp == 'KiB') {
                size_tp = 1 / 1024 / 1024;
            } else if (tp == 'MB' || tp == 'MiB') {
                size_tp = 1 / 1024;
            } else if (tp == 'GB' || tp == 'GiB') {
                size_tp = 1;
            } else if (tp == 'TB' || tp == 'TiB') {
                size_tp = 1024;
            }
            return '';
        });
        S = parseFloat(S) * size_tp;
        let N = parseInt(seeder);

        // A1、B1 为当前值，A2、B2 为做种预测值
        let A1, B1, A2, B2;
        let site = self.get_site_name();
        if (site == 'hdarea') {
            A1 = A2 = 0;
            // 公式: GB * (1+周数*2%) * (1+1/人数) * 0.05
            B1 = N > 0 ? (S * (1 + T * 0.02) * (1 + 1 / N) * 0.05).toFixed(2) : '0.00';
            B2 = (S * (1 + T * 0.02) * (1 + 1 / (N + 1)) * 0.05).toFixed(2);
        } else {
            A1 = N > 0 ? self.calcA(T, S, N, isW, isSp) : 0;
            B1 = self.calcB(A1, isSp).toFixed(2);
            A2 = self.calcA(T, S, N + 1, isW, isSp);
            B2 = self.calcB(A2, isSp).toFixed(2);
        }

        let ave1 = (A1 / S).toFixed(2);
        let temp1 = B1 + '@' + ave1;
        let text1 = '<span>' + temp1 + '</span>';
        let ave2 = (A2 / S).toFixed(2);
        let temp2 = B2 + '@' + ave2;
        let text2 = '<span>' + temp2 + '</span>';
        self.get_font_colors().forEach(color => {
            if (color.color != null || color.fontWeight != null) {
                if (ave1 >= color.min && ave1 < color.max) {
                    text1 = '<span style="'
                        + (color.color == null ? '' : 'color: ' + color.color + '; ')
                        + (color.fontWeight == null ? '' : 'font-weight: ' + color.fontWeight + ';')
                        + '">' + temp1 + '</span>';
                }
                if (ave2 >= color.min && ave2 < color.max) {
                    text2 = '<span style="'
                        + (color.color == null ? '' : 'color: ' + color.color + '; ')
                        + (color.fontWeight == null ? '' : 'font-weight: ' + color.fontWeight + ';')
                        + '">' + temp2 + '</span>';
                }
            }
        });
        return [text1, text2];
    }

    addDataColMTeam() {
        const self = this;
        let th = $('div.mt-4>table>thead>tr>th').filter(function () {
            return this.innerText && this.innerText.includes('B@A/GB');
        });
        if (th.length == 0) {
            $('div.mt-4>table>thead>tr>th:last').after('<th class="border-0 border-b border-solid border-[--mt-line-color] p-2 " style="width: 100px;" ' +
                'title="当前每小时获得的魔力值@每GB的A值\n做种每小时获得的魔力值@每GB的A值"><div>B@A/GB</div></th>');
        }
        let len = $('div.mt-4>table>thead>tr>th').length;
        $('div.mt-4>table>tbody>tr').each(function () {
            let $this = $(this);
            let time = $this.children('td:eq(2)').find('span').attr('title');
            let size = $this.children('td:eq(3)').text().trim();
            let seeder = $this.children('td:eq(4)').find('span:last').text();
            let textA = self.makeText(time, size, seeder).join(' ').replace(/(?<=font-weight:\s*)(\d+)/g, function(match) {
                return parseInt(match) - 200;
            });
            let tdTextA = '<td class="border-0 border-b border-solid border-[--mt-line-color] p-0 whitespace-pre-line" align="center">' + textA + '</td>'
            if ($this.children('td').length < len) {
                $this.children('td:last').after(tdTextA);
            } else {
                $this.children('td:last').replaceWith(tdTextA);
            }
        })
    }

    addDataColHaidan() {
        const self = this;
        $('div.torrent_menu').append('<div class="colhead table_head_cell a_col" title="当前每小时获得的魔力值@每GB的A值⇨做种每小时获得的魔力值@每GB的A值"><b>B@A/GB</b></div>');
        $('.torrent_group').each(function () {
            let $this = $(this);
            $this.find('.group').append('<div class="a_col table_cell"></div>');
            $this.find('.torrent_item').each(function () {
                let time = $(this).find('.time_col > span:last').attr('title');
                let size = $(this).find('.video_size').text();
                let seeder = $(this).find('.seeder_col').text();
                let textA = self.makeText(time, size, seeder).join('⇨');
                $(this).append('<div class="a_col table_cell">' + textA + '</div>');
            });
        });
        // 设置CSS属性
        $('.a_col').css({
            "display": "flex",
            "align-items": "center",
            "justify-content": "center",
            "text-align": "center",
            "width": "166px"
        });
    }

    addDataColHDCity() {
        const self = this;
        $('.tr_normal.mitem').each(function () {
            let $this = $(this);
            let time = $this.find('.mtop > div:last').contents().filter(function() {
                return this.nodeType === Node.TEXT_NODE;
            }).text();
            let size = $this.find('.mbottom > div:eq(2)').contents().filter(function() {
                return this.nodeType === Node.TEXT_NODE;
            }).text();
            let seeder = $this.find('.mbottom > div:eq(3) > a > font').text() || '0';
            let textA = self.makeText(time, size, seeder).join(' ⇨ ').replace(/\s*font-weight:\s*\d+;/g, '');
            $this.find('.mbottom').append('<div class="mbelement a_col" title="当前每小时获得的魅力值@每GB的A值 ⇨ 做种每小时获得的魅力值@每GB的A值">' +
                '<i class="material-icons DarkOrange1">flare</i>B@A/GB: ' + textA + '</td>');
        });
    }

    addDataColAudiences() {
        const self = this;
        $('#torrenttable-head,.torrent-sticky-head-row').append('<td class="colhead torrent-text-colhead" ' +
            'style="padding: 0px; box-sizing: border-box; min-width: 76px; max-width: 76px;" ' +
            'title="当前每小时获得的魔力值@每GB的A值\n做种每小时获得的魔力值@每GB的A值">B@A/GB</td>');
        $('#torrenttable>tbody>tr[data-torrent-row="1"]').each(function () {
            let $this = $(this);
            let time = $this.find('td.torrent-time-cell').find('span').attr('title');
            let size = $this.find('td.torrent-size-cell').text();
            let seeder = $this.find('td.torrent-seeders-cell').text();
            let isW = false, isSp = false;
            $this.find('span.tags').each(function () {
                if (this.innerText) {
                    if (this.innerText.includes('零魔')) {
                        isW = true;
                    }
                    if (this.innerText.includes('官方')) {
                        isSp = true;
                    }
                }
            });
            let textA = self.makeText(time, size, seeder, isW, isSp).map(item => '<div>' + item + '</div>').join('');
            $this.append('<td class="rowfollow">' + textA + '</td>');
        });
    }

    addDataColFlex() {
        const self = this;
        $('div.torrent-manage:first').before('<div class="flex items-center justify-center a_col" title="当前每小时获得的魔力值@每GB的A值\n做种每小时获得的魔力值@每GB的A值">' +
            '<span class="text-[16px] m-auto" style="color: #ffffff;">B@A/GB</span></td>');
        $('div.torrent-table-sub-info').each(function () {
            let $this = $(this);
            let time = $this.find('div.torrent-info-text-added > span').attr('title');
            let size = $this.find('div.torrent-info-text-size').text();
            let seeder = $this.find('div.torrent-info-text-seeders').text();
            let isW = false, isSp = false;
            $this.find('div.torrent-table-for-spider-info.torrent-title span').each(function () {
                if (this.innerText) {
                    if (this.innerText.includes('零魔')) {
                        isW = true;
                    }
                    if (this.innerText.includes('官方') || this.innerText.includes('官种')) {
                        isSp = true;
                    }
                }
            });
            let textA = self.makeText(time, size, seeder, isW, isSp).join('');
            $this.children('div:last').before('<div class="flex flex-col items-center justify-center gap-y-1 a_col">' + textA + '</div>');
        })
        // 设置CSS属性
        $('.a_col').css({
            "width": "76px"
        });
        $('.torrent-title').css({
            "width": "58%"
        });
    }

    addDataColGeneral() {
        const self = this;
        let site = self.get_site_name();
        let i_T, i_S, i_N, addFlag = false;
        $('table.torrents').filter(function () {
            return $(this).find('tbody:first>tr').length > 1;
        }).find('tbody>tr').each(function (row) {
            let $this = $(this);
            if (row == 0) {
                $this.children('td').each(function (col) {
                    if ($(this).find('img.time,[alt="time"]').length > 0) {
                        i_T = col
                    } else if ($(this).find('img.size,[alt="size"]').length > 0) {
                        i_S = col
                    } else if ($(this).find('img.seeders,[alt="seeders"]').length > 0) {
                        i_N = col
                    }
                });
                if (!(i_T && i_S && i_N)) {
                    self.log('未能找到数据列！' + [i_T, i_S, i_N].join(), 1);
                    return;
                }
                $this.children('td:last').after('<td class="colhead" style="padding: 0px" title="当前每小时获得的魔力值@每GB的A值\n做种每小时获得的魔力值@每GB的A值">B@A/GB</td>');
                addFlag = true;
            } else if (addFlag && $this.children().length >= 9) {
                let time = $this.children('td:eq(' + i_T + ')').find('span').attr('title');
                if (!time) {
                    time = $this.children('td:eq(' + i_T + ')').html().replace('<br>', ' ');
                }
                let size = $this.children('td:eq(' + i_S + ')').text();
                let seeder = $this.children('td:eq(' + i_N + ')').text();
                let tags, isW = false, isSp = false;
                if (site == 'pterclub') {
                    tags = $this.find('a.torrents-tag');
                } else {
                    tags = $this.find('table.torrentname span');
                }
                tags.each(function () {
                    if (this.innerText) {
                        if (site == 'sewerpt') {
                            if (this.innerText.includes('冷门/低分')) {
                                isW = true;
                            }
                        } else if (site == 'pterclub') {
                            if (this.innerText.includes('Si=0')) {
                                isW = true;
                            }
                        } else {
                            if (this.innerText.includes('零魔')) {
                                isW = true;
                            }
                        }
                        if (site == 'xloli') {
                            if (this.innerText.includes('精选')) {
                                isSp = true;
                            }
                        } else if (site == 'muxuege') {
                            if (this.innerText.includes('本阁秘籍')) {
                                isSp = true;
                            }
                        } else {
                            if (this.innerText.search(/官方|官种|官组/) != -1) {
                                isSp = true;
                            }
                        }
                    }
                });
                let textA = self.makeText(time, size, seeder, isW, isSp).map(item => '<div>' + item + '</div>').join('');
                $this.children('td:last').after('<td class="rowfollow">' + textA + '</td>');
            }
        });
    }

    update_args() {
        const self = this;
        try {
            let mat;
            let site = self.get_site_name();
            if (site == 'xloli') {
                let tD, tE, tWi, tWi_s, tBuff;
                mat = $('li:has(b:contains("D"))').eq(1).text().match(/D\s*=\s*(\d+(?:\.\d+)?).*?E\s*=\s*(\d+(?:\.\d+)?)/);
                if (mat) {
                    tD = parseFloat(mat[1]);
                    tE = parseFloat(mat[2]);
                }
                mat = $('li:has(b:contains("Wi"))').eq(1).text().match(/默认为\s*(\d+(?:\.\d+)?)，零魔种子为\s*(\d+(?:\.\d+)?)/);
                if (mat) {
                    tWi = parseFloat(mat[1]);
                    tWi_s = parseFloat(mat[2]);
                }
                mat = $('li:contains("当前非精选种子系数为")').text().match(/当前非精选种子系数为:\s(\d+(?:\.\d+)?)/);
                if (mat) {
                    tBuff = parseFloat(mat[1]);
                }
                if ((tD && tE && tWi && tWi_s && tBuff) === undefined) {
                    self.log('魔力值参数未完整获取！\n' + [tD, tE, tWi, tWi_s, tBuff].join(), 1);
                    alert('魔力值参数获取失败，请将 Tampermonkey 的配置模式修改为高级后手动修改存储配置参数，详见说明文档');
                    return;
                }
                //更新参数
                self.coef = {
                    'D': tD,
                    'E': tE,
                    'Wi': tWi,
                    'Wi_s': tWi_s,
                    'Buff': tBuff
                };
            } else {
                let tT0, tN0, tB0, tL, tB0_s, tL_s, tWi, tWi_s, tM, tK, tK_s, tD, tBuff;
                if (site == 'hhanclub') {
                    mat = $('li:has(kbd:contains("T0"))').text().match(/=\s*(\d+)/);
                    if (mat) {
                        tT0 = parseFloat(mat[1]);
                    }
                    mat = $('li:has(kbd:contains("N0"))').text().match(/=\s*(\d+)/);
                    if (mat) {
                        tN0 = parseFloat(mat[1]);
                    }
                    mat = $('li:has(kbd:contains("B0"))').text().match(/=\s*(\d+)（保种区B0为(\d+)）/);
                    if (mat) {
                        tB0 = parseFloat(mat[1]);
                        // tB0_s = parseFloat(mat[2]);
                    }
                    mat = $('li:has(kbd:contains("L"))').text().match(/=\s*(\d+)/);
                    if (mat) {
                        tL = parseFloat(mat[1]);
                    }
                    mat = $('li:has(kbd:contains("Wi"))').text().match(/默认为\s*(\d+(?:\.\d+)?)，零魔种子为\s*(\d+(?:\.\d+)?)/);
                    if (mat) {
                        tWi = parseFloat(mat[1]);
                        tWi_s = parseFloat(mat[2]);
                    }
                    mat = $('p:contains("当前官种系数为")').text().match(/当前官种系数为:\s*(\d+)/);
                    if (mat) {
                        tBuff = parseFloat(mat[1]);
                    }
                } else {
                    mat = $('li:has(b:contains("T0"))').eq(1).text().match(/=\s*(\d+)/);
                    if (mat) {
                        tT0 = parseFloat(mat[1]);
                    }
                    mat = $('li:has(b:contains("N0"))').eq(1).text().match(/=\s*(\d+)/);
                    if (mat) {
                        tN0 = parseFloat(mat[1]);
                    }
                    if (site == 'audiences') {
                        mat = $('li:has(b:contains("B0"))').eq(1).text().match(/分别为\s*(\d+),\s*(\d+)/);
                        if (mat) {
                            tB0 = parseFloat(mat[2]);
                            tB0_s = parseFloat(mat[1]);
                        }
                    } else {
                        mat = $('li:has(b:contains("B0"))').eq(1).text().match(/=\s*(\d+)/);
                        if (mat) {
                            tB0 = parseFloat(mat[1]);
                        }
                    }
                    mat = $('li:has(b:contains("L"))').eq(1).text().match(/=\s*(\d+)/);
                    if (mat) {
                        tL = parseFloat(mat[1]);
                    }
                    if (site == 'ubits') {
                        mat = $('li:has(b:contains("B0"))').eq(2).text().match(/=\s*(\d+)/);
                        if (mat) {
                            tB0_s = parseFloat(mat[1]);
                        }
                        mat = $('li:has(b:contains("L"))').eq(2).text().match(/=\s*(\d+)/);
                        if (mat) {
                            tL_s = parseFloat(mat[1]);
                        }
                    }
                    if (site == 'sewerpt') {
                        mat = $('li:has(b:contains("Wi"))').eq(1).text().match(/默认为\s*(\d+(?:\.\d+)?)，冷门\/低分种子为\s*(\d+(?:\.\d+)?)/);
                        if (mat) {
                            tWi = parseFloat(mat[1]);
                            tWi_s = parseFloat(mat[2]);
                        }
                    } else if (['audiences', 'hdhome', 'pthome'].includes(site)) {
                        mat = $('li:has(b:contains("Wi"))').eq(1).text().match(/普通种子权重=(\d+(?:\.\d+)?)，官种种子权重=(\d+(?:\.\d+)?)/);
                        if (mat) {
                            tWi = parseFloat(mat[1]);
                            tWi_s = parseFloat(mat[2]);
                        }
                    } else {
                        mat = $('li:has(b:contains("Wi"))').eq(1).text().match(/(?:默认为|默認為)\s*(\d+(?:\.\d+)?)，(?:零魔种子为|零魔種子為)\s*(\d+(?:\.\d+)?)/);
                        if (mat) {
                            tWi = parseFloat(mat[1]);
                            tWi_s = parseFloat(mat[2]);
                        }
                    }
                    if (site == 'hdsky') {
                        mat = $('li:has(b:contains("M"))').eq(1).text().match(/=\s*(\d+)/);
                        if (mat) {
                            tM = parseFloat(mat[1]);
                        }
                        mat = $('li:has(b:contains("K"))').eq(1).text().match(/官方种子K=(\d+(?:\.\d+)?)，非官方种子K=(\d+(?:\.\d+)?)/);
                        if (mat) {
                            tK = parseFloat(mat[2]);
                            tK_s = parseFloat(mat[1]);
                        }
                    }
                    if (site == 'piggo') {
                        mat = $('li:has(b:contains("D"))').eq(1).text().match(/=\s*(\d+(?:\.\d+)?)/);
                        if (mat) {
                            tD = parseFloat(mat[1]);
                        }
                    }
                    mat = $('li:contains("当前官种系数为"),li:contains("當前官種系數為")').text().match(/(?:当前官种系数为|當前官種系數為):\s*(\d+(?:\.\d+)?)/);
                    if (mat) {
                        tBuff = parseFloat(mat[1]);
                    }
                }
                if ((tT0 && tN0 && tB0 && tL) === undefined) {
                    self.log('魔力值参数未完整获取！\n' + [tT0, tN0, tB0, tL, tB0_s, tL_s].join(), 1);
                    alert('魔力值参数获取失败，请将 Tampermonkey 的配置模式修改为高级后手动修改存储配置参数，详见说明文档');
                    return;
                }
                //更新参数
                self.coef = {
                    'T0': tT0,
                    'N0': tN0,
                    'B0': tB0,
                    'L': tL
                };
                if (tB0_s != undefined) {
                    self.coef.B0_s = tB0_s;
                }
                if (tL_s != undefined) {
                    self.coef.L_s = tL_s;
                }
                if (tWi != undefined) {
                    self.coef.Wi = tWi;
                }
                if (tWi_s != undefined) {
                    self.coef.Wi_s = tWi_s;
                }
                if (tM != undefined) {
                    self.coef.M = tM;
                }
                if (tK != undefined) {
                    self.coef.K = tK;
                }
                if (tK_s != undefined) {
                    self.coef.K_s = tK_s;
                }
                if (tD != undefined) {
                    self.coef.D = tD;
                }
                if (tBuff != undefined) {
                    self.coef.Buff = tBuff;
                }
            }
            self.vault.set_str_data('coef', self.coef);
            self.vault.save_vault();
            return true;
        } catch (error) {
            self.log('魔力值参数获取出错：\n' + error, 2);
        }
        return false;
    }

    run() {
        const self = this;
        self.coef = self.vault.get_str_data('coef');
        self.log(self.coef);

        let site = self.get_site_name();
        let argsReady = self.coef && true;
        if (self.isFormulaPage) {
            argsReady = this.update_args() || argsReady;
        } else if (!argsReady) {
            if (site == 'hdarea') {
                // hdarea 公式不通用，无需获取参数
            } else {
                alert('未找到魔力值参数，即将打开魔力值参数页面获取。');
                location.href = self.formulaPath;
                return;
            }
        }
        if (self.isMybonusPage) {
            try {
                if (argsReady) {
                    self.initChart();
                }
            } catch (error) {
                self.log('B - A 图初始化失败：\n' + error, 1);
            }
        } else {
            if (site == 'm-team') {
                self.addDataColMTeam();
            } else if (site == 'haidan') {
                self.addDataColHaidan();
            } else if (site == 'hdcity') {
                self.addDataColHDCity();
            } else if (site == 'audiences') {
                self.addDataColAudiences();
            } else if (['hhanclub', 'cspt'].includes(site)) {
                self.addDataColFlex();
            } else {
                self.addDataColGeneral();
            }
        }
    }

    listen_url_changed() {
        const self = this;
        self.urlChanged = true;

        let previousURL;
        if (window.onurlchange === null) {
            window.addEventListener('urlchange', info => {
                if (info && info.url != previousURL) {
                    self.log('onurlchange');
                    previousURL = info.url;
                    self.isFormulaPage = previousURL.includes(self.formulaPath);
                    self.isMybonusPage = previousURL.includes(self.bonusPath);
                    self.urlChanged = true;
                }
            });
        }
    }

    observe_mteam() {
        const self = this;
        self.log('observe_mteam');
        self.listen_url_changed();

        function innerCheck(list_add) {
            if (!self.urlChanged) {
                return;
            }
            if (self.isMybonusPage) {
                if ($('table.tablist').length > 0) {
                    self.log(list_add ? '添加目标节点' : '找到目标节点');
                    self.urlChanged = false;
                    self.run();
                }
            } else if (location.pathname.includes('/browse')) {
                if (list_add) {
                    list_add.forEach(node => {
                        // self.log(node);
                        if (node.nodeName == 'BUTTON') {
                            if ($(node).find('span.anticon-left,span.anticon-right').length > 0) {
                                self.log('添加 Button 节点');
                                self.urlChanged = false;
                                self.run();
                            }
                        } else if (node.nodeName == 'SPAN') {
                            if (node.className && node.className.search(/anticon-left|anticon-right/) != -1) {
                                self.log('添加 Span 节点');
                                self.urlChanged = false;
                                self.run();
                            }
                        }
                    });
                } else if ($('div.mt-4>table>tbody>tr').length > 0) {
                    self.log('找到目标节点');
                    self.urlChanged = false;
                    self.run();
                }
            } else {
                self.urlChanged = false;
            }
        }
        let ob = new Observer(function(list_add, list_remove) {
            if (list_add.length > 0) {
                innerCheck(list_add);
            }
        });
        ob.observe(document.body);
        innerCheck();
    }

    observe_dubhe() {
        const self = this;
        self.log('observe_dubhe');
        self.listen_url_changed();

        function innerCheck(list_add) {
            if (!self.urlChanged) {
                return;
            }
            if (location.pathname.search(/^\/(torrents|mybonus)\.php/) != -1) {
                if ($('table.mainouter').length > 0) {
                    self.log(list_add ? '添加目标节点' : '找到目标节点');
                    self.urlChanged = false;
                    self.run();
                }
            } else {
                self.urlChanged = false;
            }
        }
        let ob = new Observer(function(list_add, list_remove) {
            if (list_add.length > 0) {
                innerCheck(list_add);
            }
        });
        ob.observe(document.body);
        innerCheck();
    }

    main() {
        const self = this;
        let site = self.get_site_name();
        if (site == 'm-team') {
            self.observe_mteam();
        } else if (site == 'dubhe') {
            self.observe_dubhe();
        } else {
            self.run();
        }
    }
}

setTimeout(function () {
    new MyApp();
}, 1000);
