// ==UserScript==
// @name         PT站点魔力计算器
// @namespace    https://github.com/neoblackxt/PTMyBonusCalc
// @version      2.1.0.1
// @description  在使用NexusPHP架构的PT站点显示每个种子的A值和每GB的A值。
// @author       kim.wu, neoblackxt, LaneLau
// @require      https://cdn.jsdelivr.net/npm/jquery@3/dist/jquery.min.js
// @require      https://cdn.jsdelivr.net/npm/echarts@5/dist/echarts.min.js
// @require      https://cdn.jsdelivr.net/gh/kimwuX/various_scripts@master/javascript/library.js

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
// @match        *://dubhe.site/torrents.php*
// @match        *://pt.gtkpw.xyz/torrents.php*
// @match        *://pt.lajidui.top/torrents.php*
// @match        *://crabpt.vip/torrents.php*
// @match        *://crabpt.vip/special.php*
// @match        *://www.52movie.top/torrents.php*
// @match        *://p.t-baozi.cc/torrents.php*
// @match        *://pt.muxuege.org/torrents.php*
// @match        *://pt.ying.us.kg/torrents.php*

// @match        *://www.tangpt.top/torrents.php*
// @match        *://rousi.pro/torrents.php*
// @match        *://hdfans.org/torrents.php*
// @match        *://hdfans.org/special.php*
// @match        *://pt.xingyungept.org/torrents.php*
// @match        *://hdvideo.top/torrents.php*
// @match        *://sunnypt.top/torrents.php*
// @match        *://pt.hdclone.top/torrents.php*
// @match        *://duckboobee.org/torrents.php*

// @match        *://hdcity.city/pt*
// @match        *://kp.m-team.cc/browse*
// @match        *://kp.m-team.cc/mybonus*
// @match        *://wiki.hhanclub.net/zh/%E7%AB%99%E7%82%B9%E8%A7%84%E5%88%99/%E6%86%A8%E8%B1%86%E4%B8%8E%E5%81%9A%E7%A7%8D%E7%A7%AF%E5%88%86
// @match        *://*.tjupt.org/bonus.php?show=description
// @match        *://www.hxpt.org/mybonusmine.php
// @match        *://hdcity.city/mybonus
// @match        */mybonus.php*

