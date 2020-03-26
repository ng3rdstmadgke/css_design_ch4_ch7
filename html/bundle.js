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
const css = 0;
;((require('sheetify/insert')("@import 'css-wipe';\n\n/* === === === ベースグループ === === === */\nbody {\n\tcolor: #222;\n\tfont-family: sans-serif;\n\tline-height: 1.5;\n}\n\na {\n\tcolor: #0069ff;\n}\n\nimg {\n\tmax-width: 100px;\n\tvertical-align: top;\n}\n\n/* === === === レイアウトグループ === === === */\n\n.ly_header {\n\tpadding-top: 20px;\n\tborder-bottom: 1px solid #ddd;\n}\n\n.ly_header_inner {\n\t/* css-wipe で box-sizing: border-box;が適用されているので、paddingを引いたwidthは1200px */\n\tmax-width: 1230px;\n\tpadding-right: 15px;\n\tpadding-left: 15px;\n\t/* width が決まっている場合、mergin-right, margin-left を auto にすると margin を等割して中央揃えにしてくれる */\n\tmargin-right: auto;\n\tmargin-left: auto;\n}\n\n.ly_footer {\n\tpadding-top: 20px;\n\tpadding-bottom: 20px;\n\tbackground-color: #222;\n}\n\n.ly_footer_inner {\n\tmax-width: 1230px;\n\tpadding-right: 15px;\n\tpadding-left: 15px;\n\tmargin-right: auto;\n\tmargin-left: auto;\n}\n\n.ly_cont {\n\tmax-width: 1230px;\n\tpadding: 60px 15px;\n\tmargin-right: auto;\n\tmargin-left: auto;\n}\n\n.ly_cont.ly_cont__col {\n\t/* 要素の表示種別を指定する: https://developer.mozilla.org/ja/docs/Web/CSS/display */\n\tdisplay: flex;\n\t/* フレックスコンテナ内のアイテムの間隔や配置を定義する: https://developer.mozilla.org/ja/docs/Web/CSS/justify-content */\n\tjustify-content: space-between; /* 各アイテムを均等に配置し、 最初のアイテムは先頭に寄せ、 最後のアイテムは末尾に寄せる */\n}\n\n.ly_cont_main {\n\t/**\n\t * flex-grow, flex-shrink, flex-basisをまとめて指定する: https://developer.mozilla.org/ja/docs/Web/CSS/flex\n\t * flex-grow: 子要素の伸びる比率。指定する数字が大きくなるとその分だけ伸長するようになる。0は伸長しない\n\t * flex-shrink: 子要素の縮む比率。指定する数字が大きくなるとその分だけ縮むようになる。0は縮まない\n\t * flex-basis: フレックスアイテムの初期の寸法を設定する。\n\t */\n\tflex: 1; /* 画面サイズに合わせて要素が伸長する */\n\tmargin-right: 3.25203%;\n}\n\n.ly_cont_side {\n\tflex: 0 0 260px; /* 画面サイズによらず要素幅は 260px */\n}\n\n@media screen and (max-width: 768px) {\n\t.ly_cont.ly_cont__col {\n\t\t/**\n\t\t * 子要素の並ぶ向きを指定する: https://developer.mozilla.org/ja/docs/Web/CSS/flex-direction\n\t\t * row: 左から右に並ぶ * row-reverse: 右から左に並ぶ * column: 上から下に並ぶ * column-reverse: 下から上に並ぶ\n\t\t */\n\t\tflex-direction: column; /* 上から下に並ぶ */\n\t}\n\t.ly_cont_main {\n\t\tmargin-right: 0;\n\t\tmargin-bottom: 60px;\n\t}\n}\n\n\n/* === === === ヘルパーグループ === === === */\n\n.hp_btGray {\n\tborder-top: 1px solid #777 !important;\n}\n\n.hp_bgcBase {\n\tbackground-color: #efefef !important;\n}") || true) && "_acd175ff");

},{"sheetify/insert":2}]},{},[3]);
