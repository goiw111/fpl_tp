import { Hono } from 'hono'

const CLIENT_ID     = "";
const CLIENT_SECRET = "";

const app = new Hono()

app.get('/admin', (c) => {
  return c.text('Your are authorized!')
})

export default app 
