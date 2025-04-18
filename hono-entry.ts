import { vikeHandler } from "./server/vike-handler";
import { Hono } from "hono";
import { createHandler } from "@universal-middleware/hono";

const app = new Hono();

app.all("*", createHandler(vikeHandler)());

export default app;