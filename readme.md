# TODO
* Write a Python script that, when called with a URL, starts a [translation server](https://github.com/zotero/translation-server)
* Passes the URL to the translation server to get back JSON metadata
* Saves the JSON metadata down as a markdown file in Notable's directory.
* Problem right now is the metadata for article pages doesn't come with a link to the URL, and the translation server doesn't handle PDF links. [Should be fixed soon though](https://github.com/zotero/translation-server/issues/70)