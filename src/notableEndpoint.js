const WebEndpoint = require('./webEndpoint');
const markdown = require('./markdown');
const fs = require('fs');
const sanitize = require("sanitize-filename");
const md5 = require('md5');

var NotableEndpoint = module.exports = {};

NotableEndpoint.notableNoteStub = function (json) {
    var first = json[0]
    var title = sanitize(first.shortTitle || first.title).substring(0, 64)
    var hash = md5(first.url || '').substring(0, 8)
    return `papers-${title}-${hash}`
}

NotableEndpoint.saveForNotable = function (json) {
    var stub = NotableEndpoint.notableNoteStub(json);
    var notableDir = JSON.parse(fs.readFileSync(`${process.env.HOME}/.notable.json`))['cwd'];
    var notePath = `${notableDir}/notes/${stub}.md`;
    var metadataPath = `${notableDir}/attachments/${stub}.json`;

    // Add the original metadata as an attachment so should the Markdown layout ever change, it
    // can all be regenerated. Guess who's been burnt by that kind of thing before.
    var content = markdown.apiJsonToMarkdown(json, 'notable');
    content.push(`**Metadata**: [JSON](@attachment/${stub}.json)`)
    content.push(`**Markdown**: [${stub}.md](@note/${stub}.md)`)

    console.log(`Saving note "${stub}" to "${notePath}"`)
    fs.writeFileSync(notePath, content.join('\n'));
    fs.writeFileSync(metadataPath, JSON.stringify(json));
}

NotableEndpoint.handle = async function (ctx, next) {
    await WebEndpoint.handle(ctx, next);

    // WebEndpoint populates ctx.response.body with the JSON-ified metadata.
    NotableEndpoint.saveForNotable(ctx.response.body);

    ctx.set('Access-Control-Allow-Origin', '*');
    ctx.set('Access-Control-Request-Method', '*');
    ctx.set('Access-Control-Request-Method', '*');
    ctx.set('Access-Control-Allow-Methods', 'POST')
    ctx.set('Access-Control-Allow-Headers', 'Content-Type');
}