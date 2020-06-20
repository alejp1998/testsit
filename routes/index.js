var express = require('express');
var router = express.Router();
var quizController = require('../controllers/quiz.js');
var statsController = require('../controllers/stats.js');
var userController = require('../controllers/user.js');
var sessionController = require('../controllers/session.js');


/*------- AUTOLOADS --------*/

/*Autoload for routes with param quizId*/
router.param('userId', userController.load);
router.param('quizId', quizController.load);

/*------- HOME ROUTES --------*/

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('home.ejs');
});
//Redirecciona a la pagina desde la que se realizo la solicitud
router.get('/goback',(req,res,next) => {
    const url = req.session.backUrl || "/";
    delete req.session.backUrl;
    res.redirect(url);
});
//Guarda las rutas que no terminen en new,edit,play,session o un Id
router.get(['/','/author','/users','/users/:id(\\+d)/quizzes','/quizzes'], (req,res,next) => {
    req.session.backUrl = req.url;
    next();
});

/*------- QUIZZES ROUTES --------*/

/* GET own quizzes */
router.get('/users/:userId(\\d+)/quizzes', quizController.index);

/* GET quizzes */
router.get('/quizzes', quizController.index);
router.get('/quizzes/:quizId(\\d+)/play',sessionController.loginRequired, quizController.playQuiz);
router.get('/quizzes/:quizId(\\d+)',sessionController.loginRequired, quizController.showQuiz);
router.get('/quizzes/:quizId(\\d+)/edit', sessionController.loginRequired, sessionController.adminOrEditorRequired, quizController.editQuiz);
router.get('/quizzes/new',sessionController.loginRequired, sessionController.adminOrEditorRequired, quizController.newQuiz);
/*PUT quizzes*/
router.put('/quizzes/:quizId(\\d+)',sessionController.loginRequired, sessionController.adminOrEditorRequired, quizController.updateQuiz);
router.put('/quizzes/randomplay',sessionController.loginRequired, quizController.randomPlay);
router.put('/quizzes/randomcheck/:quizId(\\d+)',sessionController.loginRequired, quizController.randomCheck);
router.put('/quizzes/:quizId(\\d+)/check',sessionController.loginRequired, quizController.checkQuiz);
/*POST quizzes*/
router.post('/quizzes', sessionController.adminOrEditorRequired, quizController.addQuiz);
/*DELETE quizzes*/
router.delete('/quizzes/:quizId(\\d+)', sessionController.adminOrEditorRequired, quizController.deleteQuiz);

/* GET tests */
router.get('/tests/primero', quizController.primero);
router.get('/tests/segundo', quizController.segundo);
router.get('/tests/tercero', quizController.tercero);
router.get('/tests/cuarto', quizController.cuarto);
router.get('/tests/sistemas', quizController.sistemas);
router.get('/tests/electronica', quizController.electronica);
router.get('/tests/sonidoimagen', quizController.sonidoimagen);
router.get('/tests/telematica', quizController.telematica);

router.get('/tests/:subject', quizController.subjectTests);

router.get('/newtest/:subject', sessionController.adminOrEditorRequired, quizController.addTestForm);
router.get('/edittest/:subject/:testid', sessionController.adminOrEditorRequired, quizController.editTestForm);
router.get('/tests/:subject/:testid',sessionController.loginRequired, quizController.playTest);
router.get('/tests/:subject/:testid/solved',sessionController.loginRequired, quizController.solvedTest);

/*PUT tests*/
router.put('/tests/:subject/:desc',sessionController.loginRequired, quizController.checkTest);

/*POST tests*/
router.post('/addtest/:subject', sessionController.adminOrEditorRequired, quizController.addTest);
router.post('/newtest/:subject', sessionController.adminOrEditorRequired, quizController.addTestQuestions);
router.post('/edittest/:subject/:testid', sessionController.adminOrEditorRequired, quizController.editTest);

/*DELETE tests*/
router.delete('/tests/:subject/:testid', sessionController.adminOrEditorRequired, quizController.deleteTest);


/*------- USERS ROUTES --------*/

/* GET Users */
router.get('/signup', (req,res,next) => {
    res.render('signup.ejs');
});
router.get('/login', (req,res,next) => {
    res.render('login.ejs');
});
router.get('/users', userController.index);
router.get('/logout',sessionController.loginRequired, userController.logOut);
router.get('/users/:userId(\\d+)',sessionController.loginRequired, userController.show);
router.get('/users/:userId(\\d+)/edit', sessionController.loginRequired, sessionController.adminOrMyselfRequired, userController.edit);
/* POST Users */
router.post('/check', userController.logIn);
router.post('/signup', userController.newUser);
/* PUT USERS */
router.put('/users/:userId(\\d+)', sessionController.loginRequired, sessionController.adminOrMyselfRequired, userController.update);
/* DELETE USERS */
router.delete('/users/:userId(\\d+)', sessionController.loginRequired, sessionController.adminOrMyselfRequired, userController.destroy);


/*------- EMAILS ROUTES --------*/

/* GET Emails */
router.get('/emails', sessionController.adminOrEditorRequired, userController.emailsIndex);
/* POST Emails */
router.post('/emails', sessionController.adminOrEditorRequired, userController.emailsAdd);
/* PUT Emails */
router.put('/emails/:email', sessionController.adminOrEditorRequired, userController.emailsEdit);
/* DELETE Emails */
router.delete('/emails/:email', sessionController.adminOrEditorRequired, userController.emailsDestroy);

/*------- STATS ROUTES --------*/

/* GET Stats */
//router.get('/stats', statsController.stats);
//router.get('/userstats/:userId(\\d+)', sessionController.loginRequired , statsController.userstats);

/*------- CREDITS ROUTES --------*/

/*GET Credits*/
router.get('/credits',function(req, res, next) {
	res.render('credits.ejs');
});

module.exports = router;
