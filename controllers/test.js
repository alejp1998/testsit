"use strict";
const Sequelize = require('sequelize');
const {models} = require("../models");
const Op = Sequelize.Op;
const paginate = require('../helpers/paginate').paginate;
var ssn;

const {Subject,Test,Quiz} = models;

//GET /tests/:subject
//Cargar todos los quizzes que pertenezcan a una asignatura, y,
//a partir de ellos formar un array que contenga todas las distintas
//descripciones de estos, que se mostrarán en una lista.
exports.subjectTests = (req, res, next) => {
  const subject = req.params.subject;

  Test.findAll({
    where: {subject: subject}
  }).then(tests => {
    res.render('tests/subject_tests.ejs', {subject,tests} );
  }).catch(error => {
    req.flash('error', 'Error showing subject tests: ' + error.message);
    next(error);
  });
};

//GET /tests/:subject/:testid
//Se deben precargar todas las preguntas que pertenezcan a un testid y
//asignatura en una lista, que se deberá mostrar posteriormente como si de un
//test de moodle se tratase, para finalmente ser corregidas
exports.playTest = (req, res, next) => {
  const subject = req.params.subject;
  const testid = req.params.testid;

  Test.findByPk(testid, 
    {include: ['quizzes']}
  ).then(test => {
    req.session.test = test;
    res.render('tests/play_test.ejs', {subject,test} );
  }).catch(error => {
    req.flash('error', 'Error showing subject tests: ' + error.message);
    next(error);
  });
};

//PUT /tests/:subject/:testid
//Se encarga de comprobar que las preguntas del tests son correctas, incorrectas, o no contestadas;
//a partir del array del test guardado como dato de la sesion, debe dar paso a una vista donde se muestren
//las preguntas en rojo si hemos fallado y en verde si acertamos, la puntuación total etc
exports.checkTest = (req, res, next) => {
  const test = req.session.test;
  const subject = req.params.subject;
  let correct = 0;
  let incorrect = 0;
  let nonanswered = 0;
  
  let answers = req.body;
  let N = Object.keys(test.quizzes).length;

  for (var i = 0; i < N; i++) {
    if(answers['answer'+ i] === '0'){
      test.quizzes[i].result = 'nonanswered';
      nonanswered++;
    }else if( Number(test.quizzes[i].answer) === Number(answers['answer'+ i]) ){
      test.quizzes[i].result = 'correct';
      correct++;
    }else if( Number(test.quizzes[i].answer) !== Number(answers['answer'+ i]) ){
      test.quizzes[i].result = 'incorrect';
      incorrect++;
    }
  }

  res.render('tests/result_test.ejs', {test,answers,subject,correct,incorrect,nonanswered} );
};

//GET /tests/:subject/:desc/solved
//Carga el test con sus respuestas correctas
exports.solvedTest = (req, res, next) => {
  const subject = req.params.subject;
  const testid = req.params.testid;

  Test.findByPk(testid, 
    {include: ['quizzes']}
  ).then(test => {
    res.render('tests/solved_test.ejs', {subject,test} );
  })
  .catch(error => {
    req.flash('error', 'Error showing subject tests: ' + error.message);
    next(error);
  });
};


//GET /newtest/:subject/
//Indicamos campos comunes del test: id, año, mes, descripción y número de preguntas. 
exports.addTestForm = (req, res, next) => {
  const subject = req.params.subject;
	res.render('tests/newtest.ejs', {subject} );
};


//POST /newtest/:subject/
//Indicamos campos comunes del test: id, año, mes, descripción y número de preguntas. 
exports.addTestQuestions = (req, res, next) => {
  const subject = req.params.subject;
  const testid = req.body.testid;
  const year = req.body.year;
  const month = req.body.month;
  const desc = req.body.desc;
  const npreg = req.body.npreg;
  const noptions = req.body.noptions;
	res.render('tests/addtest.ejs', {subject,testid,year,month,desc,npreg,noptions} );
};


//GET /edittest/:subject/:testid
//Devuelve el form para editar el test
exports.editTestForm = (req, res, next) => {
  const subject = req.params.subject;
  const testid = req.params.testid;

  Test.findByPk(testid, 
    {include: ['quizzes']}
  ).then(test => {
    let npreg = Object.keys(test.quizzes).length;
    
    res.render('tests/edittest.ejs', {subject,test,npreg} );
  })
  .catch(error => {
    req.flash('error', 'Error showing subject tests: ' + error.message);
    next(error);
  });
};


