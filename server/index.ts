import { Hono } from 'hono'
import { apply } from 'vike-server/hono'
import { serve } from 'vike-server/hono/serve'
import { languageDetector } from 'hono/language'
import { consola } from "consola";
import { timing } from 'hono/timing'
import type { TimingVariables } from 'hono/timing'
import { createHonoCborEncodingMiddleware, HONO_SHOULD_ENCODE_CBOR_KEY } from './middlewares/cbor-middleware';
import {
  createPin,
  getHomefeedPins,
  getPin,
  getPinComments,
  getRepostReasons,
  getSearchedTags,
  getSimilarPinsByPin,
  getUserCollections,
  getUserFollowers,
  getUserPins,
  sendAnalytics
} from './routes';
import { logger } from "hono/logger"
import { getMinioClient, initMinio } from './minio';
import { showRoutes } from "hono/dev"
import { createMiddleware } from 'hono/factory';

declare module 'hono' {
  interface ContextVariableMap {
    [HONO_SHOULD_ENCODE_CBOR_KEY]?: boolean;
  }
  interface Variables {
    Variables: TimingVariables
  }
}

const getMinioFiles = new Hono()
  .get("/minio/get-buckets", async (ctx) => {
    const minio = await getMinioClient()

    const list = await minio.listBuckets()

    return ctx.json({ data: list }, 200)
  })

const experimentalRoutes = new Hono()
  .basePath("/experimental/v1")
  .route("/", sendAnalytics)
  .route("/", createPin)
  .route("/", getUserCollections)
  .route("/", getPin)
  .route("/", getHomefeedPins)
  .route("/", getUserPins)
  .route("/", getSimilarPinsByPin)
  .route("/", getPinComments)
  .route("/", getRepostReasons)
  .route("/", getSearchedTags)
  .route("/", getUserFollowers)
  .route("/", getMinioFiles)

const loggerMiddleware = createMiddleware(async (ctx, next) => {
  import.meta.env.PROD && logger()

  await next()
})

async function startServer() {
  const app = new Hono()
    .use(
      loggerMiddleware,
      timing(),
      languageDetector({ supportedLanguages: ['en', 'ru'], fallbackLanguage: 'ru', }),
      createHonoCborEncodingMiddleware({ encoderOptions: {} }),
    )
    .route("/", experimentalRoutes)

  apply(app, {
    pageContext(runtime) {
      // @ts-ignore
      consola.info(`Runtime`, runtime.isAuth, runtime.statusCode)

      return {
        isAuth: null,
        statusCode: null
      }
    }
  })

  initMinio()

  showRoutes(app)

  return serve(app, {
    port: import.meta.env.APP_PORT,
    onReady() {
      consola.success(`Server is ready on port ${import.meta.env.APP_PORT}`)
    },
  })
}

export default startServer()