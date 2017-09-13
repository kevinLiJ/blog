var express = require('express');
var router = express.Router();
var querySql = require('../service/querySql');

// 添加类别
router.post('/', function(req, res, next) {
    querySql('INSERT INTO class SET ?', [req.body], function(error, result) {
        if (error) {
            console.log(error.message);
            res.json({ success: false, message: error.message });
        }
        res.json({ success: true });
    })
});
// 获取类别
router.get('/', function(req, res, next) {
    querySql('SELECT * FROM class', '', function(error, result) {
        if (error) {
            console.log(error.message);
            res.json({ success: false, message: error.message });
        }
        console.log(result)
        res.json(result);
    })
});
module.exports = router;