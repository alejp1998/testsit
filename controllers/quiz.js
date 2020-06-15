const Sequelize = require('sequelize');
const {models} = require("../models");
const Op = Sequelize.Op;
const paginate = require('../helpers/paginate').paginate;
var ssn;


//Autoload quiz asociado a :quizId
exports.load = (req, res, next, quizId) => {

    const options = {
        include: [
            {model: models.user, as: 'author'}
        ]
    };

    models.quiz.findByPk(quizId, options)
    .then(quiz => {
        if (quiz) {
            req.quiz = quiz;
            next();
        } else {
            throw new Error('There is no quiz with id=' + quizId);
        }
    })
    .catch(error => next(error));
};

// MW that allows actions only if the user logged in is admin or is the author of the quiz.
exports.adminOrAuthorRequired = (req, res, next) => {

    const isAdmin  = !!req.session.user.isAdmin;
    const isAuthor = req.quiz.authorId === req.session.user.id;

    if (isAdmin || isAuthor) {
        next();
    } else {
        console.log('Prohibited operation: The logged in user is not the author of the quiz, nor an administrator.');
        res.send(403);
    }
};


// GET /quizzes
exports.index = (req, res, next) => {

	let countOptions = {
        where: {}
    };
	let title = '';

	//Search quizzes
	const search = req.query.search || '';
	if(search){
		if(search==='choice'){
			countOptions.where = {choice: true};
		}else{
			//Normalizamos texto sustituyendo los blancos por %
			const search_like = "%" + search.replace(/ +/g,"%") + "%";
			//Creamos la expresion de la busqueda
			countOptions.where = {question: { [Op.like]: search_like}};
		}

	}

	if(req.user && search!='friends'){
		countOptions.where.authorId = req.user.id;
		title = req.user.username + "'s Quizzes";
	}

	//Si no hemos buscado nada, muestra todos los quizzes
    models.quiz.count(countOptions)
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

		return models.quiz.findAll(findOptions);
    }).then(quizzes => {
    	res.render('quizzes/index.ejs',{quizzes,search,title});
	})
    .catch(error => next(error));
};


//GET /quizzes/primero
exports.primero = (req, res, next) => {
	res.render('tests/primero.ejs');
};

//GET /quizzes/segundo
exports.segundo = (req, res, next) => {
	res.render('tests/segundo.ejs');
};

//GET /quizzes/tercero
exports.tercero = (req, res, next) => {
	res.render('tests/tercero.ejs');
};

//GET /quizzes/cuarto
exports.cuarto = (req, res, next) => {
	res.render('tests/cuarto.ejs');
};

//GET /tests/:subject
//Cargar todos los quizzes que pertenezcan a una asignatura, y,
//a partir de ellos formar un array que contenga todas las distintas
//descripciones de estos, que se mostrarán en una lista.
exports.subjectTests = (req, res, next) => {
  const subject = req.params.subject;
  let descs = [];
  models.quiz.findAll({
    where: {subject: subject}
  }).then(quizzes => {
    for (var i in quizzes){
      if (!descs.includes(quizzes[i].desc)){
        descs.push(quizzes[i].desc)
      }
    }
    res.render('tests/subject_tests.ejs', {subject,descs} );
  }).catch(error => {
    req.flash('error', 'Error showing subject tests: ' + error.message);
    next(error);
  });
};



//GET /tests/:subject/:desc
//Se deben precargar todas las preguntas que pertenezcan a una descripción y
//asignatura en una lista, que se deberá mostrar posteriormente como si de un
//test de moodle se tratase, para finalmente ser corregidas
exports.playTest = (req, res, next) => {
  const subject = req.params.subject;
  const desc = req.params.desc;
  let test = [];
  models.quiz.findAll({
    where: {subject: subject,
            desc: desc},
    order: [Sequelize.fn( 'RANDOM' ),]
  }).then(questions => {
    test = questions;
    req.session.test = test;
    res.render('tests/play_test.ejs', {subject,desc,test} );
  }).catch(error => {
    req.flash('error', 'Error showing subject tests: ' + error.message);
    next(error);
  });
};


//GET /tests/:subject/:desc/solved
//Carga el test con sus respuestas correctas
exports.solvedTest = (req, res, next) => {
  const subject = req.params.subject;
  const desc = req.params.desc;
  let test = [];
  models.quiz.findAll({
    where: {subject: subject,
            desc: desc},
    order: [Sequelize.fn( 'RANDOM' ),]
  }).then(questions => {
    test = questions;
    req.session.test = test;
    res.render('tests/solved_test.ejs', {subject,desc,test} );
  }).catch(error => {
    req.flash('error', 'Error showing subject tests: ' + error.message);
    next(error);
  });
};


