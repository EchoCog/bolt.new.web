import { createAnthropic } from '@ai-sdk/anthropic';
import { geminiClient } from 'app/utils/gemini.server';

export function getAnthropicModel(apiKey: string) {
  const anthropic = createAnthropic({
    apiKey,
  });

  return anthropic('claude-3-5-sonnet-20240620');
}

export function getGeminiModel() {
  return geminiClient;
}