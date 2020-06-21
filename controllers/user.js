"use strict";
const Sequelize = require("sequelize");
const {models} = require("../models");
const { encryptPassword } = require("../helpers/crypt");
const paginate = require('../helpers/paginate').paginate;

const {User,Email} = models;


// Autoload the user with id equals to :userId
exports.load = (req, res, next, userId) => {
    User.findByPk(userId)
        .then(user => {
            if (user) {
                req.user = user;
                next();
            } else {
                req.flash('error', 'There is no user with id=' + userId + '.');
                throw new Error('No exist userId=' + userId);
            }
        })
        .catch(error => next(error));
};

// GET /users
exports.index = (req, res, next) => {
    let countOptions = {
        where: {},
        include: []
    };

    User.count()
    .then(count => {
        //Pagination
        const page_items = 5;
        //The page shown is in the query
        const pageno = Number(req.query.pageno) || 1;
        //Create String with HTML to render pagination buttons
        res.locals.paginate_control = paginate(count, page_items, pageno, req.url);

        const findOptions = {
            ...countOptions,
            order: [ ['points', 'DESC'] ],
            offset: page_items*(pageno-1),
            limit: page_items
        };

        return User.findAll(findOptions);
    })
    .then(users => {
        res.render('users/index', {users});
    })
    .catch(error => next(error));
};

// GET /users/:userId
exports.show = (req, res, next) => {
    const {user} = req;
    res.render('users/show', {user});
    //Show magic methods
    //console.log(Object.keys(user.__proto__));
};

//POST /signup
exports.newUser = (req,res,next) => {
    const username = req.body.username;
    const sign_email = req.body.email;
    const password = req.body.password;
    const password2 = req.body.password2;

    Email.findOne({where: {email: sign_email}})
    .then(email => {
        if(!email){
            req.flash('error','Email is not invited');
            res.redirect('/signup');
        }else if(!email.used){
            User.findOne({where: {username: username}})
            .then(user => {
                if(user){
                    req.flash('error','User already exists');
                    res.redirect('/signup');
                }else if(password.length < 5){
                    req.flash('error','Password minimum number of characters is 5');
                    res.redirect('/signup');
                }else{
                    if(password===password2){
                        let user = User.build({
                            username,
                            email: sign_email,
                            password
                        });

                        user.save({fields: ["username", "email", "password", "salt"]})
                        .then(() => {
                            email.used = true;
                            email.username = username;
                            email.save({fields: ["used", "username"]})
                            .then(() => {
                                req.session.user = user;
                                req.flash('success','User created succesfully');
                                res.redirect('/');
                            });
                        })
                        .catch(Sequelize.ValidationError, error => {
                            req.flash('error', 'There are errors in the form:');
                            error.errors.forEach(({message}) => req.flash('error', message));
                            res.redirect('/signup');
                        });

                    }else{
                        req.flash('error','Passwords do not match');
                        res.redirect('/signup');
                    }
                }
            })
        }else{
            req.flash('error','Email is already used');
            res.redirect('/signup');
        }
    })
    .catch( error => {
        req.flash('error','Error signing up: ' + error.message);
        next(error);
    });
    
};

//POST /login
exports.logIn = (req,res,next) => {
    if(req.session.user){
        req.flash('error','You are logged in');
        return res.redirect('/');
    }
    const username = req.body.username;
    const password = req.body.password;
    User.findOne({where: {username: username}})
    .then(user => {
        if(!user){
            req.flash('error','Nombre de usuario incorrecto');
            res.redirect('/login');
        }else{
            let crypto_pass = encryptPassword(password,user.salt);
            if (crypto_pass === user.password){
                req.session.user = user;
                req.flash('success','User logged in succesfully');
                res.redirect('/goback');
            }else{
                req.flash('error','Incorrect password');
                res.redirect('/login');
            }
        }
    }).catch( error => {
        req.flash('error','Error logging in: ' + error.message);
        next(error);
    });
};

// GET /users/:userId/edit
exports.edit = (req, res, next) => {
    const {user} = req;

    res.render('users/edit', {user});
};


// PUT /users/:userId
exports.update = (req, res, next) => {
    let {user} = req;
    let fields_to_update = [];
    const rol = req.body.rol;
    const username = req.body.username;
    const password = req.body.password;
    const password2 = req.body.password2;

    console.log(req.body);
    if((rol==='admin') && (!!req.session.user.isAdmin)){
        user.isAdmin = true;
        user.isEditor = true;
        fields_to_update.push('isAdmin');
        fields_to_update.push('isEditor');
    }else if((rol==='editor') && ((!user.isAdmin) || (!!req.session.user.isAdmin)) && (!!req.session.user.isEditor)){
        user.isAdmin = false;
        user.isEditor = true;
        fields_to_update.push('isAdmin');
        fields_to_update.push('isEditor');
    }else if((rol==='user') && ((!user.isAdmin) || (!!req.session.user.isAdmin)) && ((!user.isEditor) || (!!req.session.user.isEditor))){
        user.isAdmin = false;
        user.isEditor = false;
        fields_to_update.push('isAdmin');
        fields_to_update.push('isEditor');
    }

    if(username){
        user.username = username;
        fields_to_update.push('username');
    }

    if(password) {
        if(password.length < 5){
            req.flash('error','Password minimum number of characters is 5');
            return res.redirect('/signup');
        }else if(password===password2){
            console.log('Updating password');
            user.password = password;
            fields_to_update.push('salt');
            fields_to_update.push('password');
        }else{
            req.flash('error','Passwords do not match');
            return res.redirect('/goback');
        }
    }


    user.save({fields: fields_to_update})
    .then(user => {
        Email.findOne({where: {email: user.email}})
        .then(email => {
            email.save({fields: fields_to_update})
            .then(() => {
                req.flash('success', 'User updated successfully.');
                res.redirect('/users/' + user.id);
            })
        })
    })
    .catch(Sequelize.ValidationError, error => {
        req.flash('error', 'There are errors in the form:');
        error.errors.forEach(({message}) => req.flash('error', message));
        res.render('users/edit', {user});
    })
    .catch(error => next(error));
};

//GET /logout
exports.logOut = (req,res,next) => {
    if(!req.session.user){
        req.flash('error','You are not logged in');
        return res.redirect('/login');
    }else{
        req.session.user = null;
        req.flash('success','User logged out successfully');
        return res.redirect('/login');
    }
};

// DELETE /users/:userId
exports.destroy = (req, res, next) => {
    const {user} = req;

    Email.findOne({where: {email: user.email}})
    .then(email => {
        email.used = false;
        email.username = '';
        email.save({fields: ["used", "username"]})
        .then(() => {
            user.destroy()
            .then(() => {
                // Deleting logged user
                if (req.session.user && req.session.user.id === req.user.id) {
                    delete req.session.user;
                }
                req.flash('success', 'User deleted successfully.');
                res.redirect('/goback');
            })
        });
    })
    .catch(error => next(error));
};