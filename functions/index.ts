import { Hono } from 'hono';

export const apiApp = new Hono();
const apiRoute = apiApp.get('/title', (c) => {
  return c.json({ title: 'Hono RPC Mode' });
});

export type ApiRoute = typeof apiRoute;
