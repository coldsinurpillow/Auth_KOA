require('dotenv').config();
import { executeSQL } from './database/db';
import Koa from 'koa';
import router from './routes';
import path from 'path';
import  bodyParser from 'koa-bodyparser';
import session from 'koa-session';
import koaStatic from 'koa-static';

const app = new Koa();
app.keys = [process.env.SECRET_KEY || 'default-secret-key'];

const PORT = process.env.PORT || 5000;

app.use(session(app));
app.use(koaStatic(path.join(__dirname, 'public')));

const createUserTableSQL = `
CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  fio VARCHAR(255) NOT NULL,
  username VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL
);
`;

executeSQL(createUserTableSQL);

app.use(bodyParser());
app.use(router.routes());
app.use(router.allowedMethods())

app.listen(PORT, () => {
  console.log(`Listening on http://localhost:${PORT}`);
});