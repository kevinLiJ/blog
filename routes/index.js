var express = require('express');
var router = express.Router();
var querySql = require('../service/querySql');

/* GET home page. */
router.get('/hotArticles', function(req, res, next) {
    querySql('select id,title from articles order by num_of_collections desc limit 5', '', function(error, result) {
        if (error) {
            console.log(error.message);
            res.json({ success: false, message: error.message });
        }
        res.json(result);
    })
});

module.exports = router;