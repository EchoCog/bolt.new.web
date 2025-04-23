declare module "remix:*" {
  export * from "remix/dist/index";
}

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      ANTHROPIC_API_KEY: string;
      GEMINI_API_KEY: string;
      VITE_LOG_LEVEL: string;
    }
  }
}