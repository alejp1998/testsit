"use strict";
const Sequelize = require('sequelize');
const {models} = require("../models");
const Op = Sequelize.Op;
const paginate = require('../helpers/paginate').paginate;
var ssn;

const {User,Subject,Test,Quiz} = models;


//Autoload quiz asociado a :quizId
exports.load = (req, res, next, quizId) => {

    const options = {
        include: [
            {model: User, as: 'author'}
        ]
    };

    Quiz.findByPk(quizId, options)
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
    Quiz.count(countOptions)
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

    return Quiz.findAll(findOptions);
    }).then(quizzes => {
      res.render('quizzes/index.ejs',{quizzes,search,title});
    })
    .catch(error => next(error));
};




//GET /quizzes/:quizId/play
exports.playQuiz = (req, res, next) => {
  const quiz = req.quiz;
  const testid = quiz.testid
  const subject = quiz.subject;
  const desc = quiz.desc;

	if(!quiz){
		res.render(`El quiz ${req.params.quizId} no existe.`);
	}else{
		res.render('quizzes/play.ejs', {quiz,subject,testid,desc} );
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
		result = "Incorrect";
	}

	if(req.session.user){
		const userId = req.session.user.id;
    User.findByPk(userId)
		.then(user => {
			if(result === "Correct"){
				user.points++;
			}else{
				user.fails++;
      }
      
			req.session.user = user;
			user.save({fields: ["points","fails"]})
      .then( () => 
        res.render('quizzes/check.ejs', {quiz,result} 
      ));
		});
	}else{
		return res.render('quizzes/check.ejs', {quiz,result} );
	}
};

//GET /quizzes/:quizId/edit
exports.editQuiz = (req, res, next) => {
  const quiz = req.quiz;
  const testid = quiz.testid;
  const subject = quiz.subject;
  const desc = quiz.desc;
  
	if(!quiz){
		res.render(`El quiz ${req.params.quizId} no existe.`);
	}else{
		res.render('quizzes/edit.ejs', {quiz,subject,testid,desc} );
	}
};

//PUT /quizzes/:quizId
exports.updateQuiz = (req, res, next) => {
	const id = req.quiz.id;
	var quiz = req.body;
	quiz.id = id;
	const {course,subject,desc,answer,answer1,answer2,answer3,answer4,answer5,answer6} = quiz;

	if(Number(answer)<=6 && Number(answer)>=1){
		Quiz.update( quiz, { where: {id} } )
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
	res.render('quizzes/show.ejs', {quiz} );
};

//GET /quizzes/new
exports.newQuiz = (req, res, next) => {
	const quiz = {question: '', answer: '', answer1: '', answer2: '', answer3: '', answer4: '', answer5: '', answer6: ''};
	res.render('quizzes/new.ejs',{quiz});
};

//POST /quizzes/
exports.addQuiz = (req, res, next) => {
	const {course,testid,subject,desc,question,answer,answer1,answer2,answer3,answer4,answer5,answer6} = req.body;

	const authorId = req.session.user && req.session.user.id || 0;

	const quiz = {course,testid,subject,desc,question,answer,answer1,answer2,answer3,answer4,answer5,answer6,authorId};

	Quiz.create(quiz)
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

	Quiz.count()
	.then( (count) => {
		req.session.nquizzes = count;
		Quiz.findOne({
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
			User.findByPk(userId)
			.then(user => {
				user.fails++;
				req.session.user = user;
				user.save({fields: ["points","fails"]})
				.then( () => res.render('quizzes/random_result.ejs', {result,score,answer} ));
			});
		}else{
			const userId = req.session.user.id;
		  User.findByPk(userId)
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
