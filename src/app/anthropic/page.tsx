// need credits, leave for now.

import { createAnthropic } from "@ai-sdk/anthropic"
import { generateText } from "ai"

export default async function page() {
  const anthropic = createAnthropic({
    apiKey: process.env.ANTHROPIC_API_KEY,
  })

  const { text } = await generateText({
    model: anthropic("claude-3-haiku-20240307"),
    prompt: "Write a vegetarian lasagna recipe for 4 people.",
  })

  return <div>{text}</div>
}
