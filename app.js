const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const compression = require('compression');

const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');
const cardRouter = require('./routes/cardRoutes');
const columnRouter = require('./routes/columnRoutes');
const columnOrderRouter = require('./routes/columnOrderRoutes');
const boardRouter = require('./routes/boardRoutes');
const userRouter = require('./routes/userRoutes');

const app = express();

// 1) MIDDLEWARES
app.use(cors());
app.use(compression());
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}
app.use(express.json());

//Routers
app.use('/api/v1/cards', cardRouter);
app.use('/api/v1/columns', columnRouter);
app.use('/api/v1/columnorder', columnOrderRouter);
app.use('/api/v1/boards', boardRouter);
app.use('/api/v1/users', userRouter);

// Handling all unhandled routes
app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
