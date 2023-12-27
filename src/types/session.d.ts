import { Session } from 'koa-session';
import { User } from './User'; // Adjust the path based on your project structure

declare module 'koa-session' {
  interface Session {
    user?: User;
    userId?: string;
  }
}