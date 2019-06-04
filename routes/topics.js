const express = require('express'),
    router = express.Router(),
    TopicsModel = require('../models/topics');

router.get('/', async (req, res, next) => {
    const allTopics = await TopicsModel.getAllTopics();

    res.render('template', { 
        locals: {
            title: 'List of Topics from Class',
            topicList: allTopics
        },
        partials : {
            content: 'partial-topics'
        }
    });
})

router.post('/', (req, res) => {
    //console.log(`this is the output for: ${req.body.PostgresQL}`);
    Object.keys(req.body).forEach(function(key) {
        //console.log(key, req.body[key])

        const name = key;
        const ranking = req.body[key]

        TopicsModel.refreshTopic(name, ranking)
        .then(async () => {
            const allTopics = await TopicsModel.getAllTopics();
    
            res.status(200).render('template', {
                locals: {
                    title: 'List of Topics from Class',
                    topicList: allTopics
                },
                partials: {
                    content: 'partial-topics'
                }
            });
        })
        .catch((err) => {
            res.sendStatus(500).send(err.message);
        });
    })
    //const { name, ranking } = req.body;


});

// router.post('/', (req, res) => {
//     const { name, ranking } = req.body;

//     TopicsModel.updateTopic(name, ranking)
//     .then(async () => {
//         const allTopics = await TopicsModel.getAllTopics();

//         res.status(200).render('template', {
//             locals: {
//                 title: 'List of Topics from Class',
//                 topicList: allTopics
//             },
//             partials: {
//                 content: 'partial-topics'
//             }
//         });
//     })
//     .catch((err) => {
//         res.sendStatus(500).send(err.message);
//     });
// });

// router.post('/', (req, res) => {
//     const { name, ranking } = req.body;

//     TopicsModel.addTopic(name, ranking)
//     .then(async () => {
//         const allTopics = await TopicsModel.getAllTopics();
//         await TopicsModel.updateTopic();

//         //testtest();

//         res.status(200).render('template', {
//             locals: {
//                 title: 'List of Topics from Class',
//                 topicList: allTopics
//             },
//             partials: {
//                 content: 'partial-topics'
//             }
//         });
//     })
//     .catch((err) => {
//         res.sendStatus(500).send(err.message);
//     });
// });

module.exports = router;