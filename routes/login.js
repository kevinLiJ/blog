var express = require('express');
var router = express.Router();
var querySql = require('../service/querySql');

//获取所有收藏的联系人
router.post('/', function(req, res, next) {
    let userName = req.body.userName;
    let password = req.body.password;
    querySql('SELECT * FROM user where user_name = ? and password = ?', [userName, password], function(error, result) {
        if (error) {
            console.log(error.message);
            res.json({ success: false, message: error.message });
        }
        if (result.length === 1) {
            res.json({ success: true });
        } else {
            res.json({ success: false });
        }
    })
});
module.exports = router;