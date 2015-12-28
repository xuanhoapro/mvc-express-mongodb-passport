/**
 * Created by HoaNguyen on 12/28/15.
 */
var passport = require('passport');
var usersModel = require('./../models/UsersModel');

/**
 * IndexController.js
 *
 * @description :: Server-side logic for process login.
 */
module.exports = {

    /**
     * IndexController.getLogin()
     */
    getLogin: function(req, res, next){
        if(req.isAuthenticated()) {
            res.redirect('/');
        } else {
            res.render('index/login', {title: 'Login systems'});
        }
    },

    /**
     * IndexController.postLogin()
     */
    postLogin: function(req, res, next){
        passport.authenticate('local', { successRedirect: '/',
            failureRedirect: '/login'}, function(err, user, info) {

            if(err) {
                return res.render('index/login', {title: 'Login systems', errorMessage: err.message});
            }

            if(!user) {
                return res.render('index/login', {title: 'Login systems', errorMessage: info.message});
            }

            return req.logIn(user, function(err) {
                if(err) {
                    return res.render('index/login', {title: 'Login systems', errorMessage: err.message});
                } else {
                    return res.redirect('/');
                }
            });
        })(req, res, next);
    },

    /**
     * IndexController.logout()
     */
    logout: function(req, res, next){
        req.logout();
        res.redirect('/login');
    },

    /**
     * IndexController.index()
     */
    index: function(req, res, next){
        //console.log(common.optionLeadStatus());
        if(!req.isAuthenticated()) {
            res.redirect('/login');
        }else{
            var user = req.user;
            res.render('index/index', {
                title: 'Dashbroad',
                user: user
            });
        }
    },

    /**
     * IndexController.getChangePass()
     */
    getChangePass: function(req, res, next){
        /*if(req.isAuthenticated()) {
            var user = req.user;
            return res.render('partner/changepass', {
                title: 'ログイン中のメールアドレスを表示',
                user: user,
                validate : JSON.stringify({}),
                errors : JSON.stringify({}),
                msgSuccess: ''
            });
        } else {
            res.redirect('/partner/login');
        }*/
    },

    /**
     * IndexController.postChangePass()
     */
    postChangePass: function(req, res, next){
        /*if(!req.isAuthenticated()) {
            res.redirect('/partner/login');
        }else{
            var user = req.user;
            var postData = req.body;
            partnerModel.findOne({_id: user._id}, function(err, partner){
                if (err) throw err;
                var msgSuccess = '';
                partner.password = postData.password;
                var validate = partner.validateSync();
                console.error(validate);
                if(!validate){
                    partner.save(function(err) {
                        if (err){
                            console.error(err) // validator error
                            throw err;
                        }

                        msgSuccess = 'Change password successfully!';
                        res.render('partner/changepass', {
                            title: 'ログイン中のメールアドレスを表示',
                            user: partner,
                            common: common,
                            validate: validate,
                            errors: typeof validate != 'undefined' ? JSON.stringify(validate.errors): JSON.stringify({}),
                            msgSuccess: msgSuccess
                        });
                    });
                }else{
                    res.render('partner/changepass', {
                        title: 'ログイン中のメールアドレスを表示',
                        user: user,
                        common: common,
                        validate: validate,
                        errors: typeof validate != 'undefined' ? JSON.stringify(validate.errors): JSON.stringify({}),
                        msgSuccess: msgSuccess
                    });
                }

            });
        }*/
    }

};
