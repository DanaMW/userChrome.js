// ==UserScript==
// @name           zzzz-MultiRowTab_LiteforFx48.uc.js
// @namespace      http://space.geocities.yahoo.co.jp/gl/alice0775
// @description    多段タブもどき実験版 CSS入れ替えまくりLiteバージョン
// @include        main
// @compatibility  Firefox 65
// @author         Alice0775
// @version        2016/08/05 00:00 Firefox 48
// @version        2016/05/01 00:01 hide favicon if busy
// @version        2016/03/09 00:01 Bug 1222490 - Actually remove panorama for Fx45+
// @version        2016/02/09 00:01 workaround css for lwt
// @version        2016/02/09 00:00
// ==/UserScript==
"user strict";
MultiRowTabLiteforFx();
function MultiRowTabLiteforFx() {
    var css =`
    /* 多段タブ */
    tabs>arrowscrollbox,tabs>arrowscrollbox>scrollbox{display:block;}
    tabs scrollbox>box {
        display:flex;flex-wrap:wrap;
    }
    tabs tab:not([pinned]){flex-grow:1;}
    tabs:not(stack) tab,tab>.tab-stack>.tab-background {
        height: var(--tab-min-height);
        z-index: 1 !important;
    }
    tab>.tab-stack{width:100%;}
    box>.tabs-newtab-button {
        height: calc(var(--tab-min-height) + -1px);
        width: var(--tab-min-height);
    }
    .titlebar-buttonbox-container>.titlebar-buttonbox{display:block;}
    .titlebar-buttonbox>.titlebar-button {
        padding: 10px 17px !important;
    }
    /* -- 非表示 -- */
    hbox.titlebar-spacer[type$="-tabs"],#alltabs-button,tabs [anonid^="scrollbutton"],tabs spacer{display:none;}
    /* 000-addToolbarInsideLocationBar.uc.js アイコン */
    #ucjs-Locationbar-toolbar .toolbarbutton-1 .toolbarbutton-icon {
        width: 24px !important;
        height: 24px !important;
        padding: 4px !important;
    }
    #ucjs-Locationbar-toolbar toolbarbutton#downloads-button .toolbarbutton-icon,
    #ucjs-Locationbar-toolbar .webextension-browser-action .toolbarbutton-badge-stack {
        width: 24px !important;
        height: 24px !important;
        padding: 0 !important;
    }
    #ucjs-Locationbar-toolbar toolbarbutton:hover {
        background-color: hsla(0,0%,70%,.3) !important;
    } `;
    var sss = Cc['@mozilla.org/content/style-sheet-service;1'].getService(Ci.nsIStyleSheetService);
    var uri = makeURI('data:text/css;charset=UTF=8,' + encodeURIComponent(css));
    sss.loadAndRegisterSheet(uri, sss.AGENT_SHEET);
    var style = ' \
    tabs tab:not(stack) { \
        border-left: solid 1px hsla(0,0%,50%,.5) !important; \
        border-right: solid 1px hsla(0,0%,50%,.5) !important; \
    } \
    tabs tab:after,tabs tab:before{display:none!important;} \
    ';
    var sspi = document.createProcessingInstruction('xml-stylesheet',
    'type="text/css" href="data:text/css,' + encodeURIComponent(style) + '"');
    document.insertBefore(sspi, document.documentElement);
    gBrowser.tabContainer._animateTabMove = function(event){}
    gBrowser.tabContainer._finishAnimateTabMove = function(event){}
    gBrowser.tabContainer.lastVisibleTab = function() {
        var tabs = this.childNodes;
        for (let i = tabs.length - 1; i >= 0; i--){
            if (!tabs[i].hasAttribute("hidden"))
                return i;
        }
        return -1;
    };
    gBrowser.tabContainer.clearDropIndicator = function() {
        var tabs = this.childNodes;
        for (let i = 0, len = tabs.length; i < len; i++){
            let tab_s= tabs[i].style;
            tab_s.removeProperty("border-left-color");
            tab_s.removeProperty("border-right-color");
        }
    };
    gBrowser.tabContainer.addEventListener("dragleave",gBrowser.tabContainer.clearDropIndicator, false);
    gBrowser.tabContainer._onDragOver = function(event) {
        event.preventDefault();
        event.stopPropagation();
        this.clearDropIndicator();
        var newIndex = this._getDropIndex(event);
        if (newIndex == null)
            return;
        if (newIndex < this.childNodes.length) {
            this.childNodes[newIndex].style.setProperty("border-left-color","red","important");
        } else {
            newIndex = gBrowser.tabContainer.lastVisibleTab();
            if (newIndex >= 0)
                this.childNodes[newIndex].style.setProperty("border-right-color","red","important");
        }
    };
    gBrowser.tabContainer.addEventListener("dragover", gBrowser.tabContainer._onDragOver, false);
    gBrowser.tabContainer._getDropIndex = function(event, isLink) {
        var tabs = this.children;
        var tab = this._getDragTargetTab(event, isLink);
        if (window.getComputedStyle(this).direction == "ltr") {
            for (let i = tab ? tab._tPos : 0; i < tabs.length; i++)
                if (event.screenX < tabs[i].boxObject.screenX + tabs[i].boxObject.width / 2
                 && event.screenY < tabs[i].boxObject.screenY + tabs[i].boxObject.height) // multirow fix
                
                    return i;
        } else {
            for (let i = tab ? tab._tPos : 0; i < tabs.length; i++)
                if (event.screenX > tabs[i].boxObject.screenX + tabs[i].boxObject.width / 2
                 && event.screenY < tabs[i].boxObject.screenY + tabs[i].boxObject.height) // multirow fix
                    return i;
        }
        return tabs.length;
    };
    gBrowser.tabContainer.onDrop = function(event) {
        var newIndex;
        this.clearDropIndicator();
        var dt = event.dataTransfer;
        var draggedTab;
        if (dt.mozTypesAt(0)[0] == TAB_DROP_TYPE) {
            draggedTab = dt.mozGetDataAt(TAB_DROP_TYPE, 0);
            if (!draggedTab)
                return;
        }
        this._tabDropIndicator.collapsed = true;
        event.stopPropagation();
        if (draggedTab && draggedTab.parentNode == this) {
            newIndex = this._getDropIndex(event, false);
            if (newIndex > draggedTab._tPos)
                newIndex--;
            gBrowser.moveTabTo(draggedTab, newIndex);
        }
        if (draggedTab) {
            delete draggedTab._dragData;
        }
    };
    gBrowser.tabContainer.addEventListener("drop",gBrowser.tabContainer.onDrop, false);
}
