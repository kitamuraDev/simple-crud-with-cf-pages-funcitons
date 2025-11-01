import { AngularAppEngine, createRequestHandler } from '@angular/ssr';
import { Hono } from 'hono';
import { apiApp } from '../functions/index';

const angularApp = new AngularAppEngine();

/**
 * This is a request handler used by the Angular CLI (dev-server and during build).
 */
export const reqHandler = createRequestHandler(async (req) => {
  // `/api` で始まるパスは functions(Hono) 側でハンドルする
  const url = new URL(req.url);
  if (url.pathname.startsWith('/api')) {
    const app = new Hono({ strict: false }).route('/api', apiApp);
    return await app.fetch(req);
  }

  const res = await angularApp.handle(req);
  return res ?? new Response('Page not found.', { status: 404 });
});

export default { fetch: reqHandler };
