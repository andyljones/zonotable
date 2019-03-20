# Notes
* Want to hook up the Zotero's ability to parse a wide range of documents into metadata to Notable's excellent notetaking
* Specifically, want to be able to run [Zotero translators](https://www.zotero.org/support/dev/translators) on a URL, then save the JSON down as a 'nice' Markdown file in Notable's directory.
* Would be happy with a first version that worked in Python from the command line; Chrome extensios can wait till later. 
* As a first step, try getting one of the translators working.
* There's a list of translators [here](https://github.com/zotero/translators)
* They seem to mainly depend on `utilities.js`

# Zotero Structure
* Most stuff is in `chrome/content/zotero`, a bit more is in `resources`
* First trick though is being able to call the translation service at all. Key seems to be `Zotero.Translate.Web` in `translate.js` of Zotero, but I've no idea how to get it into a REPL or unit test. Probably has a bunch of dependencies I'm not yet aware of.
* There's a translation tester website that runs off `testTranslators.html`. Probably easiest to mimic that.
* Starts by requiring `include.js`, which in turns pulls in `require.js` and a whoooole bunch of other stuff. Christ. Back to `translate.js`.
* The translator's called inside the sandbox defined in `translate_firefox.js`, and that's a whole mess in itself.
* OK. We don't care about sandboxing. The only stuff `arXiv.js.org` seems to use is `Zotero.Utilities`.