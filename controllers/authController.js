const User = require('../models/User');

exports.signup_get = (req, res) => {
    res.render('signup');
};

exports.signup_post = async (req, res) => {
    const { username, password }= req.body;
    try {
        const user = await User.create({ username, password });
        req.session.loggedIn = true;
        req.session.userId = user.id;
        req.flash('success_msg', 'You are now registered and can log in');
        res.redirect('/blog/dashboard');
    } catch (error) {
        console.error(error);
        req.flash('error_msg', 'Failed to register');
        res.redirect('/auth/signup');
    }
};

exports.login_get = (req, res) => {
    res.render('login');
};

exports.login_post = async (req, res) => {
    const { username, password } =req.body;
    try{
        const user = await User.findOne({ where: { username } });
        if(!user || user.password !== password) {
            req.flash('error_msg', 'Invalid username or password');
            res.redirect('/auth/login');
            return;
        }
        req.session.loggedIn = true;
        req.session.userId = user.id;
        req.flash('success_msg', 'Logged in successfully');
        res.redirect('/blog/dashboard');
    } catch (error) {
        console.error(error);
        req.flash('error_msg', 'Failed to login');
        res.redirect('/auth/login');
    }
};

exports.logout = (req, res) => {
    req.session.destroy(err => {
        if(err) {
            console.error(err);
            res.status(500).send('Internal Server Error');
            return;
        }
        res.redirect('/');
    });
};