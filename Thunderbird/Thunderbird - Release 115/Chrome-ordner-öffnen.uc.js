 // Chromeordner
        // Unicode-Konvertierung → label: 'Chromeordner', tooltiptext: 'Chromeordner öffnen',
        
        (function() {

    if (location != 'chrome://messenger/content/messenger.xhtml') return;
        var toolbarbutton = document.createXULElement('toolbarbutton');
		
	   
    var props = {
            id: 'chromefolder-ToolBarButton',
            class: 'toolbarbutton-1',
            label: '',
            tooltiptext: 'Chromeordner öffnen',
            style: 'list-style-image: url("file:///F:/Adaten/Downloads/Firefox/Thunderbird/Thunderbird Setup 102.0.3/thunderbird-114.0a1.de.win64/Profilordner/chrome/icons/Chrome-Ordner.png")',
            onclick: 'if (event.button == 0) { \
Services.dirsvc.get("UChrm", Ci.nsIFile).launch(); \
}; '
                };
                for (var p in props) toolbarbutton.setAttribute(p, props[p]);

    var position = document.getElementById('unifiedToolbarContent');    
    position.parentNode.insertBefore(toolbarbutton, position.nextSibling);
        })();