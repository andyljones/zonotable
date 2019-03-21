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

### Notes
Most of the code in this repo comes from Zotero, and in particular [it's translation server](https://github.com/zotero/translation-server). The translation server is pretty heavy weight however (>100MB repo), so this repo is cut down to the minimum needed.

One limitation right now is that it can't extract metadata directly from pdfs. Rather you need to be viewing the landing page, like arXiv's [/abs](https://arxiv.org/abs/1707.06347) page. This is because Zotero extracts pdf metadata using a [recognizer server](https://github.com/zotero/recognizer-server) that's substantially harder to get running independently than the translation server.

At some point - when I've finished dogfooding - this'll be turned into an npm package. And at some further point in the future, hopefully it'll be a [Notable plugin](https://github.com/notable/notable/issues/128).

### TODO
* Add more fields to the Markdown
* Add a flag for adding tags. A lot of time the ones it picks up are annoying.
* Turn this into an npm package
* Raise an error through the browser if something goes wrong (and a message if it goes right?)
* Make the tests actually test something.
* Add a script for importing an existing Zotero library