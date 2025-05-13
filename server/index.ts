import { Hono } from 'hono'
import { apply } from 'vike-server/hono'
import { serve } from 'vike-server/hono/serve'
import { languageDetector } from 'hono/language'
import { consola } from "consola";
import { timing, startTime, endTime } from 'hono/timing'
import type { TimingVariables } from 'hono/timing'
import { createHonoCborEncodingMiddleware, HONO_SHOULD_ENCODE_CBOR_KEY } from './middlewares/cbor-middleware';
import { createPin, getHomefeedPins, getPin, getPinComments, getSimilarPinsByPin, getUserCollections, getUserPins, sendAnalytics } from './routes';

declare module 'hono' {
  interface ContextVariableMap {
    [HONO_SHOULD_ENCODE_CBOR_KEY]?: boolean;
  }
  interface Variables {
    Variables: TimingVariables
  }
}

async function startServer() {
  const app = new Hono()
    .use(
      timing(),
      languageDetector({ supportedLanguages: ['en', 'ru'], fallbackLanguage: 'ru', }),
      createHonoCborEncodingMiddleware({ encoderOptions: {} }),
    )
    .route("/experimental/v1", sendAnalytics)
    .route("/experimental/v1", createPin)
    .route("/experimental/v1", getUserCollections)
    .route("/experimental/v1", getPin)
    .route("/experimental/v1", getHomefeedPins)
    .route("/experimental/v1", getUserPins)
    .route("/experimental/v1", getSimilarPinsByPin)
    .route("/experimental/v1", getPinComments)

  apply(app, {
    pageContext(runtime) {
      consola.info(`Runtime`,
        JSON.stringify({
          // @ts-ignore
          isAuth: runtime.isAuth ?? null, statusCode: runtime.statusCode ?? null
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