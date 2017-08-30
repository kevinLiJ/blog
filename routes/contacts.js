var express = require('express');
var router = express.Router();
var querySql = require('../service/querySql');

// 根据id返回某个联系人的信息
function returnContactInfoById(req, res, next) {
    var paramsId = req.params.id;
    querySql('SELECT * FROM contacts where id = ' + paramsId, '', function(error, result) {
        if (error) {
            console.log(error.message);
            res.json({ success: false, message: error.message });
        }
        res.json(result[0]);
    })
};

// 返回所有的联系人
router.get('/', function(req, res, next) {
    querySql('SELECT * FROM contacts', '', function(error, result) {
        if (error) {
            console.log(error.message);
            res.json({ success: false, message: error.message });
        }
        res.json(result);
    })
});

// 获取某个联系人的信息
router.get('/:id', returnContactInfoById);

// 更新联系人信息
router.put('/:id', function(req, res, next) {
    var paramsId = req.params.id;
    querySql('UPDATE contacts SET ? where id = ?', [req.body, paramsId], function(error, result) {
        if (error) {
            console.log(error.message);
            res.json({ success: false, message: error.message });
        }
        res.json({ success: true });
    })
});

// 收藏或取消收藏联系人
router.put('/:id/collect', function(req, res, next) {
    console.log(req.body)
    var paramsId = req.params.id;
    var isCollected = req.body.isCollect ? 1 : 0;
    querySql('UPDATE contacts SET isCollected = ? where id = ?', [isCollected, paramsId], function(error, result) {
        if (error) {
            console.log(error.message);
            res.json({ success: false, message: error.message });
        }
        next();
    })
}, returnContactInfoById);

// 添加联系人
router.post('/', function(req, res, next) {
    var contactInfo = req.body;
    console.log(contactInfo)
    querySql('INSERT INTO contacts SET ? ', contactInfo, function(error, result) {
        if (error) {
            console.log(error.message);
            res.json({ success: false, message: error.message });
        }
        res.json({ success: true });
    })
});

module.exports = router;