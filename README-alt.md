# Introduction
   Here is a collection of Firefox userChromeJS scripts.

Almost all scripts were presented or adapted there in the German Firefox forum.

For GitHub, the scripts are stored in sub-folders with the corresponding README files. It's about
Text files in markdown format with the file extension `md`. Screenshots up to 09/30/2011 were created in Firefox 6.
The results of the scripts updated for newer Firefox versions may look a little different. The screenshots
are only updated if there are extreme differences.

# Test environment/History
- Win 7 64bit SP 1/ Firefox 37 (ab 31.03.2015)
- Win 7 64bit SP 1/ Firefox 36 (ab 25.02.2015)
- Win 7 64bit SP 1/ Firefox 35 (ab 15.01.2015)
- Win 7 64bit SP 1/ Firefox 34 (ab 02.12.2014)
- Win 7 64bit SP 1/ Firefox 33 (ab 14.10.2014)
- Win 7 64bit SP 1/ Firefox 32 (ab 03.09.2014)
- Win 7 64bit SP 1/ Firefox 31 (ab 23.07.2014)
- Win 7 64bit SP 1/ Firefox 30 (ab 11.06.2014)
- Win 7 64bit SP 1/ Firefox 29 (ab 29.04.2014)
- Win 7 64bit SP 1/ Firefox 28 (ab 18.03.2014)
- Win 7 64bit SP 1/ Firefox 27 (ab 04.02.2014)
- Win 7 64bit SP 1/ Firefox 26 (ab 11.12.2013)
- Win 7 64bit SP 1/ Firefox 25 (ab 30.10.2013)
- Win 7 64bit SP 1/ Firefox 24 (ab 18.09.2013)
- Win 7 64bit SP 1/ Firefox 23 (ab 07.08.2013)
- Win 7 64bit SP 1/ Firefox 22 (ab 29.06.2013)
- Win XP SP 3/ Firefox 21 (ab 14.05.2013)
- Win XP SP 3/ Firefox 20 (ab 03.04.2013)
- Win XP SP 3/ Firefox 19 (ab 20.02.2013)
- Win XP SP 3/ Firefox 18 (ab 08.01.2013)
- Win XP SP 3/ Firefox 17 (ab 20.11.2012)
- Win XP SP 3/ Firefox 16 (ab 10.10.2012)
- Win XP SP 3/ Firefox 15 (ab 29.08.2012)
- Win XP SP 3/ Firefox 14 (ab 18.07.2012)
- Win XP SP 3/ Firefox 13 (ab 06.06.2012)
- Win XP SP 3/ Firefox 12 (ab 24.04.2012)
- Win XP SP 3/ Firefox 11 (ab 14.03.2012)
- Win XP SP 3/ Firefox 10 (ab 31.01.2012)
- Win XP SP 3/ Firefox 9 (ab 27.12.2011)
- Win XP SP 3/ Firefox 8 (ab 10.11.2011)
- Win XP SP 3/ Firefox 7 (ab 01.10.2011)
- Win XP SP 3/ Firefox 6 (bis 30.09.2011)

If a script does not work, please look in the source text to see what has been adapted in the respective Firefox version
must be or rummage in the history of the script.

# Installation
To activate the scripts in Firefox you have to

- the ** extension userChromeJS ** must be installed and executable
- a ** file called userChrome.js ** is used to import the scripts (more on this below)
- the respective script can be copied into the Chrome folder of the profile. The scripts should best be downloaded in the script view via the ** Raw button above the source text **.

Including the `uc.js`- and `uc.xul`-Files happens with the enclosed userChrome.js. This file (please do not include confuse the extension) must also be added to the profile's Chrome folder. The line

    userChrome.import("*", "UChrm");

it takes care of the import of all userChrome scripts.

# Downloads
- the required ** extension ** userChromeJS: http://userchromejs.mozdev.org/
- an exemplary ** file ** userChrome.js: https://github.com/danamw/userChrome.js/blob/master/userChrome.js

# Hints
## Script cache
Since Firefox 8.0 there is a kind of script cache. This leads to changes in scripts (configuration/texts etc.) after a "normal" restart will not be active.There are scripts that can solve this problem by clearing the script cache:

- https://github.com/danamw/userChrome.js/tree/master/addrestartbutton
- https://github.com/danamw/userChrome.js/tree/master/restartfirefox
- https://github.com/danamw/userChrome.js/tree/master/restartfirefoxbutton

Other methods are explained on the [Script cache page on the Wiki] (https://github.com/danamw/userChrome.js/wiki/Skriptcache).

## Umlauts
As of userChromeJS 1.5, umlauts are handled differently in the uc.js files. At the beginning of the construction of this collection userChromeJS 1.4 was current
, so there may be problems with the display of special characters (see [thread in the German Firefox forum] (http://www.camp-firefox.de/forum/viewtopic.php?p=832387#p832387)).

Possible solutions:

- the script is saved in e.g. Notepad ++ as "UTF8 without BOM"
- the umlauts are converted with the Notepad ++ plugin "HTML Tag"

# Sources
- https://www.camp-firefox.de/forum/viewtopic.php?f=16&t=100898
- https://github.com/danamw/userChrome.js
- https://github.com/ardiman/userChrome.js
- https://github.com/alice0775/userChrome.js
- https://github.com/sdavidg/firefoxChromeScripts
- https://u6.getuploader.com/script/