//POST /edittest/:subject/:testid
exports.editTest = (req, res, next) => {
  let test = [];

  const subject = req.params.subject;
  const testid = req.params.testid;

  const new_testid = req.body.testid;
  const desc = req.body.desc;
  const year = req.body.year;
  const month = req.body.month;

  const questions = req.body.question;
  const answers = req.body.answer;
  const answers1 = req.body.answer1;
  const answers2 = req.body.answer2;
  const answers3 = req.body.answer3;
  const answers4 = req.body.answer4;
  const answers5 = req.body.answer5;
  const answers6 = req.body.answer6;

  //Create test
  for (var i in questions){
    test_question = {
      subject: subject,
      desc: desc,
      testid: new_testid,
      year: year,
      month: month,
      question: questions[i],
      answer: Number(answers[i]),
      answer1: answers1[i],
      answer2: answers2[i],
      answer3: answers3[i],
      answer4: answers4[i],
      answer5: answers5[i],
      answer6: answers6[i]
    }
    test.push(test_question);
  }

  Quiz.destroy(
    {where: {
      testid: testid
    }
  })
  .then( () => {
    Quiz.bulkCreate(test)
		.then( () => {
			req.flash('success', 'Test updated succesfully');
			res.redirect('/tests/' + subject + '/' + new_testid + '/solved');
		})
		.catch(Sequelize.ValidationError, error => {
			req.flash('error', 'There are errors in the form:');
			error.errors.forEach(({message}) => req.flash('error', message));
			res.render('quizzes/new', {test});
		})
		.catch(error => {
			req.flash('error', 'Error updating the Quiz: ' + error.message);
			next(error);
		});
  })
  .catch(error => {
		req.flash('error', 'Error updating the Test: ' + error.message);
		next(error);
	});
};

//POST /addtest/:subject/
exports.addTest = (req, res, next) => {
  let test = [];

  N = 100;
  let empty_answers = new Array(N); 
  for (var i = 0; i < N; i++) empty_answers[i] = ''; 

  const subject = req.params.subject;
  const desc = req.body.desc;
  const testid = req.body.testid;
  const year = req.body.year;
  const month = req.body.month;
  const noptions = Number(req.body.noptions);

  const questions = req.body.question;
  const answers = req.body.answer;
  let answers1 = req.body.answer1; 
  let answers2 = req.body.answer2;
  let answers3 = req.body.answer3;
  let answers4 = req.body.answer4;
  let answers5 = req.body.answer5;
  let answers6 = req.body.answer6;

  if(noptions < 3){
    answers3 = empty_answers;
  }
  if(noptions < 4){
    answers4 = empty_answers;
  }
  if(noptions < 5){
    answers5 = empty_answers;
  }
  if(noptions < 6){
    answers6 = empty_answers;
  }

  //Create test
  for (var i in questions){
    test_question = {
      subject: subject,
      desc: desc,
      testid: testid,
      year: year,
      month: month,
      question: questions[i],
      answer: Number(answers[i]),
      answer1: answers1[i],
      answer2: answers2[i],
      answer3: answers3[i],
      answer4: answers4[i],
      answer5: answers5[i],
      answer6: answers6[i]
    }
    test.push(test_question);
  }

  Quiz.bulkCreate(test)
  .then( () => {
    req.flash('success', 'Test added succesfully');
    res.redirect('/tests/' + subject);
  })
  .catch(Sequelize.ValidationError, error => {
    req.flash('error', 'There are errors in the form:');
    error.errors.forEach(({message}) => req.flash('error', message));
    res.render('quizzes/new', {test});
  })
  .catch(error => {
    req.flash('error', 'Error adding the Quiz: ' + error.message);
    next(error);
  });
};

//DEL /tests/:subject/:testid
exports.deleteTest = (req, res, next) => {
  const subject = req.params.subject;
  const testid = req.params.testid;

  Quiz.destroy(
    {where: {
      testid: testid
    }
  })
  .then( () => {
    req.flash('success', 'Test deleted successfully.');
		res.redirect('/tests/' + subject);
	}).catch(error => {
		req.flash('error', 'Error deleting the Test: ' + error.message);
		next(error);
	});
};