var router = require('express').Router();
var USERCLASS = require('../mongodb/mongoose_connection');
module.exports = router;

router.get('/', do_homepage);

function do_homepage(req, res) {
    console.log('doing homepage');
    res.render('index');
}

// UI routes eg dropdowns, checkboxes etc
router.get('/api/v5/get_jobs', get_unique_jobs);
router.get('/api/v5/get_colors', get_unique_colors);

function get_unique_jobs(req, res) {
    console.log('getting unique jobs');
    USERCLASS.find().distinct('job')
        .then(function (jobs) {
            console.log(jobs);
            res.json(jobs);
        })

}

function get_unique_colors(req, res) {
    console.log('getting unique colors');
    USERCLASS.find().distinct('favorite_color')
        .then(function (favorite_colors) {
                console.log(favorite_colors);
                res.json(favorite_colors);


        });

    };



    // API

    router.get('/api/v5/read', do_read);
    router.post('/api/v5/create', do_create);
    router.put('/api/v5/update', do_update);
    router.delete('/api/v5/delete/:_id', do_delete);

    function do_read(req, res) {
        console.log('reading all data');
        USERCLASS.find()
            .then(function (results) {
                console.log(results);
                res.json(results);
            })
    }

    function do_create(req, res) {
        console.log('creating employee');
        console.log(req.body);

        var data = {
            name: req.body.name,
            email: req.body.email,
            gender: req.body.gender,
            job: req.body.job,
            favorite_colors: req.body.favorite_colors,
            avatar: req.body.avatar
        }
        var user = USERCLASS(data);
        user.save().then(function (result) {
            console.log(result);
            res.json({
                message: 'backend created user!'
            })
        });

    }

    function do_update(req, res) {
        console.log('creating employee');
        console.log(req.body);

        var update = {

            $set: {
                name: req.body.name,
                email: req.body.email,
                gender: req.body.gender,
                job: req.body.job,
                favorite_colors: req.body.favorite_colors,
                avatar: req.body.avatar
            }
        }
        USERCLASS.findByIdAndUpdate(req.body._id, update)
            .then(function (result) {
                    console.log(result);
                    res.json({
                        message: 'backend updated user!'
                    })
            });

        };

        function do_delete(req, res) {
            console.log('creating employee');
            console.log(req.params._id);

            USERCLASS.findByIdAndRemove(req.body._id)
                .then(function (result) {
                        console.log(result);
                        res.json({
                            message: 'backend deleted user!'
                        });

                });

            };