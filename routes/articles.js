var express = require('express');
var router = express.Router();
var querySql = require('../service/querySql');

// 根据id返回某个文章的信息
function returnContactInfoById(req, res, next) {
    var paramsId = req.params.id;
    querySql('SELECT * FROM articles where id = ' + paramsId, '', function(error, result) {
        if (error) {
            console.log(error.message);
            res.json({ success: false, message: error.message });
        }
        res.json(result[0]);
    })
};

// 根据分页信息返回的文章信息
router.get('/', function(req, res, next) {
    // 查询文章总条数
    querySql('select count(*) from articles', '', function(error, result) {
        if (error) {
            console.log(error.message);
            res.json({ success: false, message: error.message });
        }
        req.articlesSum = result[0]['count(*)'];
        next();
    })
}, function(req, res, next) {
    let startId = req.query.start;
    let endId = req.query.end;
    console.log('return articles id between' + startId + '----' + endId)
    querySql('SELECT * FROM articles where id between ? and ?', [startId, endId], function(error, result) {
        if (error) {
            console.log(error.message);
            res.json({ success: false, message: error.message });
        }
        res.json({
            articlesInfo: result,
            articlesSum: req.articlesSum
        });
    })
});

// 获取某个文章的信息
router.get('/:id', returnContactInfoById);

// 更新文章信息
router.put('/:id', function(req, res, next) {
    var paramsId = req.params.id;
    querySql('UPDATE articles SET ? where id = ?', [req.body, paramsId], function(error, result) {
        if (error) {
            console.log(error.message);
            res.json({ success: false, message: error.message });
        }
        res.json({ success: true });
    })
});

// 收藏或取消收藏文章
router.patch('/:id/like', function(req, res, next) {
    console.log(req.body)
    var paramsId = req.params.id;
    querySql('UPDATE articles SET num_of_collections=num_of_collections+1 where id = ?', [paramsId], function(error, result) {
        if (error) {
            console.log(error.message);
            res.json({ success: false, message: error.message });
        }
        next();
    })
}, returnContactInfoById);

// 添加文章
router.post('/', function(req, res, next) {
    var contactInfo = req.body;
    console.log(contactInfo)
    querySql('INSERT INTO articles SET ? ', contactInfo, function(error, result) {
        if (error) {
            console.log(error.message);
            res.json({ success: false, message: error.message });
        }
        res.json({ success: true });
    })
});

module.exports = router;