import fastify from "fastify";
import { auth } from "./lib/auth.ts";
import fastifyCors from "@fastify/cors";
import { env } from "./env/index.ts";
import fastifySwagger from "@fastify/swagger";
import fastifySwaggerUi from "@fastify/swagger-ui";
import {
  validatorCompiler,
  serializerCompiler,
  type ZodTypeProvider
} from "fastify-type-provider-zod";
import routes from "./routes/index.ts";

const app = fastify({ logger: true }).withTypeProvider<ZodTypeProvider>();

// Configure CORS policies
app.register(fastifyCors, {
  origin: env.BETTER_AUTH_URL || "http://localhost:3000",
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
  credentials: true,
  maxAge: 86400
});

app.register(fastifySwagger, {
  openapi: {
    info: {
      title: "Task Manager",
      description: "",
      version: "1.0.0"
    }
  }
});

// Register the swagger UI plugin
app.register(fastifySwaggerUi, {
  routePrefix: "/docs"
});

app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);

// Configure Better Auth
app.route({
  method: ["GET", "POST"],
  url: "/api/auth/*",
  async handler(request, reply) {
    try {
      // Construct request URL
      const url = new URL(request.url, `http://${request.headers.host}`);

      // Convert Fastify headers to standard Headers object
      const headers = new Headers();
      Object.entries(request.headers).forEach(([key, value]) => {
        if (value) headers.append(key, value.toString());
      });
      // Create Fetch API-compatible request
      const req = new Request(url.toString(), {
        method: request.method,
        headers,
        ...(request.body ? { body: JSON.stringify(request.body) } : {})
      });
      // Process authentication request
      const response = await auth.handler(req);
      // Forward response to client
      reply.status(response.status);
      response.headers.forEach((value, key) => reply.header(key, value));
      reply.send(response.body ? await response.text() : null);
    } catch (error: any) {
      app.log.error("Authentication Error:", error);
      reply.status(500).send({
        error: "Internal authentication error",
        code: "AUTH_FAILURE"
      });
    }
  }
});

app.register(routes);

app.listen({ port: env.PORT, host: "0.0.0.0" }, () => {
  console.log("Server is running on port 3333");
});
