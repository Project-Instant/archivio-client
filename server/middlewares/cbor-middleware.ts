import { encode, Options } from "cbor-x";
import { Context, Next } from "hono";
import { createMiddleware } from "hono/factory";

export const HONO_SHOULD_ENCODE_CBOR_KEY = 'honoShouldEncodeToCbor';

export const markHonoResponseForCbor = (ctx: Context) => ctx.set(HONO_SHOULD_ENCODE_CBOR_KEY, true)

export interface HonoCborMiddlewareOptions {
  encoderOptions?: Options;
  // default: ctx.get(HONO_SHOULD_ENCODE_CBOR_KEY) === true
  shouldEncode?: (ctx: Context) => boolean;
}

export const createHonoCborEncodingMiddleware = (options: HonoCborMiddlewareOptions) => {
  return createMiddleware(async (ctx, next) => {
    const encoderOpts = options?.encoderOptions;
    const customShouldEncode = options?.shouldEncode;

    async function cborEncodeMiddleware(ctx: Context, next: Next) {
      await next();

      if (!ctx.res || !(ctx.res instanceof Response) || !ctx.res.ok) {
        return;
      }

      const shouldEncodeThisResponse = customShouldEncode
        ? customShouldEncode(ctx)
        : ctx.get(HONO_SHOULD_ENCODE_CBOR_KEY) === true;

      if (shouldEncodeThisResponse) {
        const originalContentType = ctx.res.headers.get('Content-Type');

        if (originalContentType && originalContentType.toLowerCase().includes('application/json')) {
          try {
            const responseClone = ctx.res.clone();
            const jsonData = await responseClone.json();

            if (jsonData === undefined || jsonData === null) {
              const cborPayload = encode(null);
              const headers = new Headers(ctx.res.headers);

              headers.set('Content-Type', 'application/cbor');
              headers.set('Content-Length', cborPayload.length.toString());

              ctx.res = new Response(cborPayload, {
                status: ctx.res.status,
                statusText: ctx.res.statusText,
                headers: headers,
              });

              return;
            }

            const cborPayload: Uint8Array = encode(jsonData);

            const newHeaders = new Headers(ctx.res.headers);

            newHeaders.set('Content-Type', 'application/cbor');
            newHeaders.set('Content-Length', cborPayload.length.toString());

            ctx.res = new Response(cborPayload, {
              status: ctx.res.status,
              statusText: ctx.res.statusText,
              headers: newHeaders,
            });

          } catch (error) {
            console.error('CBOR encoding or JSON parsing error in Hono middleware:', error);

            if (!ctx.finalized) {
              ctx.res = ctx.json({ error: 'CBOR Encoding Failed', message: (error as Error).message }, 500);
            }
          }
        }
      }
    };

    return cborEncodeMiddleware(ctx, next);
  });
}