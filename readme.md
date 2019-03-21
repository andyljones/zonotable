The contents of this repo are largely a copy of the Zotero translation server, just with the submodules replaced by specific copies of the underlying repos.

The bookmarklet is 

```
javascript:(function()%7B(function%20()%20%7Bxhr%20%3D%20new%20XMLHttpRequest()%3Bxhr.open('POST'%2C%20encodeURI('http%3A%2F%2F127.0.0.1%3A1969%2Fnotable'))%3Bxhr.send(document.location.href)%3B%7D())%7D)()
```

# TODO
* Write a Python script that, when called with a URL, starts a [translation server](https://github.com/zotero/translation-server)
* Passes the URL to the translation server to get back JSON metadata
* Saves the JSON metadata down as a markdown file in Notable's directory.
* Problem right now is the metadata for article pages doesn't come with a link to the URL, and the translation server doesn't handle PDF links. [Should be fixed soon though](https://github.com/zotero/translation-server/issues/70)
* It's also really heavyweight due to the Zotero submodule. That'd probably need to be torn out too.
* Alternative approaches include tearing the relevant JS out of Zotero (hard), using the Zotero [standalone local API](https://www.zotero.org/support/dev/client_coding/connector_http_server), and using the [Zotero PDF recognizer](https://www.zotero.org/blog/zotero-5-0-36/).
* PDF recognizer seems to use a public API at some point, but you need an authentication token (probably easy?) and it only returns an ID to be passed to the translation server :(
