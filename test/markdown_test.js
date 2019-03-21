const markdown = require('../src/markdown');
const assert = require('assert');

// Run this with `npm test -- --grep markdown`
describe('apiJsonToMarkdown', function () {
    it('should run without crashing', function () {
        var markdown = markdown.apiJsonToMarkdown(exports.TEST_DATA)
        console.log(markdown)
    })
})

TEST_DATA = [
    {
        "key": "5CPRDMBQ",
        "version": 0,
        "itemType": "journalArticle",
        "creators": [
            {
                "firstName": "Lasse",
                "lastName": "Espeholt",
                "creatorType": "author"
            },
            {
                "firstName": "Hubert",
                "lastName": "Soyer",
                "creatorType": "author"
            },
            {
                "firstName": "Remi",
                "lastName": "Munos",
                "creatorType": "author"
            },
            {
                "firstName": "Karen",
                "lastName": "Simonyan",
                "creatorType": "author"
            },
            {
                "firstName": "Volodymir",
                "lastName": "Mnih",
                "creatorType": "author"
            },
            {
                "firstName": "Tom",
                "lastName": "Ward",
                "creatorType": "author"
            },
            {
                "firstName": "Yotam",
                "lastName": "Doron",
                "creatorType": "author"
            },
            {
                "firstName": "Vlad",
                "lastName": "Firoiu",
                "creatorType": "author"
            },
            {
                "firstName": "Tim",
                "lastName": "Harley",
                "creatorType": "author"
            },
            {
                "firstName": "Iain",
                "lastName": "Dunning",
                "creatorType": "author"
            },
            {
                "firstName": "Shane",
                "lastName": "Legg",
                "creatorType": "author"
            },
            {
                "firstName": "Koray",
                "lastName": "Kavukcuoglu",
                "creatorType": "author"
            }
        ],
        "tags": [
            {
                "tag": "Computer Science - Machine Learning",
                "type": 1
            },
            {
                "tag": "Computer Science - Artificial Intelligence",
                "type": 1
            }
        ],
        "title": "IMPALA: Scalable Distributed Deep-RL with Importance Weighted Actor-Learner Architectures",
        "date": "2018-02-05",
        "abstractNote": "In this work we aim to solve a large collection of tasks using a single reinforcement learning agent with a single set of parameters. A key challenge is to handle the increased amount of data and extended training time. We have developed a new distributed agent IMPALA (Importance Weighted Actor-Learner Architecture) that not only uses resources more efficiently in single-machine training but also scales to thousands of machines without sacrificing data efficiency or resource utilisation. We achieve stable learning at high throughput by combining decoupled acting and learning with a novel off-policy correction method called V-trace. We demonstrate the effectiveness of IMPALA for multi-task reinforcement learning on DMLab-30 (a set of 30 tasks from the DeepMind Lab environment (Beattie et al., 2016)) and Atari-57 (all available Atari games in Arcade Learning Environment (Bellemare et al., 2013a)). Our results show that IMPALA is able to achieve better performance than previous agents with less data, and crucially exhibits positive transfer between tasks as a result of its multi-task approach.",
        "url": "http://arxiv.org/abs/1802.01561",
        "publicationTitle": "arXiv:1802.01561 [cs]",
        "extra": "arXiv: 1802.01561",
        "libraryCatalog": "arXiv.org",
        "accessDate": "2019-03-21T11:50:17Z",
        "shortTitle": "IMPALA"
    },
    {
        "itemType": "attachment",
        "parentItem": "5CPRDMBQ",
        "title": "arXiv:1802.01561 PDF",
        "mimeType": "application/pdf",
        "url": "http://www.arxiv.org/pdf/1802.01561.pdf"
    },
    {
        "itemType": "attachment",
        "parentItem": "5CPRDMBQ",
        "title": "arXiv.org Snapshot",
        "mimeType": "text/html",
        "url": "http://arxiv.org/abs/1802.01561"
    }
]

module.exports = exports