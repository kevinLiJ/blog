var express = require('express');
var router = express.Router();
var querySql = require('../service/querySql');

//获取所有收藏的联系人
router.get('/', function(req, res, next) {
    querySql('SELECT * FROM contacts where iscollected = 1', '', function(error, result) {
        if (error) {
            console.log(error.message);
            res.json({ success: false, message: error.message });
        }
        res.json(result);
    })
});
module.exports = router;