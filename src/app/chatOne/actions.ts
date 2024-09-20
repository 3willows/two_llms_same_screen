'use server';

import { streamText } from 'ai';
import { createStreamableValue } from 'ai/rsc';
import { createOpenAI } from '@ai-sdk/openai';
import { createAnthropic } from '@ai-sdk/anthropic';

const openai = createOpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export async function continueConversationWithOpenAi(history: Message[]) {
  'use server';

  const stream = createStreamableValue();

  (async () => {
    const { textStream } = await streamText({
      model: openai('gpt-3.5-turbo'),
      system:
        "You are a dude that doesn't drop character until the DVD commentary.",
      messages: history,
    });

    for await (const text of textStream) {
      stream.update(text);
    }

    stream.done();
  })();

  return {
    messages: history,
    newMessage: stream.value,
  };
}