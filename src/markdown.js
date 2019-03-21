
var markdown = module.exports = {};

var fieldConverters = {}
fieldConverters.title = function (value) {
    return `**Title**: ${value}`;
}
fieldConverters.creators = function (value) {
    return `**Authors**: ${value.map(function (v) {return v.lastName || v.name}).join(', ')}`;
}
fieldConverters.date = function (value) {
    return `**Date**: ${value}`;
}
fieldConverters.accessDate = function (value) {
    return `**Access Date**: ${value}`;
}
fieldConverters.abstractNote = function (value) {
    return `**Abstract**: ${value}`;
}

var itemConverters = {}
itemConverters.default = function(json) {
    var tags = json.tags.map(function (t) {return `"papers/${t['tag']}"`})
    var header = `---
title: "${json.title}"
created: ${new Date().toISOString()} 
modified: ${new Date().toISOString()} 
attachments: []
tags: ["papers", ${tags.join(', ')}]
---`
    var result = [header, '### Notes\n\n\n### Metadata']
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