//PUT /tests/:subject/:desc
//Se encarga de comprobar que las preguntas del tests son correctas, incorrectas, o no contestadas;
//a partir del array del test guardado como dato de la sesion, debe dar paso a una vista donde se muestren
//las preguntas en rojo si hemos fallado y en verde si acertamos, la puntuación total etc
exports.checkTest = (req, res, next) => {
  const test = req.session.test;
  const subject = req.params.subject;
  const desc = req.params.desc;
  let correct = 0;
  let incorrect = 0;
  let nonanswered = 0;


  //Creamos array que obtiene las respuestas que hemos dado del quiz
  let answers = [];
  if(req.body.answer1){
    answers.push(req.body.answer1);
  }else{
    answers.push('');
  }
  if(req.body.answer2){
    answers.push(req.body.answer2);
  }else{
    answers.push('');
  }
  if(req.body.answer3){
    answers.push(req.body.answer3);
  }else{
    answers.push('');
  }
  if(req.body.answer4){
    answers.push(req.body.answer4);
  }else{
    answers.push('');
  }
  if(req.body.answer5){
    answers.push(req.body.answer5);
  }else{
    answers.push('');
  }
  if(req.body.answer6){
    answers.push(req.body.answer6);
  }else{
    answers.push('');
  }
  if(req.body.answer7){
    answers.push(req.body.answer7);
  }else{
    answers.push('');
  }
  if(req.body.answer8){
    answers.push(req.body.answer8);
  }else{
    answers.push('');
  }
  if(req.body.answer9){
    answers.push(req.body.answer9);
  }else{
    answers.push('');
  }
  if(req.body.answer10){
    answers.push(req.body.answer10);
  }else{
    answers.push('');
  }
  if(req.body.answer11){
    answers.push(req.body.answer11);
  }else{
    answers.push('');
  }
  if(req.body.answer12){
    answers.push(req.body.answer12);
  }else{
    answers.push('');
  }
  if(req.body.answer13){
    answers.push(req.body.answer13);
  }else{
    answers.push('');
  }
  if(req.body.answer14){
    answers.push(req.body.answer14);
  }else{
    answers.push('');
  }
  if(req.body.answer15){
    answers.push(req.body.answer15);
  }else{
    answers.push('');
  }
  if(req.body.answer16){
    answers.push(req.body.answer16);
  }else{
    answers.push('');
  }
  if(req.body.answer17){
    answers.push(req.body.answer17);
  }else{
    answers.push('');
  }
  if(req.body.answer18){
    answers.push(req.body.answer18);
  }else{
    answers.push('');
  }
  if(req.body.answer19){
    answers.push(req.body.answer19);
  }else{
    answers.push('');
  }
  if(req.body.answer20){
    answers.push(req.body.answer20);
  }else{
    answers.push('');
  }
  if(req.body.answer21){
    answers.push(req.body.answer21);
  }else{
    answers.push('');
  }
  if(req.body.answer22){
    answers.push(req.body.answer22);
  }else{
    answers.push('');
  }
  if(req.body.answer23){
    answers.push(req.body.answer23);
  }else{
    answers.push('');
  }
  if(req.body.answer24){
    answers.push(req.body.answer25);
  }else{
    answers.push('');
  }
  if(req.body.answer25){
    answers.push(req.body.answer25);
  }else{
    answers.push('');
  }
  if(req.body.answer26){
    answers.push(req.body.answer26);
  }else{
    answers.push('');
  }
  if(req.body.answer27){
    answers.push(req.body.answer27);
  }else{
    answers.push('');
  }
  if(req.body.answer28){
    answers.push(req.body.answer28);
  }else{
    answers.push('');
  }
  if(req.body.answer29){
    answers.push(req.body.answer29);
  }else{
    answers.push('');
  }
  if(req.body.answer30){
    answers.push(req.body.answer30);
  }else{
    answers.push('');
  }

  for(var i in test){
    if(answers[i] === ''){
      test[i].result = 'nonanswered';
      nonanswered++;
    }else if( Number(test[i].answer) === Number(answers[i]) ){
      test[i].result = 'correct';
      correct++;
    }else if( Number(test[i].answer) !== Number(answers[i]) ){
      test[i].result = 'incorrect';
      incorrect++;
    }
  }

  res.render('tests/result_test.ejs', {test,answers,subject,desc,correct,incorrect,nonanswered} );
};



//GET /quizzes/:quizId/play
exports.playQuiz = (req, res, next) => {
	const quiz = req.quiz;
	if(!quiz){
		res.render(`El quiz ${req.params.quizId} no existe.`);
	}else{
		res.render('quizzes/play.ejs', {quiz} );
	}
};

//PUT /quizzes/:quizId/check
exports.checkQuiz = (req, res, next) => {
	let result;
	const quiz = req.quiz;
	const answer = req.body.answer;
	if(!quiz){
		return res.render(`El quiz ${req.params.quizId} no existe.`);
	}
	if(Number(quiz.answer) === Number(answer)){
		result = "Correct";
	}else{
		result = "Incorrect" + answer;
	}

	if(req.session.user){
		const userId = req.session.user.id;
		models.user.findByPk(userId)
		.then(user => {
			if(result === "Correct"){
				user.points++;
			}else{
				user.fails++;
			}
			req.session.user = user;
			user.save({fields: ["points","fails"]})
			.then( () => res.render('quizzes/check.ejs', {quiz,result} ));
		});
	}else{
		return res.render('quizzes/check.ejs', {quiz,result} );
	}
};

