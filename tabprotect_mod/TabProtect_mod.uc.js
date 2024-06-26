// ==UserScript==
// @name           tabProtect_mod2.uc.js
// @namespace      http://space.geocities.yahoo.co.jp/gl/alice0775
// @description    tabProtect
// @include        main
// @exclude        about:*
// @author         Alice0775
// @Note           Tab-Ablösung wird nicht unterstützt
// @Note           Wenn Sie über die Taskleiste in den privaten Browsermodus wechseln, sind der 
// @Note           Tab-Status und das Speichern der Tab-Sitzung nach der Rückkehr seltsam
// @compatibility  72
// @version        2019/11/14 00:00 Fix 72+ Bug 1591145 Remove Document.GetAnonymousElementByAttribute
// @version        2019/05/29 16:00 Bug 1519514 - Convert tab bindings
// @version        2019/05/21 08:30 fix 69.0a1 Bug 1551320 - Replace all createElement calls in XUL documents with createXULElement
// @version        2018/09/27 10:30 fix  tab detach
// @version        2018/09/26 07:30 support tab detach
// @version        2018/09/25 21:30 working with tab multi selection
// @version        2018/06/21 19:50 workaround regression
// @version        2018/06/21 19:40 fix restore session if *.restore_on_demand is enabled
// @version        2018/06/10 00:00 workaround restore session
// @version        2018/05/23 00:00 Fixed typo(status is undeled when unprotect)
// @version        2018/05/12 15:30 workaround restore session for all window
// @version        2018/05/06 14:00 workaround for tab move
// @version        2018/05/04 12:00 cleanup for 60
// @version        2018/05/04 23:00 for 60
// ==/UserScript==

