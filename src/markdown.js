
var markdown = module.exports = {};

var fieldConverters = {}
fieldConverters.title = function (value) {
    return [3, `**Title**: ${value}`];
}
fieldConverters.creators = function (value) {
    return [5, `**Authors**: ${value.map(function (v) {return v.lastName || v.name}).join(', ')}`];
}
fieldConverters.date = function (value) {
    return [6, `**Date**: ${value}`];
}
fieldConverters.abstractNote = function (value) {
    return [7, `**Abstract**: ${value}`];
}
fieldConverters.accessDate = function (value) {
    return [8, `**Accessed**: ${value}`];
}
fieldConverters.url = function (value) {
    return [9, `**Original**: [URL](${value})`];
}

var itemConverters = {}
itemConverters.default = function(json) {
    var tags = (json.tags || []).map(function (t) {return `"papers/source/${t['tag']}"`})
    var header = `---
title: "${json.title}"
created: ${new Date().toISOString()} 
modified: ${new Date().toISOString()} 
attachments: []
tags: ["papers", ${tags.join(', ')}]
---`
    var result = [[0, header], [1, '### Notes\n'], [2, '### Metadata']]
    for (var field in json) {
        var value = json[field];
        if (fieldConverters.hasOwnProperty(field)) {
            result.push(fieldConverters[field](value));
        }
    }
    return result;
}
itemConverters.attachment = function (json) {
    if (json.mimeType === 'application/pdf') {
        return [[4, `**Attachment**: [${json.title}](${json.url})`]];
    } else {
        return [[Infinity, '']]
    }
}
itemConverters.note = function (json) {
    return [[Infinity, '']]
}

markdown.apiJsonToMarkdown = function (json) {
    if (Array.isArray(json)) {
        return json
                    .map(markdown.apiJsonToMarkdown)
                    .flat()
                    .sort()
                    .map(function (it) {return it[1]})
                    .filter(function (it) {return it !== ''});
    }

    if (itemConverters.hasOwnProperty(json.itemType)) {
        return itemConverters[json.itemType](json);
    } else {
        return itemConverters.default(json);
    }
}
