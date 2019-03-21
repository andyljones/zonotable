const WebEndpoint = require('./webEndpoint');
const markdown = require('./markdown');
const fs = require('fs');

var NotableEndpoint = module.exports = {};

NotableEndpoint.notableNoteTitle = function (json) {
    return json[0].title;
}

NotableEndpoint.saveMarkdownForNotable = function (json) {
    var title = NotableEndpoint.notableNoteTitle(json);
    var content = markdown.apiJsonToMarkdown(json);

    var notableConfig = JSON.parse(fs.readFileSync(`${process.env.HOME}/.notable.json`));
    var notePath = `${notableConfig['cwd']}/notes/${title}.md`;

    console.log(`Saving note to ${notePath}`)
    fs.writeFileSync(notePath, content);
}

NotableEndpoint.handle = async function (ctx, next) {
    await WebEndpoint.handle(ctx, next);
    NotableEndpoint.saveMarkdownForNotable(ctx.response.body);

    ctx.set('Access-Control-Allow-Origin', '*');
    ctx.set('Access-Control-Request-Method', '*');
    ctx.set('Access-Control-Request-Method', '*');
    ctx.set('Access-Control-Allow-Methods', 'POST')
    ctx.set('Access-Control-Allow-Headers', 'Content-Type');
}