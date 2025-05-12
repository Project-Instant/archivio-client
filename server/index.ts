import { Hono } from 'hono/tiny'
import { apply } from 'vike-server/hono'
import { serve } from 'vike-server/hono/serve'
import { languageDetector } from 'hono/language'
import { getConnInfo } from '@hono/node-server/conninfo'
import { consola } from "consola";

async function startServer() {
  const app = new Hono()

  app
    .use(
      languageDetector({ supportedLanguages: ['en', 'ru'], fallbackLanguage: 'ru', })
    )
    .on('GET', ["/", "/u/*", "/homefeed"], async (ctx, next) => {
      consola.info("Request",
        JSON.stringify({
          ...getConnInfo(ctx),
          lang: ctx.get("language")
        }, null, 2)
      );

      return await next()
    })

  apply(app, {
    pageContext(runtime) {
      consola.info(`Runtime`,
        JSON.stringify({
          isAuth: runtime.isAuth ?? null,
          statusCode: runtime.statusCode ?? null
        }, null, 2)
      )

      return {
        isAuth: null,
        statusCode: null
      }
    }
  })

  return serve(app, {
    port: import.meta.env.APP_PORT,
    onReady() {
      consola.success(`Server is ready on port ${import.meta.env.APP_PORT}`)
    },
  })
}

export default startServer()