import { decode } from "cbor-x";
import ky, { AfterResponseHook, KyInstance, KyResponse, NormalizedOptions, Options } from "ky"

export class CborDecodingError extends Error {
  public readonly response: KyResponse;
  public readonly originalError?: Error;

  constructor(message: string, response: KyResponse, originalError?: Error) {
    super(message);
    this.name = 'CborDecodingError';
    this.response = response;
    this.originalError = originalError;
  }
}

export const cborDecodingHook: AfterResponseHook = async (
  request: Request, options: NormalizedOptions, response: KyResponse
): Promise<Response | undefined> => {
  const contentType = response.headers.get('Content-Type');

  if (contentType && contentType.toLowerCase().includes('application/cbor')) {
    const responseClone = response.clone();

    try {
      const arrayBuffer = await responseClone.arrayBuffer();

      if (arrayBuffer.byteLength === 0) {
        console.warn('Received empty CBOR body.');

        const emptyJsonBody = 'null';
        const headers = new Headers(response.headers);

        headers.set('Content-Type', 'application/json; charset=utf-8');

        return new Response(emptyJsonBody, {
          status: response.status,
          statusText: response.statusText,
          headers: headers,
        });
      }

      const decodedData: unknown = decode(new Uint8Array(arrayBuffer));
      const jsonBody = JSON.stringify(decodedData);
      const headers = new Headers(response.headers);

      headers.set('Content-Type', 'application/json; charset=utf-8');
      headers.delete('Content-Length');

      return new Response(jsonBody, {
        status: response.status,
        statusText: response.statusText,
        headers: headers,
      });
    } catch (err) {
      console.error('Failed to decode CBOR response body:', err);

      const decodeError = new CborDecodingError(
        `Failed to decode CBOR: ${err instanceof Error ? err.message : String(err)}`,
        response,
        err instanceof Error ? err : undefined
      );

      throw decodeError;
    }
  }

  return undefined;
};

export function createKyWithCborSupport(defaultOptions?: Options): KyInstance {
  const existingHooks = defaultOptions?.hooks ?? {};
  const existingAfterResponse = existingHooks.afterResponse ?? [];

  const kyInstance = ky.extend({
    ...defaultOptions,
    hooks: {
      ...existingHooks,
      afterResponse: [
        cborDecodingHook,
        ...existingAfterResponse
      ],
    },
  });

  return kyInstance;
}