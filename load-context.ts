import { type PlatformProxy } from 'wrangler';

type Provider = "anthropic" | "gemini";

type Cloudflare = Omit<PlatformProxy<Env>, 'dispose'> & {
  provider?: Provider;
};

interface Context {
  cloudflare: Cloudflare;
  provider: Provider;
}

declare module '@remix-run/cloudflare' {
  interface AppLoadContext extends Context {
  }
}
