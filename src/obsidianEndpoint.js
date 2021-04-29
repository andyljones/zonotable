const WebEndpoint = require('./webEndpoint');
const markdown = require('./markdown');
const fs = require('fs');
const sanitize = require("sanitize-filename");
const md5 = require('md5');

var ObsidianEndpoint = module.exports = {};

ObsidianEndpoint.obsidianNoteStub = function (json) {
    var first = json[0]
    var title = (first.shortTitle || first.title)
                    .substring(0, 64)
                    .replace(/[^a-zA-Z0-9- ]/g, '')
    var hash = md5(first.url || '').substring(0, 8)
    return `${title} (${hash})`
}

ObsidianEndpoint.saveForObsidian = function (json) {
    var stub = ObsidianEndpoint.obsidianNoteStub(json);
    var obsidianDir = `${process.env.HOME}/dropbox/obsidian`;
    var notePath = `${obsidianDir}/${stub}.md`;

    // Add the original metadata as an attachment so should the Markdown layout ever change, it
    // can all be regenerated. Guess who's been burnt by that kind of thing before.
    var content = markdown.apiJsonToMarkdown(json, 'obsidian');
    content.push("```");
    content.push(JSON.stringify(json));
    content.push("```");

    console.log(`Saving note "${stub}" to "${notePath}"`)
    fs.writeFileSync(notePath, content.join('\n'));
}

ObsidianEndpoint.handle = async function (ctx, next) {
    await WebEndpoint.handle(ctx, next);

    // WebEndpoint populates ctx.response.body with the JSON-ified metadata.
    ObsidianEndpoint.saveForObsidian(ctx.response.body);

    ctx.set('Access-Control-Allow-Origin', '*');
    ctx.set('Access-Control-Request-Method', '*');
    ctx.set('Access-Control-Request-Method', '*');
    ctx.set('Access-Control-Allow-Methods', 'POST')
    ctx.set('Access-Control-Allow-Headers', 'Content-Type');
}
