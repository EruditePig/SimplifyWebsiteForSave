// ==UserScript==
// @name            简化网站以存储
// @namespace       http://tampermonkey.net/
// @description     Test
// @version         0.2.5
// @author          EruditePig
// @include         *
// @exclude         file://*
// @require         http://code.jquery.com/jquery-1.11.0.min.js
// @grant           GM_registerMenuCommand
// ==/UserScript==]


(function() {
    'use strict';

function test() {
	// 再测试一次TamperMonkey更新的修改。
}

function test2() {
	// 再测试一次TamperMonkey更新的修改。
}
	
function csdn_blog(){
    $("body > div.container").siblings().remove();
    $("main:first").siblings().remove();
    $("div.blog-content-box").siblings().remove();
}

function jianshu(){
    $("body > div.note").siblings().remove();
    $("div.post:first").siblings().remove();
    $("div.article:first").siblings().remove();
}
function zhihu_daily(){
    var del = document.getElementsByClassName("global-header");
    del[0].parentElement.removeChild(del[0])
    del = document.getElementsByClassName("header-for-mobile");
    del[0].parentElement.removeChild(del[0])
    del = document.getElementsByClassName("bottom-wrap");
    del[0].parentElement.removeChild(del[0])
    del = document.getElementsByClassName("footer");
    del[0].parentElement.removeChild(del[0])
    del = document.getElementsByClassName("qr");
    del[0].parentElement.removeChild(del[0])
    del = document.getElementsByClassName("question");
    del[1].parentElement.removeChild(del[1])
}

function zhihu_zhuanlan(){
    remove_nodes(siblings(document.getElementById("root")));
    remove_nodes(siblings(document.getElementsByClassName("App-main")[0]));
    remove_nodes(siblings(document.getElementsByClassName("Post-Main Post-NormalMain")[0]));
    remove_nodes(document.getElementsByClassName("Recommendations-Main"));
    remove_nodes(document.getElementsByClassName("Comments-container"));
}
	
function bilibili() {
	$("body > div.page-container").siblings().remove();
	$("body").children().children(":not(.head-container,.article-holder)").remove();
}

function codeproject() {
	$("body > div.page-background").siblings().remove();
	$("div#A").siblings().remove();
	$("table.container-article-parts").siblings().remove();
	$("td.article-wing-left").remove();
	$("td.article-wing-right").remove();
	$("div#AT").children(":not(.article)").remove();
}

function ruanyifeng() {
    $("div#container").siblings().remove();
    $("div#content").siblings().remove();
    $("div#entry-1975").siblings().remove();
    $("div.hentry").siblings().remove();
    $("article.hentry").siblings().remove();
    $("div.entry-sponsor").remove();
}

	
function siblings(node){
    var ss = [].slice.call(node.parentNode.children).filter(function(v){return v!== node});
    return ss;
}
	
function remove_nodes(nodes){
    for (var i=0; i<nodes.length; i++) {
        nodes[i].parentElement.removeChild(nodes[i]);
    }
}
	
function simplify(){
    if(typeof(jQuery) == 'undefined'){
	    insertJQuery();
    }
    var dict = {};
    dict["^(?:http(s)?:\/\/)?blog\.csdn\.net\/.+"] = "csdn_blog";      // csdn blog
    dict["^(?:http(s)?:\/\/)?daily\.zhihu\.com\/.+"] = "zhihu_daily";      // zhihu_daily
    dict["^(?:http(s)?:\/\/)?zhuanlan\.zhihu\.com\/.+"] = "zhihu_zhuanlan";      // zhihu_zhuanlan
    dict["^(?:http(s)?:\/\/)?www\.jianshu\.com\/.+"] = "jianshu";      // jianshu
    dict["^(?:http(s)?:\/\/)?www\.bilibili\.com\/.+"] = "bilibili";      // bilibili
    dict["^(?:http(s)?:\/\/)?www\.codeproject\.com\/.+"] = "codeproject";      // codeproject
    dict["^(?:http(s)?:\/\/)?www\.ruanyifeng\.com\/.+"] = "ruanyifeng";      // ruanyifeng
    for(var key in dict) {
        var reg = new RegExp(key);
        if(reg.test(document.URL)){
            var value = dict[key];
            eval(value + '()');
            return;
        }
    }
    alert("没有匹配的简化代码");
}

function insertJQuery(){
    var jq = document.createElement('script');
    jq.src = "http://code.jquery.com/jquery-1.11.0.min.js";
    document.getElementsByTagName('head')[0].appendChild(jq);
    jQuery.noConflict();
}

GM_registerMenuCommand("simplify", simplify, "h");
GM_registerMenuCommand("insertJQuery", insertJQuery, "h");

})();
