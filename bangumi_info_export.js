// ==UserScript==
// @name         Bangumi Info Export
// @namespace    http://www.kimwu.com/
// @version      1.0.0
// @description  Export Anime Info form Bangumi as BBCode or Html (modification based on Rhilip's version)
// @author       kim.wu
// @match       *://bgm.tv/subject/*
// @match       *://bangumi.tv/subject/*
// @match       *://chii.in/subject/*
// @grant        GM_setClipboard
// ==/UserScript==

////////////////////////////////////////////////////////////////
// 以下为自定义输出参数，请按照说明修改
const STAFFNUMBER = 15;                // 读取Staff栏数目
const CASTNUMBER = 9;                // 读取Cast栏数目
const MENU = ['Story: ', 'Staff: ', 'Cast: '];   //输出Menu控制
const STYLE = {
    'UBB': {                          // !--预设BBCode生成样式
        image: '[img]{0}[/img]',
        fontstyle: '[b]{0}[/b]',
        linedivision: '\n',              //行间分割控制
        sectiondivision: '\n\n'           //段间分割控制
    },
    'HTML': {                         // !--预设Html生成样式
        image: '<img src="{0}">',
        fontstyle: '<font color="#008080" face="Impact" size="5" style="margin: 0px; padding: 0px; word-wrap: break-word;">{0}</font>',
        linedivision: '<br>',
        sectiondivision: '<br><br>'
    }
};
const OUTFORMAT = 'UBB';               //默认输出格式（在不点击输出格式的情况下）；初始UBB，可选 'HTML' 'NONE'(不自动生成，点击输出)
////////////////////////////////////////////////////////////////

// Begin~
$(document).ready(function () {
    // 创建初始交互按钮与交互窗口
    $('div#headerSubject > div > ul >li:last').after('<div id="output" class="rr"><a class="infogen" title="导出简介"  href="#TB_inline?tb&height=500&width=800&inlineId=gen">导出简介</a></div>');
    $('<div style="display:none;" id="gen"><div class="bibeBox" style="padding:10px"><div class="tagList"><span>导出格式：</span><div class="inner"><a class="btnGray" id="OuttoUBB" data-style="UBB">BBcode</a>&nbsp;&nbsp;<a class="btnGray" id="OuttoHtml" data-style="HTML">Html</a></div></div><textarea name="Out_text" id="Out_text" cols="32" rows="20" class="quick" onclick="$(this).select()"></textarea></div></div>').insertBefore('#output');
    tb_init('a.infogen');  //Re-init the element we just inserted.

    //数据获取
    let cover_staff_another = $('div#bangumiInfo');
    
    let cover_another = cover_staff_another.find('a.thickbox.cover');
    let cover = cover_another ? ('https:' + cover_another.attr('href')).replace(/\/cover\/[lcmsg]\//, '/cover/l/') : '';
    
    let story_another = $('div#subject_summary');
    let story = story_another ? story_another.text().trim() : '';
    
    // 中文名、话数、放送开始、放送星期等信息 不视为staff列表项，将其转存进info项中
    let info_another = cover_staff_another.find('ul#infobox');
    let info = info_another.find('li').map(function () {
        return $(this).text();
    }).get();
    let raw_staff = info.filter(d => {
        return !/^(中文名|话数|放送开始|放送星期|别名|官方网站|播放电视台|其他电视台|Copyright)/.test(d)
    });

    let raw_cast = $('div.userContainer').map(function () {
        let cast_a = $(this).find('a.avatar.l').attr('title').split('/');
        let cv_a = $(this).find('div.info a').map(function () {
            return $(this).text().trim();
        }).get();
        return cast_a[0].trim() + ': ' + cv_a.join(' / ');
    }).get();
    

    //生成输出信息
    $('a[id^="Outto"]').click(function () {
        let style = $(this).attr('data-style');
        let descr = '';
        if (cover) {
            descr += STYLE[style].image.replace('{0}', cover) + STYLE[style].sectiondivision;
        }
        if (story) {
            descr += STYLE[style].fontstyle.replace('{0}', MENU[0]) + STYLE[style].linedivision +
                story + STYLE[style].sectiondivision;
        }
        if (raw_staff.length > 0) {
            descr += STYLE[style].fontstyle.replace('{0}', MENU[1]) + STYLE[style].linedivision +
                raw_staff.slice(0, STAFFNUMBER).join(STYLE[style].linedivision) + STYLE[style].sectiondivision;
        }
        if (raw_cast.length > 0) {
            descr += STYLE[style].fontstyle.replace('{0}', MENU[2]) + STYLE[style].linedivision +
                raw_cast.slice(0, CASTNUMBER).join(STYLE[style].linedivision) + STYLE[style].sectiondivision;
        }
        descr += '(来源于 ' + window.location.href + ' )' + STYLE[style].linedivision;
        $('#Out_text').val(descr).select();              // 向输出框填入合成的信息并自动全选
        GM_setClipboard(descr);                          // 向剪贴板输出合成的信息
    });

    $('#Outto' + OUTFORMAT).click();
});

/**
 * Created by Rhilip on 2016/12/21.
 * version:
 *   20161222 写出了第一个版本的，大体实现了原来想要的所有功能。
 *   20170105 发现没有开启点击遮罩层关闭窗口的功能，补上。其他没变~
 *   20170722 使用GM_setClipboard在输出时直接复制到剪贴板中。
 *   20180109 修正一个未启用的功能的typeerror。
 *   20180305 使用Bangumi自带的tb_init来生成浮动窗口
 */
