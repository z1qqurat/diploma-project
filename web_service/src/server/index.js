
require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');

const authenticateToken = require('./middleware/authenticateToken');

const authRouter = require('./routes/authentication');
const calendarRouter = require('./routes/calendar');
const chatRouter = require('./routes/chat');
const newsRouter = require('./routes/news');
const ordersRouter = require('./routes/orders');
const scoreRouter = require('./routes/score');
const userRouter = require('./routes/user');


const app = express();

app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

app.use(cors({
  credentials: true,
  origin: "http://localhost:3000"
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static('dist'));

app.use('/auth', authRouter);
app.use('/calendar', authenticateToken, calendarRouter);
app.use('/chat', authenticateToken, chatRouter);
app.use('/news', authenticateToken, newsRouter);
app.use('/orders', authenticateToken, ordersRouter);
app.use('/score', authenticateToken, scoreRouter);
app.use('/user', authenticateToken, userRouter);

// Route not found
app.use(function(req, res, next){
    res.status(404);

    if (req.accepts('html')) {
      res.render('404', { url: req.url });
      return;
    }
    
    if (req.accepts('json')) {
      res.send({ error: 'Not found' });
      return;
    }
    
    res.type('txt').send('Not found');
  });

// Error handler
app.use((err, req, res, next) => {
    if (req.xhr) {
        res.status(500).send({ error: 'Something failed!' });
    } else {
        next(err);
    }
});

app.listen(process.env.PORT || 8080, () => console.log(`Listening on port ${process.env.PORT || 8080}!`));
