const express = require('express');
const session = require('express-session');
const flash = require('connect-flash');
const sequelize = require('./config/database');
const authRoutes = require('./routes/authRoutes');
const blogRoutes = require('./routes/userRoutes');
const exphbs = require('express-handlebars');

const app = express();

app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

app.get('/', (req, res) => {
    res.render('homepage');
});

app.use(express.urlencoded({ extended: false }));

app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true,
}));

app.use(flash());

app.use((req, res, next) => {
    res.locals.loggedIn = req.session.loggedIn;
    next();
});

app.use('/auth', authRoutes);
app.use('/blog', blogRoutes);
app.use('/user', userRoutes);

sequelize.sync()
    .then(() => {
        app.listen(3001, () => console.log('Server running on port 3001'));
    })
    .catch(err => console.error('Error connecting to the database:', err));