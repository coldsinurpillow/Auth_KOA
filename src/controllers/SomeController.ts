import { Context } from 'koa';
import pool from '../database/db';
import path from 'path';
import fs from 'fs';
import { User } from '../models/user';
import { encrypt } from '../services/encrypt.service';


class SomeController {
    async MainPage(ctx: Context) {
        ctx.body = fs.readFileSync(path.join((__dirname + '/../../public/index.html')), 'utf8');
    }

    async protectedPage(ctx: Context) {
        ctx.body = fs.readFileSync(path.join((__dirname + '/../../public/protected.html')), 'utf8');
    }
}

export default new SomeController();