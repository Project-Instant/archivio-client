// @ts-check

function isErrorMessageObject(value: unknown): value is { message: string }  {
  return Boolean(
    value && typeof value === 'object' && "message" in value,
  );
}

function fromMessageObject(value: unknown): Error | null {
  if (isErrorMessageObject(value)) {
    const error = new Error(value.message);
    return Object.assign(error, value);
  } else {
    return null;
  }
}

function isObject(value: unknown): value is {} {
  return value !== null && typeof value === "object";
}

function fromResponse(value: unknown): Error | null {
  if (value instanceof Response) {
    const message = `${value.status} ${value.statusText}`;
    return new Error(message);
  } else {
    return null;
  }
}

function fromPrimitiveType(value: unknown, fallback: Error): Error | null {
  if (value == null) {
    return fallback;
  }
  if (typeof value === "string") {
    return new Error(value);
  } else if (Array.isArray(value) || typeof value !== "object") {
    return fallback;
  } else {
    return null;
  }
}

function fromKnownErrorInstance(value: unknown): Error | null {
  if (value instanceof Error) {
    return value;
  } else {
    return null;
  }
}

function fromRpcObject(value: unknown, fallback: Error): Error | null  {
  if (isObject(value) && "error" in value) {
    return (
      fromPrimitiveType(value.error, fallback) || fromMessageObject(value.error)
    );
  } else {
    return null;
  }
}

export function getError(value: Error | unknown, fallback = new Error("Unknown Error")): Error{
  return (
    fromPrimitiveType(value, fallback) ||
    fromKnownErrorInstance(value) ||
    fromResponse(value) ||
    fromMessageObject(value) ||
    fromRpcObject(value, fallback) ||
    fallback
  );
}