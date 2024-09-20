import { generateText } from "ai"
import { createGoogleGenerativeAI } from "@ai-sdk/google"

const google = createGoogleGenerativeAI({
  apiKey: process.env.GOOGLE_GENERATIVE_AI_API_KEY,
})

export default async function page() {
  const model = google("gemini-1.5-pro-latest")
  const { text } = await generateText({
    model,
    prompt: "Meaning of friendship.",
  })

  return <div>{text}</div>
}