//GET /quizzes/:quizId/edit
exports.editQuiz = (req, res, next) => {
	const quiz = req.quiz;
	if(!quiz){
		res.render(`El quiz ${req.params.quizId} no existe.`);
	}else{
		res.render('quizzes/edit.ejs', {quiz} );
	}
};

//PUT /quizzes/:quizId
exports.updateQuiz = (req, res, next) => {
	const id = req.quiz.id;
	var quiz = req.body;
	quiz.id = id;
	const {course,subject,desc,answer,answer1,answer2,answer3,answer4} = quiz;

	if(Number(answer)<=4 && Number(answer)>=1){
		models.quiz.update( quiz, { where: {id} } )
		.then(() => {
			req.flash('success','Quiz updated succesfully');
			res.redirect('/quizzes');
		}).catch(Sequelize.ValidationError, error => {
			req.flash('error','There are errors in the form:');
			error.errors.forEach(({message}) => req.flash('error',message));
			res.render('quizzes/edit',{quiz});
		}).catch(error => {
			req.flash('error','Error updating the quiz: '+ error.message);
			next(error);
		});
	}else{
		req.flash('error','Errors in choice answers');
		res.render('quizzes/edit',{quiz});
	}
};

//GET /quizzes/:quizId
exports.showQuiz = (req, res, next) => {
	const {quiz} = req;
  const answers = [quiz.answer1,quiz.answer2,quiz.answer3,quiz.answer4];
  const answer = answers[quiz.answer-1]
	res.render('quizzes/show.ejs', {quiz,answer} );
};

//GET /quizzes/new
exports.newQuiz = (req, res, next) => {
	const quiz = {question: '', answer: '', answer1: '', answer2: '', answer3: '', answer4: ''};
	res.render('quizzes/new.ejs',{quiz});
};

//POST /quizzes/
exports.addQuiz = (req, res, next) => {
	const {course,subject,desc,question,answer,answer1,answer2,answer3,answer4} = req.body;

	const authorId = req.session.user && req.session.user.id || 0;

	const quiz = {course,subject,desc,question,answer,answer1,answer2,answer3,authorId};

	models.quiz.create(quiz)
		.then(() => {
			req.flash('success', 'Quiz added succesfully');
			res.redirect('/quizzes');
		})
		.catch(Sequelize.ValidationError, error => {
			req.flash('error', 'There are errors in the form:');
			error.errors.forEach(({message}) => req.flash('error', message));
			res.render('quizzes/new', {quiz});
		})
		.catch(error => {
			req.flash('error', 'Error adding the Quiz: ' + error.message);
			next(error);
		});
};


//DELETE /quizzes/:quizId
exports.deleteQuiz = (req, res, next) => {
	const quiz = req.quiz;
	quiz.destroy()
	.then(() => {
		req.flash('success', 'Quiz deleted successfully.');
		res.redirect('/goback');
	}).catch(error => {
		req.flash('error', 'Error deleting the Quiz: ' + error.message);
		next(error);
	});
};

//GET /quizzes/randomplay
exports.randomPlay = (req,res,next) => {
	ssn = req.session;
	ssn.score = ssn.score || 0;
	if(!ssn.score){
		ssn.randomPlay = [];
	}

	models.quiz.count()
	.then( (count) => {
		req.session.nquizzes = count;
		models.quiz.findOne({
			where: {id: {[Op.notIn]: ssn.randomPlay}},
			order: [Sequelize.fn( 'RANDOM' ),]
		}).then(quiz => {
			const score = ssn.score;
			if(!quiz){
				ssn.score = 0;
				return res.render('quizzes/random_nomore.ejs', {score} );
			}else{
				return res.render('quizzes/random_play.ejs', { quiz , score} );
			}
		});
	}).catch(error => {
		req.flash('error', 'Error asking next question: ' + error.message);
		next(error);
	});

};

//GET /quizzes/randomcheck/:quizId
exports.randomCheck = (req, res, next) => {
	ssn = req.session;
	const answer = req.body.answer;
	const quiz = req.quiz;
	let score = ssn.score;

	let result = false;

	if(!answer){
		req.flash('error','Answer empty');
		return res.render('quizzes/random_play.ejs',{ quiz , score});
	}

	if(answer.toLowerCase().trim()===quiz.answer.toLowerCase().trim()){
		result = true;
		ssn.score++;
		score++;
		ssn.randomPlay.push(quiz.id);
	}

	if(req.session.user){
		if(!result){
			ssn.score = 0;
			const userId = req.session.user.id;
			models.user.findByPk(userId)
			.then(user => {
				user.fails++;
				req.session.user = user;
				user.save({fields: ["points","fails"]})
				.then( () => res.render('quizzes/random_result.ejs', {result,score,answer} ));
			});
		}else{
			const userId = req.session.user.id;
			models.user.findByPk(userId)
			.then(user => {
				user.points++;
				req.session.user = user;
				user.save({fields: ["points","fails"]})
				.then( () => res.render('quizzes/random_result.ejs', {result,score,answer} ));
			});
		}
	}else{
		if(!result){
			ssn.score = 0;
		}
		return res.render('quizzes/random_result.ejs', {result,score,answer} );
	}


};