// @exclude      *://*.tjupt.org/mybonus.php*
// @exclude      *://hdarea.club/*
// @exclude      *://springsunday.net/*
// @exclude      *://totheglory.im/*
// @exclude      *://qingwapt.com/*
// @exclude      *://mua.xloli.cc/*

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
        let res;
        if (self.host.search(/m-team\.(cc|io)/i) != -1) {
            res = 'm-team';
        } else if (self.host.includes('tjupt.org')) {
            res = 'tjupt';
        } else if (self.host.includes('hdcity.city')) {
            res = 'hdcity';
        } else if (self.host.includes('hxpt.org')) {
            res = 'hxpt';
        } else if (self.host.includes('hhanclub.net')) {
            res = 'hhanclub';
        } else if (self.host.includes('dubhe.site')) {
            res = 'dubhe';
        } else if (self.host.includes('audiences.me')) {
            res = 'audiences';
        } else if (self.host.includes('hdcity.city')) {
            res = 'hdcity';
        } else if (self.host.includes('pterclub.net')) {
            res = 'pterclub';
        } else if (self.host.includes('ubits.club')) {
            res = 'ubits';
        } else if (self.host.includes('haidan.cc')) {
            res = 'haidan';
        } else if (self.host.includes('cspt.top')) {
            res = 'cspt';
        } else {
            res = '';
        }
        return res;
    }

    init() {
        const self = this;
        // ave不同范围对应的颜色及字重
        self.colorsOfAVE = [
            // null表示使用默认颜色和字重
            {min: 0, max: 1, color: null, fontWeight: null}, // 黑色
            {min: 1, max: 1.5, color: '#00008B', fontWeight: 700}, // 蓝色
            {min: 1.5, max: 2, color: '#8B4513', fontWeight: 800}, // 棕色
            {min: 2, max: Infinity, color: '#ff0000', fontWeight: 900} // 红色
        ];
        self.host = location.hostname.replace(/^wiki\./, '');
        self.formulaPath = undefined;
        self.bonusPath = undefined;
        let site = self.get_site_name();
        if (site === 'm-team') {
            self.bonusPath = location.origin + '/mybonus';
        } else if (site === 'tjupt') {
            self.bonusPath = location.origin + '/bonus.php?show=description';
        } else if (site === 'hdcity') {
            self.bonusPath = location.origin + '/mybonus';
        } else if (site === 'hxpt') {
            self.bonusPath = location.origin + '/mybonusmine.php';
        } else if (site === 'hhanclub') {
            self.formulaPath = location.origin.replace('://hhanclub', '://wiki.hhanclub')
               + '/zh/%E7%AB%99%E7%82%B9%E8%A7%84%E5%88%99/%E6%86%A8%E8%B1%86%E4%B8%8E%E5%81%9A%E7%A7%8D%E7%A7%AF%E5%88%86';
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

    calcA(T, S, N, T0, N0) {
        const self = this;
        let c1 = 1 - Math.pow(10, -(T / self.coef.T0));
        // 当断种时，显示续种后的实际值，因为当前状态值无意义
        N = N ? N : 1;
        // 当前状态值，加入做种后实际值会小于当前值
        let c2 = 1 + Math.pow(2, .5) * Math.pow(10, -(N - 1) / (self.coef.N0 - 1));
        return c1 * S * c2;
    }

    calcB(A, B0, L) {
        const self = this;
        return self.coef.B0 * (2 / Math.PI) * Math.atan(A / self.coef.L);
    }

    calcAbyB(B, B0, L) {
        const self = this;
        //从B值反推A值
        return Math.tan(B / self.coef.B0 / (2 / Math.PI)) * self.coef.L;
    }

    initChart(T0, N0, B0, L) {
        const self = this;
        let A, B;
        let site = self.get_site_name();
        if (site === 'm-team') {
            A = 0;
            B = parseFloat($('td:contains("基本獎勵")+td+td')[0].innerText);
            // 剔除M-Team的基本奖励中做种数奖励
            let matches = $('li:contains("你的做種數")').text().match(/(\d+(?:\.\d+)?)個魔力值.*最多計(\d+)個/);
            let seedingBonusPerSeed = parseFloat(matches[1]);
            let seedingBonusLimit = parseInt(matches[2]);
            let currentSeeding = parseInt($('span:contains("當前活動")').siblings('span:eq(1)').text());
            B = B - (currentSeeding > seedingBonusLimit ? seedingBonusPerSeed * seedingBonusLimit : seedingBonusPerSeed * currentSeeding);
        } else {
            let mat;
            let nodeA = $('div:contains("当前每小时能获取")');
            if (site === 'audiences') {
                mat = nodeA.text().match(/官组种子A\s*=\s*(\d+(?:\.\d+)?).*?普通种子A\s*=\s*(\d+(?:\.\d+)?)/s);
                A = parseFloat(mat[2]);
            } else {
                mat = nodeA.text().match(/A\s*=\s*(\d+(?:\.\d+)?)/);
                A = parseFloat(mat[1]);
            }
            B = self.calcB(A);
        }
        // 对于M-Team，B>B0是因为网页获取的基本奖励包括了做种数的奖励，上面代码已经进行排除。
        // 其他站暂不明确是否有该问题，下面一行的代码暂时保留
        B = B >= B0 ? B0 * 0.98 : B;
        if (site === 'm-team') {
            A = self.calcAbyB(B);
        }

        let spot = [A, B]

        let data = []
        for (let i = 0; i < (1.1 * A > 25 * L ? 1.1 * A : 25 * L); i = i + L / 4) {
            data.push([i, self.calcB(i)])
        }

        self.insertChart(data, spot);
    }

    insertChart(data, spot) {
        const self = this;
        let insertPos;
        let site = self.get_site_name();
        if (site === 'm-team') {
            insertPos = $('ul+table');
        } else if (['hdcity', 'pterclub'].includes(site)) {
            insertPos = $('div+h3');
        } else if (site === 'hhanclub') {
            insertPos = $('h1:contains("官种加成每小时将额外得到如下的憨豆")').parent();
        } else {
            insertPos = $('table+h1');
        }
        if (insertPos.length == 0) {
            self.log('未找到 B - A 图插入位置！', 1);
            return;
        }
        insertPos.before('<div id="main" style="width: 600px;height:400px; margin:auto;"></div>')

        let myChart = echarts.init(document.getElementById('main'));
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
     *
     * @param time 种子发布时间
     * @param size 种子体积
     * @param seeder 做种人数
     */
    makeA2(time, size, seeder) {
        const self = this;
        time = time && time.trim();
        size = size && size.replace(/\s/g, '');
        seeder = seeder && seeder.replace(/[\s,]/g, '').trim();
        if (!(time && size && seeder)) {
            self.log('获取的魔力值参数有误！\n' + [time, size, seeder].join(), 1);
            return '<span>NaN</span>';
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
        let A = self.calcA(T, S, N).toFixed(2);
        let ave = (A / S).toFixed(2);

        let textA = '<span>' + A + '@' + ave + '</span>';
        self.colorsOfAVE.forEach(color => {
            if (ave >= color.min && ave < color.max && (color.color != null || color.fontWeight != null)) {
                textA = '<span style="'
                    + (color.color == null ? '' : 'color:' + color.color + ';')
                    + (color.fontWeight == null ? '' : 'font-weight:' + color.fontWeight + ';')
                    + '">' + A + '@' + ave + '</span>';
            }
        });
        return textA;
    }

    addDataColMTeam() {
        const self = this;
        let addFlag = false;
        $('div.mt-4>table>thead>tr>th').each(function () {
            if ($(this).text().includes('A@A/GB')) {
                addFlag = true;
            }
        });
        if (!addFlag) {
            $('div.mt-4>table>thead>tr>th:last').after(
                '<th class="border-0 border-b border-solid border-[--mt-line-color] p-2 " style="width: 100px;" title="A值@每GB的A值"> ' +
                '<div class="action">A@A/GB</div>  </th>');
        }
        $('div.mt-4>table>tbody>tr').each(function () {
            let $this = $(this);
            let time = $this.children('td:eq(2)').find('span').attr('title');
            let size = $this.children('td:eq(3)').text().trim();
            let seeder = $this.children('td:eq(4)').find('span:last').text();
            let textA = self.makeA2(time, size, seeder);
            let tdTextA = '<td class="border-0 border-b border-solid border-[--mt-line-color] p-0 " align="center">' + textA + '</td>'
            $this.children('td:last').after(tdTextA)
        })
    }

    addDataColHaidan() {
        const self = this;
        $('div.torrent_menu').append('<div class="colhead table_head_cell a_col" title="A值@每GB的A值"><b>A@A/GB</b></div>');
        $('.torrent_group').each(function () {
            let $this = $(this);
            $this.find('.group').append('<div class="a_col table_cell"></div>');
            $this.find('.torrent_item').each(function () {
                let time = $(this).find('.time_col > span:last').attr('title');
                let size = $(this).find('.video_size').text();
                let seeder = $(this).find('.seeder_col').text();
                let textA = self.makeA2(time, size, seeder);
                $(this).append('<div class="a_col table_cell">' + textA + '</div>');
            });
        });
        // 设置CSS属性
        $('.a_col').css({
            "display": "flex",
            "align-items": "center",
            "justify-content": "center",
            "text-align": "center",
            "width": "86px"
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
            let seeder = $this.find('.mbottom > div:eq(3) > a > font').text();
            let textA = self.makeA2(time, size, seeder);
            $this.find('.mbottom').append('<div class="mbelement" title="A值@每GB的A值">A值: ' + textA + '</td>');
        });
    }

    addDataColFlex() {
        const self = this;
        $('div.torrent-manage:first').before('<div class="a_col" title="A值@每GB的A值"><b>A@A/GB</b></td>');
        $('div.torrent-table-sub-info').each(function () {
            let $this = $(this);
            let time = $this.find('div.torrent-info-text-added > span').attr('title');
            let size = $this.find('div.torrent-info-text-size').text();
            let seeder = $this.find('div.torrent-info-text-seeders a').text();
            let textA = self.makeA2(time, size, seeder);
            $this.children('div:last').before('<div class="a_col">' + textA + '</div>');
        })
        // 设置CSS属性
        $('.a_col').css({
            "display": "flex",
            "align-items": "center",
            "justify-content": "center",
            "text-align": "center",
            "width": "76px"
        });
        $('.torrent-title').css({
            "width": "58%"
        });
    }

    addDataColGeneral() {
        const self = this;
        let i_T, i_S, i_N, addFlag = false;
        $('.torrents:first>tbody>tr').each(function (row) {
            let $this = $(this);
            if (row == 0) {
                $this.children('td').each(function (col) {
                    if ($(this).find('img.time').length > 0 || $(this).find('[alt="time"]').length > 0 || $(this).find('span.torrent-colhead-icon--time').length > 0) {
                        i_T = col
                    } else if ($(this).find('img.size').length > 0 || $(this).find('[alt="size"]').length > 0 || $(this).find('span.torrent-colhead-icon--size').length > 0) {
                        i_S = col
                    } else if ($(this).find('img.seeders').length > 0 || $(this).find('[alt="seeders"]').length > 0 || $(this).find('span.torrent-colhead-icon--seeders').length > 0) {
                        i_N = col
                    }
                });
                if (!(i_T && i_S && i_N)) {
                    self.log('未能找到数据列！', 1);
                    return;
                }
                $this.children('td:last').after('<td class="colhead" style="padding: 0px" title="A值@每GB的A值">A@A/GB</td>');
                addFlag = true;
            } else if (addFlag && $this.children().length >= 9) {
                let time = $this.children('td:eq(' + i_T + ')').find('span').attr('title');
                if (!time) {
                    time = $this.children('td:eq(' + i_T + ')').html().replace('<br>', ' ');
                }
                let size = $this.children('td:eq(' + i_S + ')').text();
                let seeder = $this.children('td:eq(' + i_N + ')').text();
                let textA = self.makeA2(time, size, seeder);
                $this.children('td:last').after('<td class="rowfollow">' + textA + '</td>');
            }
        });
    }

    update_args() {
        const self = this;
        try {
            let mat;
            let tT0, tN0, tB0, tL, tB0_s, tL_s;
            let site = self.get_site_name();
            if (site === 'hhanclub') {
                mat = $('li:has(kbd:contains("T0"))').text().match(/=\s*(\d+)/);
                if (mat) {
                    tT0 = parseInt(mat[1]);
                }
                mat = $('li:has(kbd:contains("N0"))').text().match(/=\s*(\d+)/);
                if (mat) {
                    tN0 = parseInt(mat[1]);
                }
                mat = $('li:has(kbd:contains("B0"))').text().match(/=\s*(\d+)（保种区B0为(\d+)）/);
                if (mat) {
                    tB0 = parseInt(mat[1]);
                    tB0_s = parseInt(mat[2]);
                }
                mat = $('li:has(kbd:contains("L"))').text().match(/=\s*(\d+)/);
                if (mat) {
                    tL = parseInt(mat[1]);
                }
            } else {
                mat = $('li:has(b:contains("T0"))').eq(1).text().match(/=\s*(\d+)/);
                if (mat) {
                    tT0 = parseInt(mat[1]);
                }
                mat = $('li:has(b:contains("N0"))').eq(1).text().match(/=\s*(\d+)/);
                if (mat) {
                    tN0 = parseInt(mat[1]);
                }
                if (site === 'audiences') {
                    mat = $('li:has(b:contains("B0"))').eq(1).text().match(/分别为\s*(\d+),\s*(\d+)/);
                    if (mat) {
                        tB0 = parseInt(mat[2]);
                        tB0_s = parseInt(mat[1]);
                    }
                } else {
                    mat = $('li:has(b:contains("B0"))').eq(1).text().match(/=\s*(\d+)/);
                    if (mat) {
                        tB0 = parseInt(mat[1]);
                    }
                }
                mat = $('li:has(b:contains("L"))').eq(1).text().match(/=\s*(\d+)/);
                if (mat) {
                    tL = parseInt(mat[1]);
                }
                if (site === 'ubits') {
                    mat = $('li:has(b:contains("B0"))').eq(2).text().match(/=\s*(\d+)/);
                    if (mat) {
                        tB0_s = parseInt(mat[1]);
                    }
                    mat = $('li:has(b:contains("L"))').eq(2).text().match(/=\s*(\d+)/);
                    if (mat) {
                        tL_s = parseInt(mat[1]);
                    }
                }
            }
            if (!(tT0 && tN0 && tB0 && tL)) {
                self.log('魔力值参数未完整获取！\n' + [tT0, tN0, tB0, tL, tB0_s, tL_s].join(), 1);
                alert('魔力值参数获取失败，请将 Tampermonkey 的配置模式修改为高级后手动修改存储配置参数，详见说明文档');
                return;
            }
            self.log('魔力值参数获取成功：\n' + [tT0, tN0, tB0, tL, tB0_s, tL_s].join());
            //更新参数
            self.coef.T0 = tT0;
            self.coef.N0 = tN0;
            self.coef.B0 = tB0;
            self.coef.L = tL;
            if (tB0_s) {
                self.coef.B0_s = tB0_s;
            }
            if (tL_s) {
                self.coef.L_s = tL_s;
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
        self.coef = self.vault.get_str_data('coef', {});
        self.log(self.coef);

        let argsReady = self.coef.T0 && self.coef.N0 && self.coef.B0 && self.coef.L && true;
        if (self.isFormulaPage) {
            argsReady = this.update_args() || argsReady;
        } else if (!argsReady) {
            alert('未找到魔力值参数，即将打开魔力值参数页面获取。');
            location.href = self.formulaPath;
            return;
        }
        if (self.isMybonusPage) {
            try {
                if (argsReady) {
                    self.initChart(self.coef.T0, self.coef.N0, self.coef.B0, self.coef.L);
                }
            } catch (error) {
                self.log('B - A 图初始化失败：\n' + error);
            }
        } else {
            let site = self.get_site_name();
            if (site === 'm-team') {
                self.addDataColMTeam();
            } else if (site === 'haidan') {
                self.addDataColHaidan();
            } else if (site === 'hdcity') {
                self.addDataColHDCity();
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
            } else {
                if (list_add) {
                    list_add.forEach(node => {
                        // self.log(node);
                        if (node.className && node.className.search(/anticon-left|anticon-right/) != -1) {
                            self.log('添加目标节点');
                            self.urlChanged = false;
                            self.run();
                        }
                    });
                } else if ($('div.mt-4>table>tbody>tr').length > 0) {
                    self.log('找到目标节点');
                    self.urlChanged = false;
                    self.run();
                }
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
            if ($('table.mainouter').length > 0) {
                self.log(list_add ? '添加目标节点' : '找到目标节点');
                self.urlChanged = false;
                self.run();
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
        if (site === 'm-team') {
            self.observe_mteam();
        } else if (site === 'dubhe') {
            self.observe_dubhe();
        } else {
            self.run();
        }
    }
}

setTimeout(function () {
    new MyApp();
}, 1000);
