import * as express from 'express';
import * as path from 'path';
import * as dotenv from 'dotenv';
import * as cors from 'cors';
import * as parser from 'body-parser';
import hot from './server.development';
import render from './render';

dotenv.config();

const PORT = process.env.PORT;
const PROD = process.env.NODE_ENV === 'production';

const app: express.Application = express();

app.use(cors());
app.use(parser());

app.set('view engine', 'pug');

const listen = () =>
  app.listen(PORT, () => console.log(`Application is listening on ${PORT}`));

if (PROD) {
  app.set('views', path.resolve('./dist/templates'));
  app.use('/static', express.static('dist'));
} else {
  app.set('views', path.join(__dirname, '..', 'templates'));
  hot(app);
}

app.get('*', render(PROD));

listen();
