// Middleware: Login required
exports.loginRequired = (req, res, next) => {
    if (req.session.user) {
        next();
    } else {
        req.flash('error','Ruta no permitida: por favor inicia sesión');
        res.redirect('/login');
    }
};


// MW that allows to pass only if the logged useer in is admin.
exports.adminRequired = (req, res, next) => {
    if (!req.session.user) {
        req.flash('error','Ruta no permitida: por favor inicia sesión');
        res.redirect('/login');
    } else {
        const isAdmin = !!req.session.user.isAdmin;
        if (isAdmin) {
            next();
        } else {
            console.log('Prohibited route: the logged in user is not an admin.');
            res.send(403);
        }
    }
};

// MW that allows to pass only if the logged useer in is admin.
exports.adminOrEditorRequired = (req, res, next) => {
    if (!req.session.user) {
        req.flash('error','Ruta no permitida: por favor inicia sesión');
        res.redirect('/login');
    } else {
        const isAdmin = !!req.session.user.isAdmin;
        const isEditor = !!req.session.user.isEditor;
        if (isAdmin || isEditor) {
            next();
        } else {
            console.log('Prohibited route: the logged in user is not an admin or an editor.');
            res.send(403);
        }
    }
};

// MW that allows to pass only if the logged in user is:
// - the user to manage.
exports.myselfRequired = (req, res, next) => {

    const isMyself = req.user.id === req.session.user.id;

    if (isMyself) {
        next();
    } else {
        console.log('Forbidden route: is not the user logged.');
        res.send(403);    }
};

// MW that allows to pass only if the logged in user is:
// - admin
// - or is the user to be managed.
exports.adminOrMyselfRequired = (req, res, next) => {

    const isAdmin  = !!req.session.user.isAdmin;
    const isMyself = req.user.id === req.session.user.id;

    if (isAdmin || isMyself) {
        next();
    } else {
        console.log('Prohibited route: it is not the logged in user, nor an administrator.');
        res.send(403);
    }
};

// MW that allows to pass only if the logged in user is:
// - admin
// - and is not the user to manage.
exports.adminAndNotMyselfRequired = function(req, res, next){

    const isAdmin   = req.session.user.isAdmin;
    const isAnother = req.user.id !== req.session.user.id;

    if (isAdmin && isAnother) {
        next();
    } else {
        console.log('Prohibited route: the user is logged or is not an administrator.');
        res.send(403);    }
};