namespace NodeJS {
  interface ProcessEnv {
    PORT: number,
    NODE_ENV: "production" | "development" | "test",
    LOG_LEVEL: "log" | "info" | "debug" | "warn" | "error"

    // other database, jwt, redis
  }
}
