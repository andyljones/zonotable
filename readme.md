This is a local webserver which adds research papers to [Notable](https://github.com/notable/notable). Install it using

```bash
git clone git@github.com:andyljones/zonotable.git
npm install
npm start
```
then add the following as a bookmark:
```
javascript:(function()%7B(function%20()%20%7Bxhr%20%3D%20new%20XMLHttpRequest()%3Bxhr.open('POST'%2C%20encodeURI('http%3A%2F%2F127.0.0.1%3A1969%2Fnotable'))%3Bxhr.send(document.location.href)%3B%7D())%7D)()
```
Visit any paper repository [supported by Zotero](https://github.com/zotero/translators) and click the bookmark to add it's metadata as a new note in Notable.

## Notes
Most of the code in this repo comes from Zotero, and in particular [it's translation server](https://github.com/zotero/translation-server).