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
;((require('sheetify/insert')("@import 'css-wipe';\n\n/* === === === ベースグループ === === === */\nbody {\n\tcolor: #222;\n\tfont-family: sans-serif;\n\tline-height: 1.5;\n}\n\na {\n\tcolor: #0069ff;\n}\n\nimg {\n\tmax-width: 100px;\n\tvertical-align: top;\n}\n\n/* === === === レイアウトグループ === === === */\n\n.ly_header {\n\tpadding-top: 20px;\n\tborder-bottom: 1px solid #ddd;\n}\n\n.ly_header_inner {\n\t/*\n\t * box-sizing: content-box: 初期値。パディングとボーダーを幅と高さに含めない\n\t * box-sizing: border-box: パディングとボーダーを幅と高さに含める。\n\t */\n\t/* css-wipe で box-sizing: border-box;が適用されているので、paddingを引いたwidthは1200px */\n\tmax-width: 1230px;\n\tpadding-right: 15px;\n\tpadding-left: 15px;\n\t/* width が決まっている場合、mergin-right, margin-left を auto にすると margin を等割して中央揃えにしてくれる */\n\tmargin-right: auto;\n\tmargin-left: auto;\n}\n\n.ly_footer {\n\tpadding-top: 20px;\n\tpadding-bottom: 20px;\n\tbackground-color: #222;\n}\n\n.ly_footer_inner {\n\tmax-width: 1230px;\n\tpadding-right: 15px;\n\tpadding-left: 15px;\n\tmargin-right: auto;\n\tmargin-left: auto;\n}\n\n.ly_cont {\n\tmax-width: 1230px;\n\tpadding: 60px 15px;\n\tmargin-right: auto;\n\tmargin-left: auto;\n}\n\n.ly_cont.ly_cont__col {\n\t/* 要素の表示種別を指定する: https://developer.mozilla.org/ja/docs/Web/CSS/display */\n\tdisplay: flex;\n\t/* フレックスコンテナ内のアイテムの間隔や配置を定義する: https://developer.mozilla.org/ja/docs/Web/CSS/justify-content */\n\tjustify-content: space-between; /* 各アイテムを均等に配置し、 最初のアイテムは先頭に寄せ、 最後のアイテムは末尾に寄せる */\n}\n\n.ly_cont_main {\n\t/**\n\t * flex-grow, flex-shrink, flex-basisをまとめて指定する: https://developer.mozilla.org/ja/docs/Web/CSS/flex\n\t * flex-grow: 子要素の伸びる比率。指定する数字が大きくなるとその分だけ伸長するようになる。0は伸長しない\n\t * flex-shrink: 子要素の縮む比率。指定する数字が大きくなるとその分だけ縮むようになる。0は縮まない\n\t * flex-basis: フレックスアイテムの初期の寸法を設定する。\n\t */\n\tflex: 1; /* 画面サイズに合わせて要素が伸長する */\n\tmargin-right: 3.25203%;\n}\n\n.ly_cont_side {\n\tflex: 0 0 260px; /* 画面サイズによらず要素幅は 260px */\n}\n\n@media screen and (max-width: 768px) {\n\t.ly_cont.ly_cont__col {\n\t\t/**\n\t\t * 子要素の並ぶ向きを指定する: https://developer.mozilla.org/ja/docs/Web/CSS/flex-direction\n\t\t * row: 左から右に並ぶ * row-reverse: 右から左に並ぶ * column: 上から下に並ぶ * column-reverse: 下から上に並ぶ\n\t\t */\n\t\tflex-direction: column; /* 上から下に並ぶ */\n\t}\n\t.ly_cont_main {\n\t\tmargin-right: 0;\n\t\tmargin-bottom: 60px;\n\t}\n}\n\n/* === === === モジュールグループ === === === */\n.el_btn {\n\t/**\n\t * ブロックレベル、インライン、テーブル、ルビ、フレックスコンテナなどの、要素の表示形式を指定する : http://www.htmq.com/style/display.shtml\n\t *                                                                              https://saruwakakun.com/html-css/basic/display#section4\n\t * inline: 初期値。インラインボックスを生成する。\n\t * block: ブロックボックスを生成する。\n\t * inline-block: インラインレベルのブロックコンテナを生成する。要素の並びはinline的(横並び)で、要素の中身はblock的な性質を持つ。\n\t */\n\tdisplay: inline-block; /* 要素の並びはinline的(横並び)で、要素の中身はblock的な性質を持つ。(親要素のtext-alignを継承してくれるため位置調整のcssが要らなくなる) */\n\twidth: 300px; /* 長いテキストが入る場合に改行されるように、横幅を指定する */\n\tmax-width: 100%; /* スクリーンサイズが小さくなったときにボタンが見切れないように、横幅を親ボックスの最大値に合わせる */\n\tpadding: 20px 10px; /* heightプロパティで指定すると長いテキストが来たときにボタンから溢れてしまう */\n\tbackground-color: #e25c00;\n\t/* border-width, border-style, border-color を一括設定する: https://developer.mozilla.org/ja/docs/Web/CSS/border */\n\tborder: 2px solid transparent; /* ホバーのときにボタンのサイズが変わらないように最初からボーダーを設定しておく。transparent = 透明 */\n\t/* 要素のフレームの周囲にシャドウ効果を追加する: https://developer.mozilla.org/ja/docs/Web/CSS/box-shadow */\n\t/* offset-x, offset-y, blur-radius, color */\n\tbox-shadow: 0 3px 6px rgba(0,0,0,.16); /* rgba(0,0,0,.16) は 16% の透明度の黒 */\n\tcolor: #fff;\n\tfont-size: 1.125rem; /* ルート要素の font-size を基準にしたサイズ。root 要素の font-size は 16px なので 1.125rem は 18px。ブラウザのフォントサイズ設定が反映される。 */\n\ttext-align: center;\n\t/* テキストの装飾的な線の表示を一括設定するプロパティ: https://developer.mozilla.org/ja/docs/Web/CSS/text-decoration\n\t * text-decoration-line: 使用する装飾の種類を指定(underlineやline-through)\n\t * text-decoration-color: 装飾の色\n\t * text-decoration-style: 装飾の種類(solid(実線), wavy(波線), dashed(取り消し線))\n\t * text-decoration-thickness: 装飾に使われる線の太さ\n\t*/\n\ttext-decoration: none; /* テキストの装飾を行わない */\n\t/**\n\t * :hoverなどの擬似クラスによる状態遷移の一括設定プロパティ: https://developer.mozilla.org/ja/docs/Web/CSS/transition\n\t * transition-property: トランジションを適用するcssプロパティの名前: https://developer.mozilla.org/ja/docs/Web/CSS/transition-property\n\t * transition-duration: トランジションにかかる所要時間(default=0s): https://developer.mozilla.org/ja/docs/Web/CSS/transition-duration\n\t * transition-timing-function: トランジション実行時の中間状態の遷移を指定する関数(default=ease): https://developer.mozilla.org/ja/docs/Web/CSS/transition-timing-function\n\t * transition-delay: トランジションが実行されるまでの待ち時間(defualt=0s): https://developer.mozilla.org/ja/docs/Web/CSS/transition-delay\n\t */\n\ttransition: all .25s; /* プロパティ名, 所要時間 */\n}\n\n.el_btn.el_btn__large {\n\twidth: 340px;\n\tpadding-top: 25px; /* 高さを増すためには .el_btn のスタイルと同様に height ではなく padding を使用する */\n\tpadding-bottom: 25px;\n\tfont-size: 1.375rem;\n}\n\n.el_btn.el_btn__arrowRight {\n\t/**\n\t * 要素の基準位置が相対か絶対かを指定する際に使用する。表示位置はtop, right, bottom, leftなどで指定する。: http://www.htmq.com/style/position.shtml\n\t * static: 初期値。top, right, bottom, left, z-index プロパティは効果がない\n\t * relative: 相対位置で要素の配置を指定する。\n\t *           staticを指定した場合に表示される位置が基準位置となる。\n\t *           top, right, bottom, left で相対位置を指定\n\t * absolute: 絶対位置で要素の配置を指定する。 要素のための空間が作成されない。\n\t *           親要素が position: static 以外なら、親要素の左上が基準位置として top, right, bottom, left で位置を指定\n\t *           親要素が position: static なら、ウィンドウ全体の左上が基準位置として top, right, bottom, left で位置を指定\n\t * fixed:  絶対位置で要素の配置を指定する。要素のための空間が作成されない。スクロールしても位置が固定されたままとなる。\n\t *         ビューポートの左上を基準位置として、top, right, bottom, left で位置を指定\n\t */\n\tposition: relative; /* after疑似要素で実装するアイコンにposition: absolute;を使用するため relativeを設定する */\n\tpadding-right: 2em; /* アイコンを設置する分、右側の余白を多めに設定する */\n\tpadding-left: 1.38em;\n}\n\n/**\n * 疑似要素: セレクタに負荷するキーワードで、選択された要素の特定の部分にスタイル付できるようにするもの: https://developer.mozilla.org/ja/docs/Web/CSS/Pseudo-elements\n * ::after : 選択した要素の最後の子要素として疑似要素を作成する。contentプロパティで作成した要素に内容を挿入できる。\n */\n.el_btn.el_btn__arrowRight::after {\n\tcontent: '\\f061';\n\t/* position: absolete, top: 50%, transform: translateY(-50%) は天地中央揃えの常套手段 */\n\tposition: absolute;\n\ttop: 50%;\n\t/* 要素を回転、拡大縮小、傾斜、移動させることができる */\n\ttransform: translateY(-50%); /* 要素サイズの50%上に寄せる */\n\tright: .83em;\n\tfont-family: 'Font Awesome 5 Free'; /* https://fontawesome.com/ で取得できる */\n\t/* Font Awesome の Solid スタイルを表示させるための指定。Font Awsome 5 からスタイルを font-weight でしていできるようになった */\n\tfont-weight: 900;\n}\n\n/**\n * 擬似クラス\n * forcus: tabで要素にフォーカスしたとき\n * hover: カーソルを要素の上に置いたとき\n */\n.el_btn:focus,\n.el_btn:hover {\n\tbackground-color: #fff;\n\tborder-color: currentColor;\n\tcolor: #e25c00;\n}\n\n\n/* === === === ヘルパーグループ === === === */\n\n.hp_btGray {\n\tborder-top: 1px solid #777 !important;\n}\n\n.hp_bgcBase {\n\tbackground-color: #efefef !important;\n}") || true) && "_d01b1612");

},{"sheetify/insert":2}]},{},[3]);
