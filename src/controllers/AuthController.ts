import { Context } from 'koa';
import pool from '../database/db';
import path from 'path';
import fs from 'fs';
import { User } from '../models/user';
import { encrypt } from '../services/encrypt.service';

class AuthController {
    async registrationPage(ctx: Context) {
        ctx.body = fs.readFileSync(path.join((__dirname + '/../../public/registration.html')), 'utf8');
    }

    async registration(ctx: Context) {
      try {
        const { fio, username, password } = ctx.request.body as User;
        const existingUser = await pool.query('SELECT * FROM users WHERE username = $1', [username]);
        if (existingUser.rows.length > 0) {
            ctx.status = 400;
            ctx.body = { message: 'Username already exists' };
          }
          const hashedPassword = encrypt(password);
          const result = await pool.query('INSERT INTO users (fio, username, password) VALUES ($1, $2, $3) RETURNING *', [
            fio,
            username,
            hashedPassword,
          ]);
        ctx.body = { message: 'Registration successful' };
        const newUser = result.rows[0] as User;
        if (ctx.session) {
            ctx.session.userId = newUser.id;
            ctx.session.user = newUser;
        }
        ctx.redirect('/protected');
      } catch (error: any) {
        ctx.status = 500;
        ctx.body = { error: 'Internal Server Error: ' + error.message };
      }
    }
  
    async loginPage(ctx: Context) {
        ctx.body = fs.readFileSync((path.join((__dirname + '/../../public/login.html'))), 'utf8');
    }

    async login(ctx: Context) {
      try {
        const { username, password } = ctx.request.body as User;
        const result = await pool.query('SELECT * FROM users WHERE username = $1', [username]);
        if (result.rows.length === 0 || result.rows[0].password !== encrypt(password)) {
          ctx.status = 401;
          ctx.body = { error: 'Invalid credentials' };
          return;
        }
        const newUser = result.rows[0] as User;
        console.log(newUser);
        if (ctx.session) {
            ctx.session.userId = newUser.id;
            ctx.session.user = newUser;
        }
        ctx.body = { message: 'Login successful' };
        ctx.redirect("/");
      } catch (error: any) {
        ctx.status = 500;
        ctx.body = { error: 'Internal Server Error: ' + error.message };
      }
    }

    async logout(ctx: Context) {
      ctx.session = null;
      ctx.redirect('/login');
    }
  }
  
  export default new AuthController();