var tabProtect = {
  debug: function(aMsg){
          Cc["@mozilla.org/consoleservice;1"]
            .getService(Ci.nsIConsoleService)
            .logStringMessage(aMsg.toString());
  },

  sessionStore: {
    get ss() {
      try { 
        return Components.classes["@mozilla.org/browser/sessionstore;1"].
                               getService(Components.interfaces.nsISessionStore)
      } catch(e) {
        return;
      }
    },

    getTabValue : function(aTab, aKey) {
      if (typeof SessionStore.getCustomTabValue == "function")
        return SessionStore.getCustomTabValue(aTab, aKey);
      else
        return this.ss.getTabValue(aTab, aKey);
    },

    setTabValue : function(aTab, aKey, aValue) {
      if (typeof SessionStore.setCustomTabValue == "function")
        return SessionStore.setCustomTabValue(aTab, aKey, aValue);
      else
        return this.ss.setTabValue(aTab, aKey, aValue);

    },
    deleteTabValue : function(aTab, aKey) {
      if (typeof SessionStore.deleteCustomTabValue == "function")
        return SessionStore.deleteCustomTabValue(aTab, aKey);
      else
        return this.ss.deleteTabValue(aTab, aKey);
    }
  },

  get tabContext() {
    return document.getElementById("tabContextMenu");
  },

  init: function(){
    console.log("init");
    this.tabContextMenu();

    //tabbrowser.xml ersetzen
    gBrowser.removeTab_org = gBrowser.removeTab;
    gBrowser.removeTab = function(aTab, aParams) {
      if (aTab.localName != "tab")
        aTab = this.selectedTab;
      if (aTab.hasAttribute("tabProtect"))
        return;
      gBrowser.removeTab_org(aTab, aParams);
    }

    gBrowser.isProtectTab = function (aTab){
      return aTab.hasAttribute("tabProtect");
    }

    gBrowser.protectTab = function (aTab, state) {
      let isProtected;
      if (typeof state == "undefined") {
        if ( aTab.hasAttribute("tabProtect") ){
          state = false;
        } else {
          state = true;
        }
      }
      if (state) {
        aTab.setAttribute("tabProtect", "true");
        tabProtect.sessionStore.setTabValue(aTab, "tabProtect", "true");
        isProtected = true;
      } else {
        aTab.removeAttribute("tabProtect");
        try {
          tabProtect.sessionStore.deleteTabValue(aTab, "tabProtect");
        } catch(e) {}
        isProtected = false;
      }
      this.protectTabIcon(aTab);
      return isProtected;
    }

    gBrowser.protectTabIcon = function (aTab){
      const kXULNS =
               "http://www.mozilla.org/keymaster/gatekeeper/there.is.only.xul";
														  
      var image = aTab.querySelector(".tab-icon-protect");
      if ( aTab.hasAttribute("tabProtect") ) {
        if(!image){
          var stack = aTab.querySelector(".tab-stack");
          var image = document.createElementNS(kXULNS,'image');
          image.setAttribute('class','tab-icon-protect');
          image.setAttribute('left',0);
          image.setAttribute('top',0);
          if(stack) stack.appendChild(image);
        }
      }
    }

    // CSS Übernehmen
      var style = `
      tab[tabProtect] .tab-close-button {
        display: none;
      }
      tab[tabProtect] .tab-icon-protect{
        margin-top: 0px; /*要調整*/
        margin-left: 0px; /*要調整*/
        list-style-image:url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAQUlEQVQ4jWNgGAXDADASUvDvOsN/fPJMlLqAhRhFTJqo/H/XKXQBsoFEuQDDVnIMQPcGXJxYA3C5hiwvUOwCZAAAlRcK7m+YgB4AAAAASUVORK5CYII=');
        width: 16px;
        height: 16px;
      }
      tab:not([tabProtect]) .tab-icon-protect {
        display: none;
      }

      `;
    var sspi = document.createProcessingInstruction(
      'xml-stylesheet',
      'type="text/css" href="data:text/css,' + encodeURIComponent(style) + '"'
    );
    document.insertBefore(sspi, document.documentElement);
    sspi.getAttribute = function(name) {
    return document.documentElement.getAttribute(name);
    };

    this.restoreAll(0);
    gBrowser.tabContainer.addEventListener('TabMove', this, false);
    gBrowser.tabContainer.addEventListener('SSTabRestoring', this, false);
    window.addEventListener('unload', this, false)

    // detach tab
    let func =  gBrowser.swapBrowsersAndCloseOther.toString();
    if (gBrowser && !/copytabProtect/.test(func)) {
      func = func.replace(
        'let otherFindBar = aOtherTab._findBar;',
        `if (aOtherTab.hasAttribute("tabProtect")) {
           aOurTab.ownerGlobal.gBrowser.protectTab(aOurTab, true);
           /*copytabProtect*/
         }
         $&`
       );
      eval("gBrowser.swapBrowsersAndCloseOther = function " + func.replace(/^function/, ''));
    }
  },

  restoreAll: function(delay = 0) {
    var that = this;
    setTimeout(init, delay, 0);
    function init(i){
      if(i < gBrowser.tabs.length){
        var aTab = gBrowser.tabs[i];
        that.restoreForTab(aTab);
        i++;
        arguments.callee(i);
      }else{
      }
    }
  },

  uninit: function(){
    window.removeEventListener('unload', this, false)
    gBrowser.tabContainer.removeEventListener('SSTabRestoring', this, false);
    gBrowser.tabContainer.removeEventListener('TabMove', this, false);
    this.tabContext.removeEventListener('popupshowing', this, false);

  },

  handleEvent: function(event) {
    switch(event.type) {
      case "unload":
        this.uninit(event);
        break;
      case "SSTabRestoring":
        this.restore(event);
        break;
      case "TabMove":
        this.TabMove(event);
        break;
      case "popupshowing":
        this.popupshowing(event);
        break;
    }
  },

  TabMove: function(aEvent){
    var aTab = aEvent.target;
    gBrowser.protectTabIcon(aTab);
  },

  tabContextMenu: function(){
    //tab context menu
    var tabContext = this.tabContext;
    var menuitem = this.tabProtectMenu
                 = tabContext.appendChild(
                        document.createXULElement("menuitem"));
    menuitem.id = "tabProtect";
    menuitem.setAttribute("type", "checkbox");
    if (Services.appinfo.version.split(".")[0] >= 63)
      menuitem.setAttribute("label", "Tab(s) schützen");
    else
      menuitem.setAttribute("label", "Tab schützen");
    menuitem.setAttribute("accesskey", "z");
    menuitem.setAttribute("oncommand","tabProtect.toggle(TabContextMenu.contextTab);");
    tabContext.addEventListener('popupshowing', this, false);
  },

  popupshowing: function(event) {
    this.setCheckbox(event);
  },

  restore: function(event){
    tabProtect.restoreAll(0);
  },

  restoreForTab: function(aTab){
    var retrievedData = this.sessionStore.getTabValue(aTab, "tabProtect") == "true";
console.log("restoreForTab" + retrievedData);
    if(retrievedData){
      aTab.setAttribute('tabProtect',true);
    }
    gBrowser.protectTabIcon(aTab);
  },

  toggle: function(aTab){
    if (typeof gBrowser.selectedTabs != "undefined") {
      this.toggleProtectSelectedTabs(this.getSelectedTabs(aTab));
    } else {
      gBrowser.protectTab(aTab);
    }
  },

  toggleProtectSelectedTabs: function(tabs){
    if (tabs.length < 1)
      return;
    let isProtect = gBrowser.isProtectTab(tabs[0]);
    for (let tab of tabs) {
        gBrowser.protectTab(tab, !isProtect);
    }
  },

  getSelectedTabs: function(aTab){
    let contextTab = aTab;
    let selectedTabs = [contextTab];
    if (gBrowser.selectedTabs.indexOf(contextTab) < 0)
      return selectedTabs;

    for (let tab of gBrowser.selectedTabs) {
      if (contextTab != tab)
        selectedTabs.push(tab);
    }
    return selectedTabs;
  },

  setCheckbox: function(event){
    var menuitem = this.tabProtectMenu;
    var aTab = TabContextMenu.contextTab;
    if( !aTab || aTab.localName !='tab'){
      menuitem.setAttribute('hidden',true);
      return;
    }
    menuitem.setAttribute('hidden',false);
    if(aTab.hasAttribute('tabProtect') && aTab.getAttribute('tabProtect')){
      menuitem.setAttribute('checked', true);
    }else{
      menuitem.setAttribute('checked', false);
    }
  }
}

  // Wir sollten die Weiterleitung nur starten, wenn das Browserfenster den Startprozess abgeschlossen hat
  // Ansonsten sollten wir warten, bis der Start abgeschlossen ist.
  if (gBrowserInit.delayedStartupFinished) {
    tabProtect.init();
  } else {
    let delayedStartupFinished = (subject, topic) => {
      if (topic == "browser-delayed-startup-finished" &&
          subject == window) {
        Services.obs.removeObserver(delayedStartupFinished, topic);
        tabProtect.init();
      }
    };
    Services.obs.addObserver(delayedStartupFinished,
                             "browser-delayed-startup-finished");
  }
