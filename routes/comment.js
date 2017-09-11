var express = require('express');
var router = express.Router();
var querySql = require('../service/querySql');

//获取所有收藏的联系人
router.post('/', function(req, res, next) {
    querySql('INSERT INTO comments SET ?', [req.body], function(error, result) {
        if (error) {
            console.log(error.message);
            res.json({ success: false, message: error.message });
        }
        res.json({ success: true });
    })
});
//获取所有收藏的联系人
router.get('/:id', function(req, res, next) {
    querySql('SELECT * FROM comments WHERE article_id = ?', [req.params.id], function(error, result) {
        if (error) {
            console.log(error.message);
            res.json({ success: false, message: error.message });
        }
        console.log(result)
        res.json({ result: true, result: result });
    })
});
module.exports = router;