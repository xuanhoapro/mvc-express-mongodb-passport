var express = require('express');
var router = express.Router();
var indexController = require('../app/controllers/IndexController');

/* GET home page. */
router.get('/', function(req, res, next) {
    indexController.index(req, res, next);
});

/* GET login page. */
router.get('/login', function(req, res, next) {
    indexController.getLogin(req, res, next);
});

/* POST process login page. */
router.post('/login', function(req, res, next) {
    indexController.postLogin(req, res, next);
});

/* GET logout page. */
router.get('/logout', function(req, res, next) {
    indexController.logout(req, res, next);
});

module.exports = router;
