var express = require('express');
var router = express.Router();

var subjectCtlr = require('../controllers/subject.js');
var testCtlr = require('../controllers/test.js');
var quizCtlr = require('../controllers/quiz.js');
var userCtlr = require('../controllers/user.js');
var emailCtlr = require('../controllers/email.js');
var ssnCtlr = require('../controllers/session.js');


/*------- AUTOLOADS --------*/

/*Autoload for routes with param quizId*/
router.param('userId', userCtlr.load);
router.param('quizId', quizCtlr.load);


/*------- HOME ROUTES --------*/

/* GET Home */
router.get('/', function(req, res, next) {
  res.render('general/home.ejs');
});

//Redirecciona a la pagina desde la que se realizo la solicitud
router.get('/goback',(req,res,next) => {
    const url = req.session.backUrl || "/";
    delete req.session.backUrl;
    res.redirect(url);
});

//Guarda las rutas que no terminen en new,edit,play,session o un Id
router.get(['/','/author','/tests','/emails','/users','/users/:id(\\+d)/quizzes','/quizzes'], (req,res,next) => {
    req.session.backUrl = req.url;
    next();
});


/*------- CREDITS ROUTES --------*/

/*GET Credits*/
router.get('/credits',function(req, res, next) {
	res.render('general/credits.ejs');
});


/*------- SUBJECTS ROUTES --------*/

/* GET subjects */
router.get('/subjects/:degree/:course', subjectCtlr.getSubjects);
router.get('/subjects/:degree/:course/:itinerary', subjectCtlr.getSubjectsItin);


/*PUT subjects*/


/*POST subjects*/


/*DELETE subjects*/


/*------- TESTS ROUTES --------*/

/* GET tests */
router.get('/tests/:subject', testCtlr.subjectTests);

router.get('/newtest/:subject', ssnCtlr.adminOrEditorRequired, testCtlr.addTestForm);
router.get('/edittest/:subject/:testid', ssnCtlr.adminOrEditorRequired, testCtlr.editTestForm);
router.get('/tests/:subject/:testid',ssnCtlr.loginRequired, testCtlr.playTest);
router.get('/tests/:subject/:testid/solved',ssnCtlr.loginRequired, testCtlr.solvedTest);

/*PUT tests*/
router.put('/tests/:subject/:desc',ssnCtlr.loginRequired, testCtlr.checkTest);

/*POST tests*/
router.post('/addtest/:subject', ssnCtlr.adminOrEditorRequired, testCtlr.addTest);
router.post('/newtest/:subject', ssnCtlr.adminOrEditorRequired, testCtlr.addTestQuestions);
router.post('/edittest/:subject/:testid', ssnCtlr.adminOrEditorRequired, testCtlr.editTest);

/*DELETE tests*/
router.delete('/tests/:subject/:testid', ssnCtlr.adminOrEditorRequired, testCtlr.deleteTest);


/*------- QUIZZES ROUTES --------*/

/* GET own quizzes */
router.get('/users/:userId(\\d+)/quizzes', quizCtlr.index);

/* GET quizzes */
router.get('/quizzes', quizCtlr.index);
router.get('/quizzes/:quizId(\\d+)/play',ssnCtlr.loginRequired, quizCtlr.playQuiz);
router.get('/quizzes/:quizId(\\d+)',ssnCtlr.loginRequired, quizCtlr.showQuiz);
router.get('/quizzes/:quizId(\\d+)/edit', ssnCtlr.loginRequired, ssnCtlr.adminOrEditorRequired, quizCtlr.editQuiz);
router.get('/quizzes/new',ssnCtlr.loginRequired, ssnCtlr.adminOrEditorRequired, quizCtlr.newQuiz);

/*PUT quizzes*/
router.put('/quizzes/:quizId(\\d+)',ssnCtlr.loginRequired, ssnCtlr.adminOrEditorRequired, quizCtlr.updateQuiz);
router.put('/quizzes/randomplay',ssnCtlr.loginRequired, quizCtlr.randomPlay);
router.put('/quizzes/randomcheck/:quizId(\\d+)',ssnCtlr.loginRequired, quizCtlr.randomCheck);
router.put('/quizzes/:quizId(\\d+)/check',ssnCtlr.loginRequired, quizCtlr.checkQuiz);

/*POST quizzes*/
router.post('/quizzes', ssnCtlr.adminOrEditorRequired, quizCtlr.addQuiz);

/*DELETE quizzes*/
router.delete('/quizzes/:quizId(\\d+)', ssnCtlr.adminOrEditorRequired, quizCtlr.deleteQuiz);


/*------- USERS ROUTES --------*/

/* GET Users */
router.get('/signup', userCtlr.signup);
router.get('/login', userCtlr.login);

router.get('/users', userCtlr.index);
router.get('/logout', ssnCtlr.loginRequired, userCtlr.logOut);
router.get('/users/:userId(\\d+)', ssnCtlr.loginRequired, userCtlr.show);
router.get('/users/:userId(\\d+)/edit', ssnCtlr.loginRequired, ssnCtlr.adminOrMyselfRequired, userCtlr.edit);

/* POST Users */
router.post('/check', userCtlr.logIn);
router.post('/signup', userCtlr.newUser);

/* PUT USERS */
router.put('/users/:userId(\\d+)', ssnCtlr.loginRequired, ssnCtlr.adminOrMyselfRequired, userCtlr.update);

/* DELETE USERS */
router.delete('/users/:userId(\\d+)', ssnCtlr.loginRequired, ssnCtlr.adminOrMyselfRequired, userCtlr.destroy);


/*------- EMAILS ROUTES --------*/

/* GET Emails */
router.get('/emails', ssnCtlr.adminOrEditorRequired, emailCtlr.emailsIndex);

/* POST Emails */
router.post('/emails', ssnCtlr.adminOrEditorRequired, emailCtlr.emailsAdd);

/* PUT Emails */
router.put('/emails/:email', ssnCtlr.adminOrEditorRequired, emailCtlr.emailsEdit);

/* DELETE Emails */
router.delete('/emails/:email', ssnCtlr.adminOrEditorRequired, emailCtlr.emailsDestroy);


//Export routes module
module.exports = router;