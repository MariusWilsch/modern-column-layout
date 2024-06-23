import Anthropic from "@anthropic-ai/sdk";

const anthropic = new Anthropic({
  apiKey: "my_api_key", // defaults to process.env["ANTHROPIC_API_KEY"]
});

export async function call_claude(system_prompt, user_prompt) {
  const response = await anthropic.messages.create({
    model: "claude-3-5-sonnet-20240620",
    max_tokens: 1024,
    system: system_prompt,
    messages: [{ role: "user", content: user_prompt }],
  });
  return response.content[0].text;
}
