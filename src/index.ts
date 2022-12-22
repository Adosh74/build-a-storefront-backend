import express, { Application, Request, Response } from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import errorMiddleware from './middleware/error.middleware';
import config from './config';
import db from './database';
import routes from './routes';

// console.log(config);

const PORT = config.port || 3000;

//server
const app: Application = express();

// middleware
app.use(morgan('common'));

// middleware for security
app.use(helmet());

// middleware for post requests
app.use(express.json());

// middleware for rate limit
app.use(
  rateLimit({
    windowMs: 60 * 1000, // 15 minutes
    max: 8, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
    message: 'Too many requests',
  })
);

// Routes

app.use('/api', routes);
app.get('/', (req: Request, res: Response) => {
  res.json({
    message: 'hello',
  });
});

app.use(errorMiddleware);

app.use((_request: Request, response: Response) => {
  response.status(404).json({
    message: 'please read the API documentation',
  });
});

app.listen(PORT, () => {
  console.log(`server is started at port ${PORT}`);
});

export default app;

// test database
// db.connect().then((client) => {
//   return client
//     .query('SELECT NOW()')
//     .then((res) => {
//       client.release();
//       console.log(res.rows);
//     })
//     .catch((err) => {
//       client.release();
//       console.log(err.stack);
//     });
// });
