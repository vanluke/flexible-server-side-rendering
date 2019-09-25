import * as express from 'express';
import * as http from 'http';
import * as fs from 'fs';
import * as https from 'https';
import * as path from 'path';
import * as dotenv from 'dotenv';
import * as cors from 'cors';
import * as parser from 'body-parser';
import render from './render';
import hot from '../../server.development';

dotenv.config();

const PORT = process.env.PORT;
const PORT_HTTPS = process.env.PORT_HTTPS;
const USE_HTTPS = process.env.USE_HTTPS;
const PROD = process.env.NODE_ENV === 'production';

const app: express.Application = express();

app.use(cors());
app.use(parser.urlencoded({ extended: false }));
app.use(parser.json());

app.set('view engine', 'pug');

const listen = () => {
  if (!USE_HTTPS) {
    return http.createServer(app).listen(PORT, () =>
      // eslint-disable-next-line no-console
      console.log(`Application is listening on http://localhost:${PORT}`)
    );
  }
  return https
    .createServer(
      {
        key: fs.readFileSync(path.resolve('./certs/server.key')),
        cert: fs.readFileSync(path.resolve('./certs/server.crt')),
      },
      app
    )
    .listen(PORT_HTTPS, () =>
      // eslint-disable-next-line no-console
      console.log(
        `Application is listening on https://localhost:${PORT_HTTPS}`
      )
    );
};
if (PROD) {
  app.set('views', path.resolve('./dist/templates'));
  app.use('/static/', express.static(path.resolve('./dist/static')));
} else {
  app.set('views', path.join(__dirname, '..', 'templates'));
  hot(app);
}

app.get('*', render(PROD));

listen();
