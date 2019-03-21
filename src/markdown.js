
var markdown = module.exports = {};

var fieldConverters = {}
fieldConverters.title = function(value) {
    return `**Title**: ${value}`;
}

var itemConverters = {}
itemConverters.default = function(json) {
    var tags = json.tags.map(function (t) {return `"${t['tag']}"`})
    var header = `
---
title: ${json.title}
created: ${new Date().toISOString()} 
modified: ${new Date().toISOString()} 
attachments: []
tags: [${tags.join(', ')}]
---
`
    var result = [header, '## Metadata']
    for (var field in json) {
        var value = json[field];
        if (fieldConverters.hasOwnProperty(field)) {
            result.push(fieldConverters[field](value));
        }
    }
    return result.join('\n');
}
itemConverters.attachment = function (json) {
    if (json.mimeType === 'application/pdf') {
        return `**Attachment**: [${json.title}](${json.url})`;
    } 
}

markdown.apiJsonToMarkdown = function (json) {
    if (Array.isArray(json)) {
        return json.map(markdown.apiJsonToMarkdown).join('\n');
    }

    if (itemConverters.hasOwnProperty(json.itemType)) {
        return itemConverters[json.itemType](json);
    } else {
        return itemConverters.default(json);
    }
}