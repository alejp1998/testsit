"use strict";
const Sequelize = require('sequelize');
const {models} = require("../models");
const Op = Sequelize.Op;
const paginate = require('../helpers/paginate').paginate;
var ssn;

const {User,Subject,Test,Quiz} = models;


//GET /subjects/:degree/:course
exports.getSubjects = (req, res, next) => {
    const {degree,course} = req.params;
    const itinerary = null;

    Subject.findAll({
        where: {degree,course}
    }).then(subjects => {
        res.render('subjects/subjects.ejs', {subjects,itinerary} );
    }).catch(error => {
        req.flash('error', 'Error showing subjects: ' + error.message);
        next(error);
    });
};


//GET /subjects/:degree/:course/:itinerary
exports.getSubjectsItin = (req, res, next) => {
    const {degree,course,itinerary} = req.params;

    Subject.findAll({
        where: {degree,course,itinerary}
    }).then(subjects => {
        res.render('subjects/subjects.ejs', {subjects,itinerary} );
    }).catch(error => {
        req.flash('error', 'Error showing subjects: ' + error.message);
        next(error);
    });
};