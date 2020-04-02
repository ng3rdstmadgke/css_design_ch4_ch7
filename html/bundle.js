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
;((require('sheetify/insert')("/* === === === ベースグループ === === === */\nbody {\n\tcolor: #222;\n\tfont-family: sans-serif;\n\tline-height: 1.5;\n}\n\na {\n\tcolor: #0069ff;\n}\n\nimg {\n\t/* max-width: 100px; */\n\tvertical-align: top;\n}\n\n/* === === === レイアウトグループ === === === */\n\n.ly_header {\n\tpadding-top: 20px;\n\tborder-bottom: 1px solid #ddd;\n}\n\n/**\n * ■ box-sizing\n * box-sizing: content-box: 初期値。パディングとボーダーを幅と高さに含めない\n * box-sizing: border-box: パディングとボーダーを幅と高さに含める。\n */\n.ly_header_inner {\n\tmax-width: 1230px; /* css-wipe で box-sizing: border-box;が適用されているので、paddingを引いたwidthは1200px */\n\tpadding-right: 15px;\n\tpadding-left: 15px;\n\tmargin-right: auto; /* width が決まっている場合、mergin-right, margin-left を auto にすると margin を等割して中央揃えにしてくれる */\n\tmargin-left: auto;\n}\n\n.ly_footer {\n\tpadding-top: 20px;\n\tpadding-bottom: 20px;\n\tbackground-color: #222;\n}\n\n.ly_footer_inner {\n\tmax-width: 1230px;\n\tpadding-right: 15px;\n\tpadding-left: 15px;\n\tmargin-right: auto;\n\tmargin-left: auto;\n}\n\n.ly_cont {\n\tmax-width: 1230px;\n\tpadding: 60px 15px;\n\tmargin-right: auto;\n\tmargin-left: auto;\n}\n\n/**\n * ■ justify-content: https://developer.mozilla.org/ja/docs/Web/CSS/justify-content\n * フレックスコンテナ内のアイテムの水平方向の揃え\n * flex-start: 初期値。左揃え\n * flex-end: 右揃え\n * center: 中央揃え\n * space-between: アイテム同士の間隔が均等になるように揃える\n * space-around: アイテムの周りのスペースが均等になるように揃える\n *\n */\n.ly_cont.ly_cont__col {\n\tdisplay: flex;\n\tjustify-content: space-between; /* 各アイテムを均等に配置し、 最初のアイテムは先頭に寄せ、 最後のアイテムは末尾に寄せる */\n}\n\n/**\n * ■flex : https://developer.mozilla.org/ja/docs/Web/CSS/flex\n * flex-grow, flex-shrink, flex-basisをまとめて指定する\n * flex-grow: 子要素の伸びる比率。指定する数字が大きくなるとその分だけ伸長するようになる。0は伸長しない。(default=0)\n * flex-shrink: 子要素の縮む比率。指定する数字が大きくなるとその分だけ縮むようになる。0は縮まない。(default=1)\n * flex-basis: フレックスアイテムの初期の寸法を設定する。\n */\n.ly_cont_main {\n\tflex: 1; /* 画面サイズに合わせて要素が伸長する */\n\tmargin-right: 3.25203%;\n}\n\n.ly_cont_side {\n\tflex: 0 0 260px; /* 画面サイズによらず要素幅は 260px */\n}\n\n@media screen and (max-width: 768px) {\n\t/**\n\t * ■ flex-direction: https://developer.mozilla.org/ja/docs/Web/CSS/flex-direction\n\t * 子要素の並ぶ向きを指定する\n\t * row: 左から右に並ぶ\n\t * row-reverse: 右から左に並ぶ\n\t * column: 上から下に並ぶ\n\t * column-reverse: 下から上に並ぶ\n\t */\n\t.ly_cont.ly_cont__col {\n\t\tflex-direction: column; /* 上から下に並ぶ */\n\t}\n\t.ly_cont_main {\n\t\tmargin-right: 0;\n\t\tmargin-bottom: 60px;\n\t}\n}\n\n/* === === === モジュールグループ(エレメントモジュール) === === === */\n\n/* --- --- --- ボタン --- --- --- */\n/**\n * ■ display : http://www.htmq.com/style/display.shtml , https://saruwakakun.com/html-css/basic/display#section4\n * ブロックレベル、インライン、テーブル、ルビ、フレックスコンテナなどの、要素の表示形式を指定する\n * inline: 初期値。インラインボックスを生成する。\n * block: ブロックボックスを生成する。\n * inline-block: インラインレベルのブロックコンテナを生成する。要素の並びはinline的(横並び)で、要素の中身はblock的な性質を持つ。\n * flex: ブロックレベルのフレックスコンテナを生成する。 https://developer.mozilla.org/ja/docs/Web/CSS/CSS_Flexible_Box_Layout/Basic_Concepts_of_Flexbox\n * 要素の表示種別を指定する\n *\n * ■ border : https://developer.mozilla.org/ja/docs/Web/CSS/border\n * border-width, border-style, border-color を一括設定する\n *\n * ■ box-shadow : https://developer.mozilla.org/ja/docs/Web/CSS/box-shadow\n * 要素のフレームの周囲にシャドウ効果を追加する\n * offset-x, offset-y, blur-radius, color\n *\n * ■ text-decoration : https://developer.mozilla.org/ja/docs/Web/CSS/text-decoration\n * テキストの装飾的な線の表示を一括設定するプロパティ\n * text-decoration-line: 使用する装飾の種類を指定(underlineやline-through)\n * text-decoration-color: 装飾の色\n * text-decoration-style: 装飾の種類(solid(実線), wavy(波線), dashed(取り消し線))\n * text-decoration-thickness: 装飾に使われる線の太さ\n *\n * ■ transition : https://developer.mozilla.org/ja/docs/Web/CSS/transition\n * :hoverなどの擬似クラスによる状態遷移の一括設定プロパティ\n * transition-property: トランジションを適用するcssプロパティの名前: https://developer.mozilla.org/ja/docs/Web/CSS/transition-property\n * transition-duration: トランジションにかかる所要時間(default=0s): https://developer.mozilla.org/ja/docs/Web/CSS/transition-duration\n * transition-timing-function: トランジション実行時の中間状態の遷移を指定する関数(default=ease): https://developer.mozilla.org/ja/docs/Web/CSS/transition-timing-function\n * transition-delay: トランジションが実行されるまでの待ち時間(defualt=0s): https://developer.mozilla.org/ja/docs/Web/CSS/transition-delay\n *\n * ■ background-color\n * padding, border 領域まで background。 margin は background 領域ではない。\n */\n.el_btn {\n\tdisplay: inline-block; /* 要素の並びはinline的(横並び)で、要素の中身はblock的な性質を持つ。(親要素のtext-alignを継承してくれるため位置調整のcssが要らなくなる) */\n\twidth: 300px; /* 長いテキストが入る場合に改行されるように、横幅を指定する */\n\tmax-width: 100%; /* スクリーンサイズが小さくなったときにボタンが見切れないように、横幅を親ボックスの最大値に合わせる */\n\tpadding: 20px 10px; /* heightプロパティで指定すると長いテキストが来たときにボタンから溢れてしまう */\n\tbackground-color: #e25c00;\n\tborder: 2px solid transparent; /* ホバーのときにボタンのサイズが変わらないように最初からボーダーを設定しておく。transparent = 透明 */\n\tbox-shadow: 0 3px 6px rgba(0,0,0,.16); /* rgba(0,0,0,.16) は 16% の透明度の黒 */\n\tcolor: #fff;\n\tfont-size: 1.125rem; /* ルート要素の font-size を基準にしたサイズ。root 要素の font-size は 16px なので 1.125rem は 18px。ブラウザのフォントサイズ設定が反映される。 */\n\ttext-align: center;\n\ttext-decoration: none; /* テキストの装飾を行わない */\n\ttransition: all .25s; /* プロパティ名, 所要時間 */\n}\n\n/**\n * 擬似クラス\n * forcus: tabで要素にフォーカスしたとき\n * hover: カーソルを要素の上に置いたとき\n */\n.el_btn:focus,\n.el_btn:hover {\n\tbackground-color: #fff;\n\tborder-color: currentColor; /* colorプロパティに設定されている値を利用する */\n\tcolor: #e25c00;\n}\n\n/**\n * ■ position\n * 要素の基準位置が相対か絶対かを指定する際に使用する。表示位置はtop, right, bottom, leftなどで指定する。: http://www.htmq.com/style/position.shtml\n * static: 初期値。top, right, bottom, left, z-index プロパティは効果がない\n * relative: 相対位置で要素の配置を指定する。\n *           staticを指定した場合に表示される位置が基準位置となる。\n *           top, right, bottom, left で相対位置を指定\n * absolute: 絶対位置で要素の配置を指定する。 要素のための空間が作成されない。\n *           親要素が position: static 以外なら、親要素の左上が基準位置として top, right, bottom, left で位置を指定\n *           親要素が position: static なら、ウィンドウ全体の左上が基準位置として top, right, bottom, left で位置を指定\n * fixed:  絶対位置で要素の配置を指定する。要素のための空間が作成されない。スクロールしても位置が固定されたままとなる。\n *         ビューポートの左上を基準位置として、top, right, bottom, left で位置を指定\n */\n.el_btn.el_btn__arrowRight {\n\tposition: relative; /* after疑似要素で実装するアイコンにposition: absolute;を使用するため relativeを設定する */\n\tpadding-right: 2em; /* アイコンを設置する分、右側の余白を多めに設定する */\n\tpadding-left: 1.38em;\n}\n\n/**\n * ■ 疑似要素: https://developer.mozilla.org/ja/docs/Web/CSS/Pseudo-elements\n * セレクタに負荷するキーワードで、選択された要素の特定の部分にスタイル付できるようにするもの\n * ::after : 選択した要素の最後の子要素として疑似要素を作成する。contentプロパティで作成した要素に内容を挿入できる。\n *\n * ■ transform\n * 要素を回転、拡大縮小、傾斜、移動させることができる\n *\n * ■ 左右天地中央揃え(position: absolute; 適用時)\n * top: 50%; left: 50%; transform: translate(-50%, -50%);\n */\n.el_btn.el_btn__arrowRight::after {\n\tcontent: '\\f061';\n\tposition: absolute; /* position: absolete, top: 50%, transform: translateY(-50%) は天地中央揃えの常套手段 */\n\ttop: 50%;\n\ttransform: translateY(-50%); /* 要素サイズの50%上に寄せる */\n\tright: .83em;\n\tfont-family: 'Font Awesome 5 Free'; /* https://fontawesome.com/ で取得できる */\n\tfont-weight: 900; /* Font Awesome の Solid スタイルを表示させるための指定。Font Awsome 5 からスタイルを font-weight でしていできるようになった */\n}\n\n.el_btn.el_btn__large {\n\twidth: 340px;\n\tpadding-top: 25px; /* 高さを増すためには .el_btn のスタイルと同様に height ではなく padding を使用する */\n\tpadding-bottom: 25px;\n\tfont-size: 1.375rem;\n}\n\n\n.el_btn.el_btn__yellow {\n\tbackground-color: #f1de00;\n\tcolor: #222;\n}\n\n.el_btn.el_btn__yellow:focus,\n.el_btn.el_btn__yellow:hover {\n\tbackground-color: #fff;\n\tborder-color:  #f1de00;\n}\n\n.el_roundedBtn {\n\tdisplay: inline-block;\n\twidth: 236px;\n\tmax-width: 100%;\n\tpadding: 15px 10px;\n\tbackground-color: #e25c00;\n\tborder: 2px solid transparent;\n\tborder-bottom-color: #d40152;\n\tborder-radius: 10px;\n\tcolor: #fff;\n\tfont-size: 1.125rem;\n\ttext-align: center;\n\ttext-decoration: none;\n\ttransition: .25s;\n}\n\n.el_roundedBtn:focus,\n.el_roundedBtn:hover {\n\tbackground-color: #fff;\n\tborder-color: currentColor;\n\tcolor: #e25c00;\n}\n\n/* --- --- --- アイコン付き小ボタン --- --- --- */\n\n.el_beforeIconBtn {\n\t/* 使用されるコンテキストのフォントサイズに合わせたいため、フォントサイズは設定しない */\n\tposition: relative;\n\tdisplay: inline-block;\n\tpadding: .2em .3em; /* フォントサイズが可変のモジュールの余白はフォントサイズに由来する相対値で設定するのが定石 */\n\tborder: 1px solid currentColor;\n\tcolor: #e25c00;\n\ttext-decoration: none;\n\ttransition: .25s;\n}\n\n.el_beforeIconBtn:focus,\n.el_beforeIconBtn:hover {\n\tbackground-color: #e25c00;\n\tcolor: #fff;\n}\n\n.el_beforeIconBtn::before {\n\tmargin-right: .5em;\n\tfont-family: 'Font Awesome 5 Free';\n\tfont-weight: 900;\n}\n\n.el_beforeIconBtn.el_beforeIconBtn__download::before {\n\tcontent: '\\f019';\n}\n\n.el_beforeIconBtn.el_beforeIconBtn__zoom::before {\n\tcontent: '\\f00e';\n\ttransform: translateY(-6%); /* アイコンが若干下よりに見えてしまうので上に寄せる */\n}\n\n/* --- --- --- アイコン --- --- --- */\n\n/* span タグの ::before 疑似要素としてアイコンを生成しないと、 IE で アイコンにも a タグの下線が入ってしまう */\n.el_beforeIcon::before {\n\tdisplay: inline-block;\n\tmargin-right: .3em; /* フォントサイズが変わってもアイコンとテキストの間を適切に開けるためのスタイリング */\n\tcolor: #e25c00;\n\tfont-family: 'Font Awesome 5 Free';\n\tfont-weight: 400; /* Font Awesome のアイコンを表示させるための指定 */\n}\n\n.el_beforeIcon.el_beforeIcon__pdf::before {\n\tcontent: '\\f1c1';\n}\n\n.el_beforeIcon.el_beforeIcon__excel::before {\n\tcontent: '\\f1c3';\n}\n\n.el_beforeIcon.el_beforeIcon__PP::before {\n\tcontent: '\\f1c4';\n}\n\n.el_beforeIcon.el_beforeIcon__checkSquare::before {\n\tcontent: '\\f14a';\n}\n\n.el_beforeIcon.el_beforeIcon__chevLeft::before { /* 三角形の1辺gないような図形歯 chevron と呼ぶ */\n\tcontent: '';\n\twidth: .375em;\n\theight: .375em;\n\tborder-bottom: .125em solid #e25c00; /* 矢印のベースとなる図形を border-bottom, border-left で描画 */\n\tborder-left: .125em solid #e25c00;\n\ttransform: rotate(45deg) translateY(-30%); /* 45度時計回りに回転させて、30%上に移動する */\n}\n\n.el_afterIcon::after {\n\tdisplay: inline-block;\n\tmargin-left: .3em;\n\tcolor: #e25c00;\n\tfont-family: 'Font Awesome 5 Free';\n\tfont-weight: 900;\n}\n\n.el_afterIcon.el_afterIcon__chevRight::after {\n\tcontent: '';\n\twidth: .375em;\n\theight: .375em;\n\tborder-top: .125em solid #e25c00;\n\tborder-right: .125em solid #e25c00;\n\ttransform: rotate(45deg) translateY(-15%);\n}\n\n/* --- --- --- ラベル --- --- --- */\n\n.el_label {\n\tdisplay: inline-block;\n\tpadding: .2em .3em; /* ボタンと同様に高さや横幅の確保は height, width ではなく padding で行う */\n\tbackground-color: #e25c00;\n\tcolor: #fff;\n\tfont-size: .75rem;\n\tfont-weight: bold;\n\tborder: 2px solid transparent;\n}\n\n.el_label.el_label__yellow {\n\tbackground-color: #f1de00;\n\tcolor: #000;\n}\n\na.el_label { /* a タグに el_label が適用されたときのみ 動きをつける */\n\ttext-decoration: none;\n\ttransition: .25s;\n}\n\na.el_label:focus,\na.el_label:hover {\n\tbackground-color: #fff;\n\tborder-color: currentColor;\n\tcolor: #e25c00;\n}\n\n/**\n * ■ border-radius : http://www.htmq.com/css3/border-radius.shtml\n * ボックスの4つのコーナーの角丸をまとめて指定できる\n * border-radius: 100px 25px 50px 50px / 50px 25px 50px 25px\n *                水平方向(左上, 右上, 右下, 左下) / 垂直方向(左上, 右上, 右下, 左下)\n */\n.el_roundedLabel {\n\tdisplay: inline-block;\n\tpadding: .3em .9em; /* 楕円にしたとき詰まって見えてしまわないように少し広く余白を取る */\n\tbackground-color: #e25c00;\n\tborder-radius: 1em; /* 単位に em を使用すると、上下を潰さない形で楕円を実現することができる */\n\tcolor: #fff;\n\tfont-size: .75rem;\n\tfont-weight: bold;\n}\n\n.el_lv1Heading {\n\tpadding: 30px 10px;\n\tbackground-color: #e25c00;\n\tcolor: #fff;\n\tfont-size: 1.75rem;\n\ttext-align: center;\n}\n\n.el_lv1Heading > span {\n\tposition: relative;\n\tdisplay: inline-block;\n\ttransform: translateY(-20%); /* 下線があるのでテキストを微妙に上にずらす */\n}\n\n.el_lv1Heading > span::after { /* 下線部分は ::after 疑似要素 で作成する */\n\tcontent: '';\n\tposition: absolute;\n\tbottom: -10px;\n\tleft: 50%; /* left: 50%, transform: translateX(-50%) は左右中央揃えの定石 */\n\twidth: 80px;\n\theight: 1px;\n\tbackground-color: currentColor;\n\ttransform: translateX(-50%);\n}\n\n.el_lv2Heading {\n\tpadding-bottom: 10px;\n\tborder-bottom: 4px solid #e25c00;\n\tfont-size: 1.75rem;\n\tfont-weight: bold;\n\t/* レイアウトのスタイリングを含めるべきではないが、「必ず100px空ける」みたいにルールが統一されているならあり (ハーフリーディングは考慮しない)\n\t * margin-top: 100px;\n\t * margin-bottom: 20px;\n\t */\n}\n\n.el_lv3Heading {\n\tpadding-bottom: 6px;\n\tborder-bottom: 2px solid #e25c00;\n\tfont-size: 1.5rem;\n\tfont-weight: bold;\n}\n\n.el_lv4Heading {\n\tpadding-left: 6px;\n\tborder-left: 2px solid #e25c00;\n\tfont-size: 1.25rem;\n\tfont-weight: bold;\n}\n\n.el_lv5Heading {\n\tcolor: #e25c00;\n\tfont-size: 1.125rem;\n\tfont-weight: bold;\n}\n\n.el_lv6Heading {\n\tfont-size: 1.125rem;\n}\n\n.el_caution { /* hp_red だと、後で太字にしたくなったりしたときに整合性が取れなくなるので、クラス名には意味のある単語をつけるのがよい */\n\tcolor: #d40152;\n}\n\n.el_note {\n\tfont-size: .75rem;\n}\n\n/* === === === モジュールグループ(ブロックモジュール) === === === */\n\n/* --- --- --- メディア --- --- --- */\n\n/**\n * ■ align-items: https://developer.mozilla.org/ja/docs/Web/CSS/align-items\n * フレックスコンテナ内のアイテムの垂直方向の揃えを指定\n * stretch: 初期値。縦方向に伸ばせるだけ伸ばす。\n * flex-start: 上に寄せる\n * flex-end: 下に寄せる\n * center: 中央に寄せる\n */\n.bl_media {\n\tdisplay: flex; /* 画像とテキストを横並びにして天地中央揃えにしたい場合は display: flex; align-items: center */\n\talign-items: center; /* 上付きにしたい倍は flex-start, 下付きにしたい場合は flex-end */\n}\n\n.bl_media_imgWrapper {\n\tflex: 0 1 27.58333%; /* flex-grow: 0;  flex-shrink: 1; flex-basis: 27.58333%\n\t                      * スクリーンサイズを縮小したときに画像、テキスト両方を自然に縮小させるための指定 */\n\tmargin-right: 3.33333%; /* 画像の右のマージン40px(css-wipeのデフォルト?)を メイン幅の1200pxで割ったもの。\n\t                         * %で指定すると、スクリーンを縮小したときに画像と記事の間の余白も小さくなる */\n}\n\n.bl_media_imgWrapper > img {\n\twidth: 100%;\n}\n\n.bl_media_body {\n\tflex: 1; /* bl_media_imgWrapper の空白分だけ要素が伸長するようにする。flex-grow: 1 : アイテムが伸長する */\n}\n\n/**\n * ■ :last-child: https://developer.mozilla.org/ja/docs/Web/CSS/:last-child\n * 兄弟要素のグループの中で最後の要素を表す\n */\n.bl_media_body > *:last-child { /* 最後の要素の余白をリセット */\n\tmargin-bottom: 0; /* 最後の子要素の余白を詰めると、要素が一個になっても、天地中央揃えになる */\n}\n\n.bl_media_ttl {\n\tmargin-bottom: 10px;\n\tfont-size: 1.125rem;\n\tfont-weight: bold;\n}\n\n@media screen and (max-width: 768px) {\n\t.bl_media {\n\t\tdisplay: block; /* メディアクエリ適用時は画像が上、テキストが下の縦並びレイアウトになってほしい */\n\t}\n\n\t.bl_media_imgWrapper {\n\t\tmargin-right: 0;\n\t\tmargin-bottom: 20px;\n\t}\n}\n\n/* --- --- --- メディア(反転) --- --- --- */\n\n.bl_media.bl_media__rev {\n\tflex-direction: row-reverse; /* 横並びレイアウト。右から左 */\n}\n\n.bl_media__rev .bl_media_imgWrapper {\n\tmargin-right: 0; /* 余白のとり方は、 margin-right で統一したいため、画像のmargin-rightを0にして、テキストのmargin-rightをせっていする */\n}\n\n.bl_media__rev .bl_media_body {\n\tmargin-right: 3.33333%; /* 余白のとり方は、 margin-right で統一したいため、画像のmargin-rightを0にして、テキストのmargin-rightをせっていする */\n\ttext-align: right;\n}\n\n@media screen and (max-width: 768px) {\n\t.bl_media__rev .bl_media_body {\n\t\tmargin-right: 0; /* 要素が縦並びになったときに、テキストの不要なmargin-rightを取り除く */\n\t}\n}\n\n/* --- --- --- メディア(画像半分) --- --- --- */\n\n.bl_halfMedia {\n\tdisplay: flex;\n\talign-items: center;\n}\n\n.bl_halfMedia_imgWrapper {\n\tflex: 0 1 48.33333%; /* 余白分を計算して flex-basisを50%にしない */\n\tmargin-right: 3.33333%;\n}\n\n.bl_halfMedia_imgWrapper > img {\n\twidth: 100%;\n}\n\n.bl_halfMedia_body {\n\tflex: 1;\n}\n\n.bl_halfMedia_body > *:last-child {\n\tmargin-bottom: 0;\n}\n\n.bl_halfMedia_ttl {\n\tmargin-bottom: 10px;\n\tfont-size: 1.125rem;\n\tfont-weight: bold;\n}\n\n@media screen and (max-width: 768px) {\n\t.bl_halfMedia {\n\t\tdisplay: block;\n\t}\n\n\t.bl_halfMedia_imgWrapper {\n\t\tmargin-right: 0;\n\t\tmargin-bottom: 20px;\n\t}\n}\n\n/* --- --- --- カード --- --- --- */\n\n.bl_card {\n\tbox-shadow: 0 3px 6px rgba(0,0,0,.16);\n}\n\n.bl_card_imgWrapper {\n\tposition: relative;\n\tpadding-top: 56.25%; /* 子要素の画像の表示領域としての高さを確保するため。画像はposition: absoluteなのでheightだと高さを確保できない */\n\toverflow: hidden; /* はみ出た画像はトリミング */\n}\n\n.bl_card_imgWrapper > img { /* 親要素のpadding-top 領域に画像を天地中央で表示させるための指定 */\n\tposition: absolute;\n\ttop: 50%;\n\twidth: 100%; /* 親要素の横幅いっぱいまで広がる */\n\ttransform: translateY(-50%);\n}\n\n.bl_card_body {\n\tpadding: 15px;\n}\n\n.bl_card_body > *:last-child {\n\tmargin-bottom: 0;\n}\n\n.bl_card_ttl {\n\tmargin-bottom: 5px;\n\tfont-size: 1.125rem;\n\tfont-weight: bold;\n}\n\n.bl_card_txt {\n\tcolor: #777;\n}\n\n/* --- --- --- カード(バッジ付き) --- --- --- */\n.bl_card_badge {\n\tposition: relative;\n}\n\n.bl_card_badge::after { /* ::after疑似要素で三角形を描画 */\n\tcontent: ''; /* 高さも幅もない、点のような要素を作る */\n\tposition: absolute;\n\tz-index: 1;\n\ttop: 0;\n\tleft: 0;\n\twidth: 0;\n\theight: 0;\n\tborder-width: 3.75rem 3.75rem 0 0; /* 三角形を作るジェネレータが存在する: http://apps.eky.hk/css-triangle-generator/ */\n\tborder-style: solid;\n\tborder-color: #e25c00 transparent transparent transparent;\n}\n\n.bl_card_badge_txt {\n\tposition: absolute;\n\tz-index: 2;\n\ttop: .5rem;\n\tleft: .3125rem;\n\tcolor: #fff;\n\tfont-size: .875rem;\n\tfont-weight: bold;\n\ttransform: rotate(-45deg); /* バッジに合わせてテキストを回転 */\n}\n\n/* --- --- --- カード(リンク) --- --- --- */\na.bl_card {\n\tdisplay: block;\n\tcolor: currentColor;\n\ttext-decoration: none;\n\ttransition: .25s;\n}\n\na.bl_card .bl_card_ttl,\na.bl_card .bl_card_txt {\n\ttransition: .25s;\n}\n\n/**\n * ■ opacity\n * 要素の透明度を指定する\n */\na.bl_card:focus,\na.bl_card:hover {\n\topacity: .75;\n}\n\na.bl_card:focus .bl_card_ttl,\na.bl_card:focus .bl_card_txt,\na.bl_card:hover .bl_card_ttl,\na.bl_card:hover .bl_card_txt {\n\tcolor: #e25c00;\n\ttext-decoration: underline;\n}\n\n/* --- --- --- カードのカラム --- --- --- */\n/**\n * ■ flex-wrap: https://developer.mozilla.org/ja/docs/Web/CSS/flex-wrap\n * 要素の折返しを指定\n * nowrap: 初期値。折り返さない\n * wrap: 折り返す(上から下に並べる)\n * wrap-reverse: 折り返す(下から上に並べる)\n */\n.bl_cardUnit { /* モジュール自体にレイアウトの指定はしないで、レイアウト用のラッパーモジュールを作る */\n\tdisplay: flex;\n\tflex-wrap: wrap;\n}\n\n.bl_cardUnit.bl_cardUnit__col3 {\n\tmargin-bottom: -30px; /* 最終行の.bl_cardのmargin-bottomを相殺するためのコード */\n}\n\n.bl_cardUnit.bl_cardUnit__col4 {\n\tmargin-bottom: -20px;\n}\n\n.bl_cardUnit__col3 > .bl_card {\n\twidth: 31.707%;\n\tmargin-right: 2.43902%;\n\tmargin-bottom: 30px;\n}\n\n.bl_cardUnit__col4 > .bl_card {\n\twidth: 23.78%;\n\tmargin-right: 1.62602%;\n\tmargin-bottom: 20px;\n}\n\n/**\n * ■ :nth-child() : https://developer.mozilla.org/ja/docs/Web/CSS/:nth-child\n * 兄弟要素のグループの中から位置に基づいて、要素を選択する擬似クラス\n */\n.bl_cardUnit__col3 > .bl_card:nth-child(3n) { /* .bl_card要素の中で3つおきに選択 */\n\tmargin-right: 0; /* 3つめの要素のmargin-rightをなくす */\n}\n\n.bl_cardUnit__col4 > .bl_card:nth-child(4n) {\n\tmargin-right: 0;\n}\n\n@media screen and (max-width: 768px) {\n\t.bl_cardUnit.bl_cardUnit__col3 {\n\t\tmargin-bottom: -20px;\n\t}\n\t.bl_cardUnit > .bl_card { /* 3カラムだろうと4カラムだろうとメディアクエリ適用時は必ず1カラムにするため、モディファイヤをセレクタに含めない */\n\t\twidth: 100%;\n\t\tmargin-bottom: 20px;\n\t\tmargin-right: 0;\n\t}\n}\n\n/* --- --- --- 水平テーブル --- --- --- */\n\n.bl_horizTable {\n\tborder: 1px solid #ddd;\n}\n\n.bl_horizTable table {\n\twidth: 100%;\n}\n\n/**\n * ■ vertical-align : https://developer.mozilla.org/ja/docs/Web/CSS/vertical-align\n * インラインボックス、表セルボックスの垂直方向の配置を指定する。\n */\n.bl_horizTable th {\n\twidth: 20%;\n\tpadding: 15px;\n\tbackground-color: #efefef;\n\tborder-bottom: 1px solid #ddd;\n\tfont-weight: bold;\n\tvertical-align: middle;\n}\n\n.bl_horizTable td {\n\tpadding: 15px;\n\tborder-bottom: 1px solid #ddd;\n}\n\n.bl_horizTable tr:last-child th,\n.bl_horizTable tr:last-child td {\n\tborder-bottom-width: 0; /* .bl_horizTable の border とかぶらないように */\n}\n\n/* --- --- --- 水平テーブル(メディアクエリ時にスクロール) --- --- --- */\n\n/**\n * ■ overflow-x: http://www.htmq.com/css/overflow-x.shtml\n * ボックスの範囲に内容が収まらない場合にはみ出た左右の表示方法を指定する。\n */\n@media screen and (max-width: 768px) {\n\t.bl_horizTable.bl_horizTable__mdScroll {\n\t\tborder-right-width: 0; /* 右側の border を消してスクロールできることを示す */\n\t\toverflow-x: auto; /* ボックスに収まらない場合に同表示するかはユーザーエージェントに依存。スクロールバーなどが表示される */\n\t}\n\t/**\n\t * ■ white-space: https://developer.mozilla.org/ja/docs/Web/CSS/white-space\n\t * タブ、スペース、改行などの表示を指定する\n\t */\n\t.bl_horizTable.bl_horizTable__mdScroll th,\n\t.bl_horizTable.bl_horizTable__mdScroll td {\n\t\twhite-space: nowrap; /* 連続するホワイトスペースをまとめるが行の折り返しは行わない */\n\t}\n\t.bl_horizTable.bl_horizTable__mdScroll td {\n\t\tborder-right: 1px solid #ddd;\n\t}\n}\n\n/* --- --- --- テーブル(垂直) --- --- --- */\n\n.bl_vertTable {\n\tborder: 1px solid #ddd;\n}\n\n/**\n * ■ text-align: http://www.htmq.com/style/text-align.shtml\n * ブロックコンテナ内の行の揃え位置・均等割り付けを指定する。\n *\n * ■ table-layout: https://developer.mozilla.org/ja/docs/Web/CSS/table-layout\n * <table> のセル、行、列のレイアウトに使用されるアルゴリズムを設定する。\n * auto: 既定値。表とセルの幅は中身に合うように調整される。\n * fixed: 表と列の幅は table 要素 と col 要素の幅によって、または最初の行のセル幅によって設定される。後続するb業のセルは列幅の設定に影響しない。\n */\n.bl_vertTable table {\n\twidth: 100%;\n\ttext-align: center; /* インラインレベルのコンテンツは、ラインボックスの中央に配置される */\n\ttable-layout: fixed;\n}\n\n.bl_vertTable thead tr {\n\tbackground-color: #efefef;\n}\n\n.bl_vertTable th {\n\tpadding: 15px;\n\tborder-right: 1px solid #ddd;\n\tborder-bottom: 1px solid #ddd;\n\tfont-weight: bold;\n\tvertical-align: middle;\n}\n\n.bl_vertTable td {\n\tpadding: 15px;\n\tborder-right: 1px solid #ddd;\n\tborder-bottom: 1px solid #ddd;\n\tvertical-align: middle;\n}\n\n.bl_vertTable th:last-child,\n.bl_vertTable td:last-child {\n\tborder-right-width: 0; /* 最終列の border-right が .bl_vertTable の border 指定とかぶらないようにする */\n}\n\n.bl_vertTable tbody tr:last-child td {\n\tborder-bottom-width: 0; /* 最終行の border-bottom が .bl_vertTable の border 指定とかぶらないようにする */\n}\n\n@media screen and (max-width: 768px) {\n\t.bl_vertTable {\n\t\tborder-right-width: 0;\n\t\toverflow-x: auto;\n\t}\n\t.bl_vertTable table {\n\t\twidth: auto;\n\t\tmin-width: 100%;\n\t}\n\t.bl_vertTable th,\n\t.bl_vertTable td {\n\t\twhite-space: nowrap;\n\t}\n\t.bl_vertTable th:last-child,\n\t.bl_vertTable td:last-child {\n\t\tborder-right-width: 1px;\n\t}\n}\n\n/* --- --- --- 交差テーブル --- --- --- */\n.bl_crossTable {\n\tborder: 1px solid #ddd;\n}\n\n.bl_crossTable table {\n\twidth: 100%;\n\ttext-align: center;\n\ttable-layout: fixed;\n}\n\n.bl_crossTable th {\n\tpadding: 15px;\n\tbackground-color: #efefef;\n\tborder-right: 1px solid #ddd;\n\tborder-bottom: 1px solid #ddd;\n\tfont-weight: bold;\n\tvertical-align: middle;\n}\n\n.bl_crossTable td {\n\tpadding: 15px;\n\tborder-right: 1px solid #ddd;\n\tborder-bottom: 1px solid #ddd;\n\tvertical-align: middle;\n}\n\n.bl_crossTable th:last-child,\n.bl_crossTable th:last-child {\n\tborder-right-width: 0;\n}\n\n.bl_crossTable tbody tr:last-child th,\n.bl_crossTable tbody tr:last-child td {\n\tborder-bottom-width: 0;\n}\n\n@media screen and (max-width: 768px) {\n\t.bl_crossTable {\n\t\tborder-right-width: 0;\n\t\toverflow-x: auto;\n\t}\n\t.bl_crossTable table {\n\t\twidth: auto;\n\t\tmin-width: 100%;\n\t}\n\t.bl_crossTable th,\n\t.bl_crossTable td {\n\t\twhite-space: nowrap;\n\t}\n\t.bl_crossTable th:last-child,\n\t.bl_crossTable td:last-child {\n\t\tborder-right-width: 1px;\n\t}\n\t.bl_crossTable_mdSticky { /* メディアクエリ時に固定したい見出しに対するクラス指定 */\n\t\tposition: -webkit-sticky; /* 特定の位置に固定して表示する */\n\t\tposition: sticky; /* 特定の位置に固定して表示する */\n\t\tleft: 0; /* 左側の0のいちに配置 */\n\t}\n}\n\n/* --- --- --- ページャー --- --- --- */\n.bl_pager {\n\tdisplay: flex; /* 左右中央揃え */\n\toverflow-x: auto; /* ページャーがコンテンツ幅を超えた場合に水平スクロールにする */\n}\n.bl_pager_inner {\n\tdisplay: flex; /* ページャー項目を横並びにする */\n\tmargin-right: auto; /* 左右中央揃え */\n\tmargin-left: auto; /* 左右中央揃え */\n}\n.bl_pager_inner > *:last-child {\n\tmargin-right: 0;\n}\n.bl_pager_inner > li {\n\tmargin-right: 15px; /* ページャーのクリッカブルな範囲は少し狭いため、どのようなスクリーンサイズでも、一律15px空いてたほうがユーザビリティが高い */\n}\n.bl_pager_link {\n\tdisplay: flex; /* display: flex; align-items: center; justify-content: center は 子要素を左右天地中央揃えで配置する */\n\talign-items: center;\n\tjustify-content: center;\n\twidth: 40px;\n\theight: 40px;\n\tborder: 1px solid currentColor;\n\tcolor: #e25c00;\n\ttext-decoration: none;\n\ttransition: .25s;\n}\n.bl_pager_link:focus,\n.bl_pager_link:hover {\n\tbackground-color: #e25c00;\n\tcolor: #fff;\n\topacity: .75;\n}\n.bl_pager_link.is_active {\n\tbackground-color: #e25c00;\n\tcolor: #fff;\n\tpointer-events: none; /* hover, click, focus などのイベントの対象外にする */\n}\n\n/* --- --- --- タブナビゲーション --- --- --- */\n.bl_tabNav_inner {\n\tdisplay: flex; /* display: flex; align-items: center; justify-content: center は 子要素を左右天地中央揃えで配置する */\n\talign-items:center;\n\tjustify-content: center;\n\tflex-wrap: wrap; /* 子要素がコンテンツ幅をはみ出したときに折り返す */\n\tmargin-bottom: -10px; /* .bl_tabNav_link の margin-bottom を打ち消す */\n}\n.bl_tabNav_link {\n\tdisplay: inline-block;\n\tpadding-right: 30px;\n\tpadding-bottom: 10px;\n\tpadding-left: 30px;\n\tmargin-bottom: 10px; /* ナビゲーションが折り返した際に、1行目と2行目の間がつまりすぎないようにする */\n\tborder-bottom: 4px solid #efefef;\n\ttext-decoration: none;\n\ttransition: .25s;\n}\n.bl_tabNav_link:focus,\n.bl_tabNav_link:hover {\n\tborder-bottom-color: currentColor;\n\tcolor: #e25c00;\n\topacity: .75;\n}\n.bl_tabNav_link.is_active {\n\tborder-bottom-color: currentColor;\n\tcolor: #e25c00;\n\tpointer-events: none;\n}\n@media screen and (max-width: 768px) {\n\t.bl_tabNav {\n\t\toverflow-x: auto;\n\t}\n\n\t.bl_tabNav_inner {\n\t\tflex-wrap: nowrap; /* ナビゲーションがコンテンツ幅をはみ出したときに折り返さない */\n\t\tjustify-content: flex-start; /* アイテムを左寄せにする。これがないと左側の項目をクリックできなくなる */\n\t\tmargin-bottom: 0;\n\t\twhite-space: nowrap;\n\t}\n}\n\n/* --- --- --- CTA --- --- --- */\n.bl_cta {\n\tpadding: 30px;\n\tbackground-color: rgba(221, 116, 44, .05); /* 透明度 5% のオレンジ */\n\tborder: 1px solid #e25c00;\n\ttext-align: center;\n}\n\n.bl_cta > *:last-child {\n\tmargin-bottom: 0;\n}\n\n.bl_cta_ttl {\n\tpadding-bottom: 10px;\n\tmargin-top: -6px;\n\tmargin-bottom: 40px;\n\tborder-bottom: 1px solid currentColor;\n\tcolor: #e25c00;\n\tfont-size: 1.5rem;\n\tfont-weight: bold;\n}\n\n/* --- --- --- 料金表 --- --- --- */\n.bl_priceUnit { /* レイアウト用のラッパーモジュール */\n\tdisplay: flex;\n\talign-items: flex-start;\n\tjustify-content: center;\n}\n\n.bl_priceUnit .bl_price {\n\tflex: 1; /* flex-grow: 1; 各要素を均等幅で表示するための指定。*/\n\tmargin-right: 2.43902%;\n}\n\n.bl_priceUnit .bl_price:last-child {\n\tmargin-right: 0;\n}\n\n@media screen and (max-width: 768px) {\n\t.bl_priceUnit {\n\t\tdisplay: block;\n\t}\n\t.bl_priceUnit .bl_price {\n\t\tmargin-right: 0;\n\t\tmargin-bottom: 30px;\n\t}\n\t.bl_priceUnit .bl_price:last-child {\n\t\tmargin-bottom: 0;\n\t}\n}\n\n.bl_price {\n\tborder: 1px solid #ddd;\n}\n\n.bl_price_header {\n\tpadding: 10px;\n\tbackground-color: #e25c00;\n\tcolor: #fff;\n\ttext-align: center;\n}\n.bl_price_ttl {\n\tfont-size: 1.125rem;\n}\n.bl_price_price {\n\tfont-size: 1.875rem;\n}\n.bl_price_price span {\n\tfont-size: 1rem;\n}\n.bl_price_body {\n\tpadding: 15px;\n}\n.bl_price_body > *:last-child {\n\tmargin-bottom: 0;\n}\n.bl_price_lead {\n\tmargin-bottom: 20px;\n}\n.bl_price_features {\n\ttext-align: center;\n}\n.bl_price_features > *:last-child {\n\tmargin-bottom: 0;\n}\n.bl_price_features dt {\n\tpadding: 5px;\n\tmargin-bottom: 10px;\n\tbackground-color: #efefef;\n}\n.bl_price_features dd {\n\tmargin-bottom: 20px;\n}\n\n/* --- --- --- 料金表テーブル --- --- --- */\n.bl_priceTable table {\n\twidth: 100%;\n\ttable-layout: fixed;\n}\n.bl_priceTable_header {\n\tpadding: 10px;\n\tbackground-color: #e25c00;\n\tborder-right: 1px solid currentColor;\n\tcolor: #fff;\n\ttext-align: center;\n}\n.bl_priceTable_header:last-child {\n\tborder-right-width: 0;\n}\n.bl_priceTable_headerTtl {\n\tfont-size: 1.125rem;\n}\n.bl_priceTable_price {\n\tfont-size: 1.875rem;\n}\n.bl_priceTable_price span {\n\tfont-size: 1rem;\n}\n.bl_priceTable_bodyTtl {\n\tpadding: 10px;\n\tborder-top: 1px solid #ddd;\n\tborder-left: 1px solid #ddd;\n\tfont-weight: bold;\n\ttext-align: right;\n\tvertical-align: middle;\n}\n.bl_priceTable td {\n\tpadding: 10px;\n\tborder-top: 1px solid #ddd;\n\tborder-left: 1px solid #ddd;\n\ttext-align: center;\n\tvertical-align: middle;\n}\n.bl_priceTable td:last-child {\n\tborder-right: 1px solid #ddd;\n}\n.bl_priceTable tr:last-child > * {\n\tborder-bottom: 1px solid #ddd;\n}\n@media screen and (max-width: 768px) {\n\t.bl_priceTable {\n\t\toverflow-x: auto;\n\t}\n\t.bl_priceTable table {\n\t\twidth: auto;\n\t\twhite-space: nowrap;\n\t}\n\t.bl_priceTable_bodyTtl {\n\t\tposition: -webkit-sticky; /* .bl_priceTable_bodyTtl を左側に固定 */\n\t\tposition: sticky; /* .bl_priceTable_bodyTtl を左側に固定 */\n\t\tleft: 0; /* .bl_priceTable_bodyTtl を左側に固定 */\n\t\tbackground-color: #fff;\n\t\tbox-shadow: 1px 0 #ddd;\n\t\tfont-size: .875rem;\n\t}\n}\n\n/* --- --- --- Q&A --- --- --- */\n.bl_faq > *:last-child {\n\tmargin-bottom: 0;\n}\n.bl_faq_q,\n.bl_faq_a {\n\tposition: relative; /* アイコンをposition: absoluteで配置するための指定 */\n\tdisplay: flex;\n\talign-items: flex-start;\n\tbox-sizing: content-box;\n\tmin-height: 45px;\n\tpadding-left: 60px; /* アイコンを表示するための領域 */\n}\n.bl_faq_q {\n\tmargin-bottom: 15px;\n\tfont-size: 1.125rem;\n\tfont-weight: bold;\n}\n.bl_faq_q_txt {\n\tpadding-top: 12px;\n}\n.bl_faq_a {\n\tpadding-bottom: 20px;\n\tmargin-bottom: 20px;\n\tborder-bottom: 1px solid #ddd;\n}\n/**\n * ■ line-height: https://developer.mozilla.org/ja/docs/Web/CSS/line-height\n * 行の高さを指定する\n */\n.bl_faq_icon {\n\tposition: absolute;\n\ttop: 0;\n\tleft: 0;\n\twidth: 45px; /* 正方形を作る */\n\theight: 45px; /* 正方形を作る */\n\tborder-radius: 50%; /* 正円を作る */\n\tfont-weight: normal;\n\tline-height: 45px; /* height と同じ値にすることで天地中央揃えができる*/\n\ttext-align: center;\n}\n.bl_faq_q .bl_faq_icon {\n\tbackground-color: #e25c00;\n\tcolor: #fff;\n}\n.bl_faq_a .bl_faq_icon {\n\tbackground-color: #efefef;\n\tcolor: #e25c00;\n}\n.bl_faq_a_body { /* bl_faq_a_txt を複数用意したくなったときに、ラッパーとして必要なクラス。ないと親の display: flex の影響で bl_faq_a_txt が横並びになってしまう。 */\n\tpadding-top: 12px;\n}\n.bl_faq_a_body > *:last-child {\n\tmargin-bottom: 0;\n}\n.bl_faq_a_txt {\n\tmargin-bottom: 20px;\n}\n\n/* --- --- --- アコーディオン --- --- --- */\n.bl_accordion_body + dt {\n\tmargin-top: 20px; /* .bl_accordion_body は display: none になっており、margin値が算出されないため、直後のdt要素にmargin-topを設定する */\n}\n/**\n * ■ cursor: https://developer.mozilla.org/ja/docs/Web/CSS/cursor\n * マウスポインターが要素の上にいるときに表示されるカーソルの種類を設定する。\n */\n.bl_accordion_btn {\n\tposition: relative;\n\tdisplay: block; /* button要素は display: inline-block であるため、ブロック要素とするために指定する */\n\twidth: 100%; /* button要素は width: auto であるため、横幅を100&にするために指定する */\n\tpadding: 10px 40px 10px 15px;\n\tbackground-color: #e25c00;\n\tcolor: #fff;\n\tfont-size: 1.125rem;\n\ttext-align: left;\n\tcursor: pointer; /* クリッカブルな要素であることを明示するために cursorをpointerに設定する */\n\ttransition: .25s;\n}\n.bl_accordion_btn::before { /* プラス・マイナスアイコン両方の横棒を生成 */\n\tcontent: '';\n\tposition: absolute; /* position: absolute; top: 50%; right: 15px で右から15px、天地中央の位置に要素を配置 */\n\ttop: 50%;\n\tright: 15px;\n\tdisplay: block; /* display: block; width: 20px; height: 2px; background-color: currentColor で横棒を描画 */\n\twidth: 20px;\n\theight: 2px;\n\tbackground-color: currentColor;\n\ttransform: translateY(-50%);\n}\n.bl_accordion_btn::after { /* プラスアイコンの縦棒を生成 */\n\tcontent: '';\n\tposition: absolute; /* position: absolute; top: 50%; right: 24px; で右から24px、天地中央の位置に配置 */\n\ttop: 50%;\n\tright: 24px;\n\tdisplay: block; /* display: block; width: 2px; height: 20px; background-color: currentColor で横棒を描画 */\n\twidth: 2px;\n\theight: 20px;\n\tbackground-color: currentColor;\n\ttransform: translateY(-50%);\n}\n.bl_accordion_btn:focus,\n.bl_accordion_btn:hover {\n\tbackground-color: #fff;\n\tcolor: #e25c00;\n}\n.bl_accordion_btn.is_active::after {\n\tcontent: none; /* アコーディオンが開かれているときにプラスアイコンの縦棒を消す */\n}\n.bl_accordion_body {\n\tdisplay: none; /* アコーディオンが閉じられているときは .bl_accordion_body を表示しない */\n\tpadding:15px;\n\tborder: 1px solid #ddd;\n}\n.bl_accordion_body > *:last-child {\n\tmargin-bottom: 0;\n}\n.bl_accordion_body.is_active {\n\tdisplay: block;\n}\n.bl_accordion_txt {\n\tmargin-bottom: 20px;\n}\n\n/* --- --- --- ジャンボトロン --- --- --- */\n/**\n * ■ calc() : https://developer.mozilla.org/ja/docs/Web/CSS/calc\n * CSSのプロパティ値を指定する際に計算を行うことができる。\n *\n * ■ background-position: https://developer.mozilla.org/ja/docs/Web/CSS/background-position\n * 背景画像の初期値を設定する\n *\n * ■ background-size: https://developer.mozilla.org/ja/docs/Web/CSS/background-size\n * contain: 画像をトリミングせずに、縦横比を維持して、画像ができるだけ大きくなるように拡大・縮小する\n * cover: 縦横比を維持して、画像ができるだけ大きくなるように拡大・縮小する。空き領域が残らないように上下・左右どちらかをトリミングする\n */\n.bl_jumbotron {\n\theight: calc(69.44444vw + -233.33333px); /* スクリーンを縮小して 768pxのメディアクエリが適用されたときに、 高さがあまり変わらず、縦横比が維持されるような高さを指定する */\n\t                                         /* vwはビューポートと紐付いた単位で、1vwはビューポートの横幅の1%に一致する。 https://github.com/ixkaito/viewportscale で算出できる */\n\tbackground-position: center center; /* x座用 y座標 */\n\tbackground-size: cover;\n}\n.bl_jumbotron_inner {\n\tposition: relative;\n\theight: 100%;\n\tmax-width: 1230px; /* max-width: 1230px; margin-right: auto; margin-left: auto; はコンテンツの最大幅を設定して左右中央寄せにする */\n\tmargin-right: auto;\n\tmargin-left: auto;\n}\n.bl_jumbotron_ttl {\n\tposition: absolute;\n\ttop: 50%;\n\tleft: 0;\n\tpadding: 40px;\n\tbackground-color: rgba(0,0,0,.75);\n\tcolor: #fff;\n\tfont-size: calc(1.81818vw + 14.18182px); /* スクリーンを縮小して 768pxのメディアクエリが適用されたときに、 自然にフォントサイズを切り替えるための指定 */\n\ttransform: translateY(-50%);\n}\n@media screen and (min-width: 1200px) {\n\t.bl_jumbotron {\n\t\theight: 600px; /* 高さが大きくなり続けることを防ぐ */\n\t}\n\t.bl_jumbotron_ttl {\n\t\tfont-size: 2.25rem; /* フォントが大きくなり続けることを防ぐ */\n\t}\n}\n@media screen and (max-width: 768px) {\n\t.bl_jumbotron {\n\t\theight: 300px;\n\t}\n\t.bl_jumbotron_ttl {\n\t\tleft: 50%;\n\t\twidth: 90%;\n\t\tpadding: 15px;\n\t\tfont-size: 1.25rem;\n\t\ttext-align: center;\n\t\ttransform: translate(-50%, -50%);\n\t}\n}\n/* === === === ヘルパーグループ === === === */\n\n.hp_btGray {\n\tborder-top: 1px solid #777 !important;\n}\n\n.hp_bgcBase {\n\tbackground-color: #efefef !important;\n}\n\n.md_only { /* メディアクエリ適用時のみ可視化される */\n\tdisplay: none !important;\n}\n\n@media screen and (max-width: 768px) {\n\t.md_only {\n\t\tdisplay: block !important;\n\t}\n\t.lg_only {\n\t\tdisplay: none !important;\n\t}\n}") || true) && "_48748604");
;((require('sheetify/insert')("* {\n  box-sizing: border-box;\n}\n/* webkit specific styles */\n\ninput[type=\"color\"]::-webkit-color-swatch {\n  border: none;\n}\n\ninput[type=\"color\"]::-webkit-color-swatch-wrapper {\n  padding: 0;\n}\n/*\nhtml5doctor.com Reset Stylesheet\nv1.6.1\nLast Updated: 2010-09-17\nAuthor: Richard Clark - http://richclarkdesign.com\nTwitter: @rich_clark\n*/\n\nhtml, body, div, span, object, iframe,\nh1, h2, h3, h4, h5, h6, p, blockquote, pre,\nabbr, address, cite, code,\ndel, dfn, em, img, ins, kbd, q, samp,\nsmall, strong, sub, sup, var,\nb, i,\ndl, dt, dd, ol, ul, li,\nfieldset, form, label, legend,\ntable, caption, tbody, tfoot, thead, tr, th, td,\narticle, aside, canvas, details, figcaption, figure,\nfooter, header, hgroup, menu, nav, section, summary,\ntime, mark, audio, video {\n    margin:0;\n    padding:0;\n    border:0;\n    outline:0;\n    font-size:100%;\n    vertical-align:baseline;\n    background:transparent;\n    font-weight:inherit;\n}\n\nbody {\n    line-height:1;\n}\n\narticle,aside,details,figcaption,figure,\nfooter,header,hgroup,menu,nav,section {\n    display:block;\n}\n\nnav ul {\n    list-style:none;\n}\n\nblockquote, q {\n    quotes:none;\n}\n\nblockquote:before, blockquote:after,\nq:before, q:after {\n    content:'';\n    content:none;\n}\n\na {\n    margin:0;\n    padding:0;\n    font-size:100%;\n    vertical-align:baseline;\n    background:transparent;\n}\n\n/* change colours to suit your needs */\nins {\n    background-color:#ff9;\n    color:#000;\n    text-decoration:none;\n}\n\n/* change colours to suit your needs */\nmark {\n    background-color:#ff9;\n    color:#000;\n    font-style:italic;\n    font-weight:bold;\n}\n\ndel {\n    text-decoration: line-through;\n}\n\nabbr[title], dfn[title] {\n    border-bottom:1px dotted;\n    cursor:help;\n}\n\ntable {\n    border-collapse:collapse;\n    border-spacing:0;\n}\n\n/* change border colour to suit your needs */\nhr {\n    display:block;\n    height:1px;\n    border:0;\n    border-top:1px solid #cccccc;\n    margin:1em 0;\n    padding:0;\n}\n\ninput, select {\n    vertical-align:middle;\n}\n\ninput:focus {\n  outline: none;\n}\nul, ol {\n  list-style-type: none;\n}") || true) && "_77eb8224"); // https://www.npmjs.com/package/css-wipe
},{"sheetify/insert":2}]},{},[3]);
