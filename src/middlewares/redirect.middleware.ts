import { Context, Next } from "koa";

export const checkAuthorization = async (ctx: Context, next: Next) => {
  const isAuthenticated = ctx.session && ctx.session.userId;
  if (isAuthenticated) {
    await next();
  } else {
    ctx.redirect('/login');
  }
};