import { Hono } from 'hono'
import { apply } from 'vike-server/hono'
import { serve } from 'vike-server/hono/serve'

async function startServer() {
  const app = new Hono()

  apply(app, {
    pageContext(runtime) {
      return {
        isAuth: runtime.isAuth,
        statusCode: runtime.statusCode
      }
    }
  })

  return serve(app, { port: import.meta.env.APP_PORT })
}

export default startServer()