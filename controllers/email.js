"use strict";
const Sequelize = require("sequelize");
const {models} = require("../models");
const paginate = require('../helpers/paginate').paginate;

const {User,Email} = models;

// GET /emails
exports.emailsIndex = (req, res, next) => {
    let countOptions = {
        where: {},
        include: []
    };

    Email.count()
    .then(count => {
        //Pagination
        const page_items = 5;
        //The page shown is in the query
        const pageno = Number(req.query.pageno) || 1;
        //Create String with HTML to render pagination buttons
        res.locals.paginate_control = paginate(count, page_items, pageno, req.url);

        const findOptions = {
            ...countOptions,
            offset: page_items*(pageno-1),
            limit: page_items
        };

        return Email.findAll(findOptions);
    })
    .then(emails => {
        res.render('emails/index', {emails});
    })
    .catch(error => next(error));
};

// POST /emails
exports.emailsAdd = (req, res, next) => {
    let new_email = req.body.newemail;

    Email.findOne({where: {email: new_email}})
    .then(email => {
        if(email){
            req.flash('error','Email is already invited');
            res.redirect('/emails');
        }else{
            let email = Email.build({
                email: new_email,
                used: false
            });

            email.save({fields: ["email", "used"]})
            .then(() => {
                req.flash('success', 'Email invited successfully.');
                res.redirect('/emails');
            });
        }
        
    })
    .catch(error => next(error));
};

// PUT /emails
exports.emailsEdit = (req, res, next) => {
    
};

// DELETE /emails/:emailId
exports.emailsDestroy = (req, res, next) => {
    let email = req.params.email;

    Email.findByPk(email)
    .then(email => {
        if(email){
            email.destroy()
            .then(() => {
                req.flash('success', 'Email deleted successfully.');
                res.redirect('/emails');
            });
        }else{
            req.flash('error','Email does not exist');
            res.redirect('/emails');
        }
    })
    .catch(error => next(error));
};