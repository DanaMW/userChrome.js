# Introduction

---

Here is a collection of Firefox userChromeJS scripts.

Almost all scripts were presented or adapted there in the German Firefox forum.

For GitHub, the scripts are stored in sub-folders with the corresponding README files. It's about
Text files in markdown format with the file extension `md`. Screenshots up to 09/30/2017 were created in Firefox 57.
The results of the scripts updated for newer Firefox versions may look a little different. The screenshots
are only updated if there are extreme differences.

## userChrome scripts - use in Firefox

---

### Download and unzip the ZIP file: firefox-anpassungen.zip

---

#### The archive contains the following:

---

#### 1. UserChromeJS subdirectory with the files

* main.js
* utilities.js
* Readme.txt

#### 2. Chrome subdirectory with the file

  ---

* userChrome.js

#### 3. Config.js file

#### 4. Config-prefs.js file

#### Note:

  For this method to work from Firefox 62 onwards, the one introduced with Firefox 62 must be
   AutoConfig sandboxing must be deactivated. To do this, the config-prefs.js
   insert the following line:
   `CSS pref("general.config.sandbox_enabled", false);`
  **However, it should be clear to everyone that the use of the scripts tends to be (er) unsafe!** **Use only at your own risk - your own risk!** **No liability is accepted!**

#### Direct download:

 **⇒** [firefox-anpassungen.zip] (https://raw.githubusercontent.com/Endor8/userChrome.js/master/userChrome/Dateien/firefox-anpassungen.zip)

#### Where do the files have to go?

The **config.js** file and the **userChromeJS** folder must be placed in the **Firefox installation folder**

The file **config-prefs.js** must be in the **Firefox installation folder\defaults\pref**

##### Where can I find the Firefox installation folder

Under **C:\Program Files\Mozilla Firefox (at 64bit)**
or
**C:\Program Files (x86)\Mozilla Firefox (at 32bit)**
or
**Portable_Firefox\Firefox** for portable Firefox from [here] (https://mozhelp.dynvpn.de/daten/index.php?path=Programme/)

The file belongs in the **profile folder\chrome**:
**userChrome.js**

**The profile folder can usually be found at:**

**%appdata%\Mozilla\Firefox\Profiles\xxx.default**
(xxx stands for a random sequence of characters and is different for everyone)

or
**Portable_Firefox\Profile folder** for portable Firefox from [here] (https://mozhelp.dynvpn.de/daten/index.php?path=Programme/)

##### The file is also available for download here:

https://github.com/Endor8/userChrome.js/tree/master/userChrome/Dateien

##### A current collection of scripts is available here:

https://github.com/ardiman/userChrome.js

##### Information and help can be found here:

https://www.camp-firefox.de/forum/viewtopic.php?f=16&t=112673

### Here is a video on how to use the scripts

https://user-images.githubusercontent.com/1267601/120994091-75bf1680-c784-11eb-8896-8e756049dfe9.mp4

Video friendly way of [citronella](https://www.camp-firefox.de/forum/thema/132699-videoanleitung-f%C3%BCr-userchrome-css-usercontent-css-vorbereitung-skripte/?postID=1173160#post1173160) made available.

### Script sources

- https://www.camp-firefox.de/forum/viewtopic.php?f=16&t=100898
- https://github.com/danamw/userChrome.js
- https://github.com/ardiman/userChrome.js
- https://github.com/alice0775/userChrome.js
- https://github.com/sdavidg/firefoxChromeScripts
- https://github.com/aminomancer/uc.css.js/tree/master/script
- https://github.com/Aris-t2/CustomJSforFx/tree/master/scripts
- https://u6.getuploader.com/script/
