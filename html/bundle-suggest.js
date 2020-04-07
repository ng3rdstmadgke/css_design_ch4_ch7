(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
var containers = []; // will store container HTMLElement references
var styleElements = []; // will store {prepend: HTMLElement, append: HTMLElement}

var usage = 'insert-css: You need to provide a CSS string. Usage: insertCss(cssString[, options]).';

function insertCss(css, options) {
    options = options || {};

    if (css === undefined) {
        throw new Error(usage);
    }

    var position = options.prepend === true ? 'prepend' : 'append';
    var container = options.container !== undefined ? options.container : document.querySelector('head');
    var containerId = containers.indexOf(container);

    // first time we see this container, create the necessary entries
    if (containerId === -1) {
        containerId = containers.push(container) - 1;
        styleElements[containerId] = {};
    }

    // try to get the correponding container + position styleElement, create it otherwise
    var styleElement;

    if (styleElements[containerId] !== undefined && styleElements[containerId][position] !== undefined) {
        styleElement = styleElements[containerId][position];
    } else {
        styleElement = styleElements[containerId][position] = createStyleElement();

        if (position === 'prepend') {
            container.insertBefore(styleElement, container.childNodes[0]);
        } else {
            container.appendChild(styleElement);
        }
    }

    // strip potential UTF-8 BOM if css was read from a file
    if (css.charCodeAt(0) === 0xFEFF) { css = css.substr(1, css.length); }

    // actually add the stylesheet
    if (styleElement.styleSheet) {
        styleElement.styleSheet.cssText += css
    } else {
        styleElement.textContent += css;
    }

    return styleElement;
};

function createStyleElement() {
    var styleElement = document.createElement('style');
    styleElement.setAttribute('type', 'text/css');
    return styleElement;
}

module.exports = insertCss;
module.exports.insertCss = insertCss;

},{}],2:[function(require,module,exports){
module.exports = require('insert-css')

},{"insert-css":1}],3:[function(require,module,exports){
const css = 0; // https://www.npmjs.com/package/sheetify
;((require('sheetify/insert')("* {\n  box-sizing: border-box;\n}\n/* webkit specific styles */\n\ninput[type=\"color\"]::-webkit-color-swatch {\n  border: none;\n}\n\ninput[type=\"color\"]::-webkit-color-swatch-wrapper {\n  padding: 0;\n}\n/*\nhtml5doctor.com Reset Stylesheet\nv1.6.1\nLast Updated: 2010-09-17\nAuthor: Richard Clark - http://richclarkdesign.com\nTwitter: @rich_clark\n*/\n\nhtml, body, div, span, object, iframe,\nh1, h2, h3, h4, h5, h6, p, blockquote, pre,\nabbr, address, cite, code,\ndel, dfn, em, img, ins, kbd, q, samp,\nsmall, strong, sub, sup, var,\nb, i,\ndl, dt, dd, ol, ul, li,\nfieldset, form, label, legend,\ntable, caption, tbody, tfoot, thead, tr, th, td,\narticle, aside, canvas, details, figcaption, figure,\nfooter, header, hgroup, menu, nav, section, summary,\ntime, mark, audio, video {\n    margin:0;\n    padding:0;\n    border:0;\n    outline:0;\n    font-size:100%;\n    vertical-align:baseline;\n    background:transparent;\n    font-weight:inherit;\n}\n\nbody {\n    line-height:1;\n}\n\narticle,aside,details,figcaption,figure,\nfooter,header,hgroup,menu,nav,section {\n    display:block;\n}\n\nnav ul {\n    list-style:none;\n}\n\nblockquote, q {\n    quotes:none;\n}\n\nblockquote:before, blockquote:after,\nq:before, q:after {\n    content:'';\n    content:none;\n}\n\na {\n    margin:0;\n    padding:0;\n    font-size:100%;\n    vertical-align:baseline;\n    background:transparent;\n}\n\n/* change colours to suit your needs */\nins {\n    background-color:#ff9;\n    color:#000;\n    text-decoration:none;\n}\n\n/* change colours to suit your needs */\nmark {\n    background-color:#ff9;\n    color:#000;\n    font-style:italic;\n    font-weight:bold;\n}\n\ndel {\n    text-decoration: line-through;\n}\n\nabbr[title], dfn[title] {\n    border-bottom:1px dotted;\n    cursor:help;\n}\n\ntable {\n    border-collapse:collapse;\n    border-spacing:0;\n}\n\n/* change border colour to suit your needs */\nhr {\n    display:block;\n    height:1px;\n    border:0;\n    border-top:1px solid #cccccc;\n    margin:1em 0;\n    padding:0;\n}\n\ninput, select {\n    vertical-align:middle;\n}\n\ninput:focus {\n  outline: none;\n}\nul, ol {\n  list-style-type: none;\n}") || true) && "_77eb8224"); // https://www.npmjs.com/package/css-wipe
;((require('sheetify/insert')("body {\n\tpadding: 50px;\n}\n\n/* === === === リセットスタイル === === === */\n.bl_suggestContainer a {\n\tfont-size: 14px;\n\tcolor: #545454;\n\ttext-decoration: none;\n}\n\n/* === === === モジュール === === === */\n\n/* --- --- --- コンテナ --- --- --- */\n.bl_suggestContainer {\n\tdisplay: flex;\n\tflex-direction: row; /* 商品詳細を下にしたい場合は column, 左にしたい場合は row-reverse */\n\twidth: 700px;\n\tfont-size: 14px;\n\t/*\n\twidth: 1400px;\n\tfont-size: 30px;\n\t*/\n\tcolor: #545454;\n\tline-height: 1;\n\tfont-family: sans-serif;\n\tbox-sizing: border-box;\n\tmargin-top: 1px;\n}\n.bl_suggestContainer_keyword {\n\twidth: 50%;\n\tmargin: 0 1px;\n}\n\n.bl_suggestContainer_item {\n\twidth: 50%;\n}\n\n@media screen and (max-width: 768px) {\n\t.bl_suggestContainer {\n\t\tflex-direction: column;\n\t\twidth: 100%; /* 本当は 100vw */\n\t}\n\t.bl_suggestContainer_keyword {\n\t\twidth: 100%;\n\t\tmargin: 0;\n\t}\n\t.bl_suggestContainer_item {\n\t\twidth: 100%;\n\t}\n}\n\n/* --- --- --- サジェスト --- ---- --- */\n.bl_suggest {\n\tborder: 1px solid #d4d9dc;\n}\n.bl_suggest_header {\n\tfont-size: 0.75em;\n\tpadding: .5em;\n\tbackground-color: #d4d9dc;\n\tfont-weight: bold;\n}\n.bl_suggest_body {\n\t/* height: calc(2em * 2); */\n\tpadding: 0 .3em;\n\toverflow-y: scroll;\n}\n.bl_suggest_item {\n\tdisplay: flex;\n\talign-items: center;\n\tjustify-content: space-between;\n\tborder-bottom: 1px solid #d4d9dc;\n\tpadding: .4em;\n\tcursor: pointer;\n}\n.bl_suggest_item:last-child {\n\tborder-bottom: 0;\n}\n.bl_suggest_item:focus,\n.bl_suggest_item:hover {\n\tbackground-color: #f5f5f5;\n}\n.bl_suggest_label {\n\tdisplay: block;\n\tflex-grow: 0;\n\tflex-shrink: 0;\n\tmargin-right: .5em;\n}\n.bl_suggest_keyword {\n\tdisplay: block;\n\tflex-grow: 1;\n\twhite-space: nowrap;\n\toverflow-x: auto;\n\tmargin-right: 1em;\n}\n\n@media screen and (max-width: 768px) {\n\t.bl_suggest {\n\t\tborder: 0;\n\t}\n\t.bl_suggest_header {\n\t\tdisplay: none;\n\t}\n\t.bl_suggest_body {\n\t\tdisplay: flex;\n\t\tjustify-content: flex-start;\n\t\tpadding: .5em;\n\t\tmargin-bottom: 1px;\n\t}\n\t.bl_suggest_item {\n\t\tpadding: .4em;\n\t\tborder-radius: .25em;\n\t\tmargin-right: .5em;\n\t\tborder: 1px solid transparent;\n\t\tbackground-color: #d4d9dc;\n\t}\n\t.bl_suggest_item:last-child {\n\t\tborder-bottom: 1px solid transparent;\n\t}\n\t.bl_suggest_item:focus,\n\t.bl_suggest_item:hover {\n\t\tbackground-color: #fff;\n\t\tborder-color: #d4d9dc;\n\t}\n\t.bl_suggest_label {\n\t\tdisplay: none;\n\t}\n\t.bl_suggest_keyword {\n\t\tmargin: 0;\n\t}\n\t.bl_suggest_body::-webkit-scrollbar{\n\t\twidth: 0;\n\t\theight: .3em;\n\t}\n\t.bl_suggest_body::-webkit-scrollbar-track{\n\t\tborder-radius: .5em;\n\t\tbox-shadow: inset 0 0 2px #d4d9dc;\n\t}\n\t.bl_suggest_body::-webkit-scrollbar-thumb{\n\t\tbackground: #d4d9dc;\n\t\tborder-radius: .5em;\n\t\tbox-shadow: none;\n\t}\n}\n\n/* --- --- --- 検索履歴 --- ---- --- */\n.bl_history {\n\tborder: 1px solid #d4d9dc;\n}\n.bl_history_header {\n\tfont-size: 0.75em;\n\tpadding: .5em;\n\tbackground-color: #d4d9dc;\n\tfont-weight: bold;\n}\n.bl_history_body {\n\t/* height: calc(2em * 2); */\n\tpadding: 0 .3em;\n\toverflow-y: scroll;\n}\n.bl_history_item {\n\tdisplay: flex;\n\talign-items: center;\n\tjustify-content: space-between;\n\tborder-bottom: 1px solid #d4d9dc;\n\tpadding: .4em;\n\tcursor: pointer;\n}\n.bl_history_item:last-child {\n\tborder-bottom: 0;\n}\n.bl_history_item:focus,\n.bl_history_item:hover {\n\tbackground-color: #f5f5f5;\n}\n.bl_history_label {\n\tdisplay: block;\n\tflex-grow: 0;\n\tflex-shrink: 0;\n\tmargin-right: .5em;\n}\n.bl_history_keyword {\n\tdisplay: block;\n\tflex-grow: 1;\n\twhite-space: nowrap;\n\toverflow-x: auto;\n\tmargin-right: 1em;\n}\n\n@media screen and (max-width: 768px) {\n\t.bl_history {\n\t\tdisplay: none;\n\t}\n}\n\n\n/* --- --- --- ランキング --- --- --- */\n.bl_rank {\n\tborder: 1px solid #d4d9dc;\n\tcounter-reset: bl_rank 0; /* 変数名と初期値を定義 */\n}\n.bl_rank_header {\n\tfont-size: 0.75em;\n\tpadding: .5em;\n\tbackground-color: #d4d9dc;\n\tfont-weight: bold;\n}\n.bl_rank_body {\n\t/* height: calc(2em * 3); */\n\tpadding: 0 .3em;\n\toverflow-y: scroll;\n}\n.bl_rank_item {\n\tdisplay: flex;\n\talign-items: center;\n\tjustify-content: space-between;\n\tborder-bottom: 1px solid #d4d9dc;\n\tpadding: .4em;\n\tcursor: pointer;\n\tcounter-increment: bl_rank; /* カウンタをインクリメント */\n}\n.bl_rank_item:last-child {\n\tborder-bottom: 0;\n}\n.bl_rank_item:focus,\n.bl_rank_item:hover {\n\tbackground-color: #f5f5f5;\n}\n.bl_rank_label {\n\tdisplay: block;\n\tflex-grow: 0;\n\tflex-shrink: 0;\n\tmargin-right: .5em;\n}\n.bl_rank_keyword {\n\tflex-grow: 1;\n\tdisplay: block;\n\twhite-space: nowrap;\n\toverflow-x: auto;\n\tmargin-right: 1em;\n}\n.bl_rankIcon {\n\tfont-weight: bold;\n\tcolor: #a9a9a9;\n}\n.bl_rankIcon::before {\n\tcontent: counter(bl_rank) '.';\n}\n\n@media screen and (max-width: 768px) {\n\t.bl_rank {\n\t\tdisplay: none;\n\t}\n}\n\n/* --- --- --- サジェスト商品詳細 --- --- --- */\n.bl_suggestItem {\n\tborder: 1px solid #d4d9dc;\n}\n.bl_suggestItem_header {\n\tfont-size: 0.75em;\n\tpadding: .5em;\n\tbackground-color: #d4d9dc;\n}\n.bl_suggestItem_header > span {\n\tmargin: 0 .3em;\n}\n.bl_suggestItem_body {\n\tpadding: .5em;\n}\n.bl_suggestItem_body {\n\tdisplay: flex;\n\tflex-wrap: nowrap;\n\toverflow-x: scroll;\n\tmargin-bottom: 1px;\n}\n.bl_suggestItem_item {\n\tdisplay: block;\n\tflex: 0 0 7em;\n\tmargin-right: .5em;\n\tbox-shadow: 1px 1px 2px rgba(0,0,0,.16);\n}\n.bl_suggestItem_body::-webkit-scrollbar{\n\twidth: 0;\n\theight: .3em;\n}\n.bl_suggestItem_body::-webkit-scrollbar-track{\n\tborder-radius: .5em;\n\tbox-shadow: inset 0 0 2px #d4d9dc;\n}\n.bl_suggestItem_body::-webkit-scrollbar-thumb{\n\tbackground: #d4d9dc;\n\tborder-radius: .5em;\n\tbox-shadow: none;\n}\n\n/* --- --- --- サジェスト商品詳細(メディア) --- --- --- */\n@media screen and (min-width: 768px) {\n\t.bl_suggestItem__media .bl_suggestItem_body {\n\t\tdisplay: block;\n\t\toverflow-y: scroll;\n\t\tmax-height: 400px;\n\t\tmargin: 0px;\n\t\tmargin-right: 1px;\n\t}\n\t.bl_suggestItem__media .bl_suggestItem_item {\n\t\tdisplay: flex;\n\t\theight: 6em;\n\t\tmargin: 0;\n\t\tmargin-bottom: .5em;\n\t}\n\t.bl_suggestItem__media .bl_suggestItem_item:last-child {\n\t\tmargin-bottom: 0;\n\t}\n\t.bl_suggestItem__media .bl_suggestItem_body::-webkit-scrollbar{\n\t\t\twidth: .3em;\n\t\t\theight: 0;\n\t}\n}\n\n/* --- --- --- メディア --- --- --- */\n@media screen and (min-width: 768px) {\n\t.bl_media {\n\t\tdisplay: flex;\n\t\theight: 6em;\n\t\tbox-shadow: 1px 1px 2px rgba(0,0,0,.16);\n\t}\n\t.bl_media_imgWrapper {\n\t\tposition: relative;\n\t\tflex: 0 1 35%;\n\t\toverflow-y: hidden;\n\t}\n\t.bl_media_imgWrapper > img {\n\t\tposition: absolute;\n\t\twidth: 100%;\n\t\ttop: 50%;\n\t\ttransform: translateY(-50%);\n\t}\n\t.bl_media_body {\n\t\tflex: 1;\n\t\tpadding: .5em;\n\t}\n\t.bl_media_ttl {\n\t\tmax-height: 3em;\n\t\toverflow-y: scroll;\n\t\tmargin-bottom: 1em;\n\t}\n\t.bl_media_price {\n\t\tfont-size: .8em;\n\t}\n}\n\n@media screen and (max-width: 768px) {\n\t.bl_media {\n\t\tdisplay: block;\n\t\tbox-shadow: 1px 1px 2px rgba(0,0,0,.16);\n\t}\n\t.bl_media_imgWrapper {\n\t\tposition: relative;\n\t\tpadding-top: 75%; /* widthに対しての割合 */\n\t\toverflow: hidden;\n\t}\n\t.bl_media_imgWrapper > img {\n\t\tposition: absolute;\n\t\twidth: 100%;\n\t\ttop: 50%;\n\t\ttransform: translateY(-50%);\n\t}\n\t.bl_media_body {\n\t\tpadding: .5em;\n\t}\n\t.bl_media_ttl {\n\t\tfont-size: .8em;\n\t\tmax-height: 3em;\n\t\toverflow-y: scroll;\n\t\tmargin-bottom: 1em;\n\t}\n\t.bl_media_price {\n\t\tfont-size: .6em;\n\t}\n}\n\n/* --- --- --- カード --- --- --- */\n.bl_card {\n\tdisplay: block;\n\tbox-shadow: 1px 1px 2px rgba(0,0,0,.16);\n}\n.bl_card_imgWrapper {\n\tposition: relative;\n\tpadding-top: 75%; /* widthに対しての割合 */\n\toverflow: hidden;\n}\n.bl_card_imgWrapper > img {\n\tposition: absolute;\n\twidth: 100%;\n\ttop: 50%;\n\ttransform: translateY(-50%);\n}\n.bl_card_body {\n\tpadding: .5em;\n}\n.bl_card_ttl {\n\tfont-size: .8em;\n\tmax-height: 3em;\n\toverflow-y: scroll;\n\tmargin-bottom: 1em;\n}\n.bl_card_price {\n\tfont-size: .6em;\n}\n\n/* === === === エレメント === === === */\n\n/* --- --- --- 太字 --- --- --- */\n.el_bold {\n\tdisplay: inline-block;\n\tfont-weight: bold;\n}\n\n/* -- --- --- hitnum --- --- --- */\n.el_hitnum {\n\tfont-size: .75em;\n\tcolor: #666;\n}\n\n/* --- --- --- ラベル --- --- --- */\n.el_label {\n\tdisplay: inline-block;\n\tpadding: .3em .7em;\n\tbackground-color: #d4d9dc;\n\tborder-radius: .3em;\n\tcolor: #666;\n\tfont-size: .75em;\n}\n\n/* --- --- --- 削除ボタン --- --- --- */\n.el_crossBtn {\n\tposition: relative;\n\tdisplay: inline-block;\n\tpadding: .7em;\n\tborder-radius: .7em;\n\tbackground-color: #d3d6dd;\n\tcolor: #666;\n\tcursor: pointer;\n\ttransition: .25s;\n}\n.el_crossBtn::before {\n\tcontent: '';\n\tposition: absolute;\n\ttop: 50%;\n\tleft: 50%;\n\tdisplay: block;\n\twidth: .8em;\n\theight: .1em;\n\tbackground-color: currentColor;\n\ttransform: translate(-50%, -50%) rotate(45deg);\n}\n.el_crossBtn::after {\n\tcontent: '';\n\tposition: absolute;\n\ttop: 50%;\n\tleft: 50%;\n\tdisplay: block;\n\twidth: .1em;\n\theight: .8em;\n\tbackground-color: currentColor;\n\ttransform: translate(-50%, -50%) rotate(45deg);\n}\n.el_crossBtn:focus,\n.el_crossBtn:hover {\n\tbackground-color: #ff4500;\n\tcolor: #fff;\n}\n\n/* --- --- --- 王冠マーク --- --- --- */\n.el_crownIcon {\n\tdisplay: inline-block;\n\tposition: relative;\n\tpadding: .5em;\n}\n.el_crownIcon::before {\n\tcontent: '';\n\tposition: absolute;\n\tleft: 50%;\n\tbottom: 10%;\n\twidth: 0;\n\theight: 0;\n\tborder-top: 0;\n\tborder-right: .5em solid transparent;\n\tborder-bottom: .9em solid #fb0;\n\tborder-left: .5em solid transparent;\n\ttransform: translateX(-50%);\n}\n.el_crownIcon::after {\n\tcontent: '';\n\tposition: absolute;\n\tleft: 50%;\n\tbottom: 10%;\n\twidth: 0;\n\theight: 0;\n\tborder-top: .3em solid transparent;\n\tborder-right: .5em solid #fb0;\n\tborder-bottom: .4em solid #f90;\n\tborder-left: .5em solid #fb0;\n\ttransform: translateX(-50%);\n}\n\n/* --- --- --- 王冠マーク(シルバー) --- --- --- */\n.el_crownIcon.el_crownIcon__silver::before {\n\tborder-bottom-color: #ccc;\n}\n.el_crownIcon.el_crownIcon__silver::after {\n\tborder-color: #ccc;\n\tborder-top-color: transparent;\n\tborder-bottom-color: #aaa;\n}\n\n/* --- --- --- 王冠マーク(ブロンズ) --- --- --- */\n.el_crownIcon.el_crownIcon__bronze::before {\n\tborder-bottom-color: #d98;\n}\n.el_crownIcon.el_crownIcon__bronze::after {\n\tborder-color: #d98;\n\tborder-top-color: transparent;\n\tborder-bottom-color: #c76;\n}") || true) && "_e1e9d414");
},{"sheetify/insert":2}]},{},[3]);
