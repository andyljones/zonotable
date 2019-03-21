const WebEndpoint = require('./webEndpoint');
const markdown = require('./markdown');
const fs = require('fs');

var NotableEndpoint = module.exports = {};

NotableEndpoint.notableNoteTitle = function (json) {
    return json[0].title;
}

NotableEndpoint.saveForNotable = function (json) {
    var title = NotableEndpoint.notableNoteTitle(json);
    var notableDir = JSON.parse(fs.readFileSync(`${process.env.HOME}/.notable.json`))['cwd'];
    var notePath = `${notableDir}/notes/${title}.md`;
    var metadataPath = `${notableDir}/attachments/${title}.json`;

    // Add the original metadata as an attachment so should the Markdown layout ever change, it
    // can all be regenerated. Guess who's been burnt by that kind of thing before.
    var content = markdown.apiJsonToMarkdown(json);
    content.push(`**Full metadata**: [JSON](../attachments/${title}.json)`)

    console.log(`Saving note "${title}" to "${notePath}"`)
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