import fetch from "node-fetch";

const OPENROUTER_URL = "https://openrouter.ai/api/v1/chat/completions";

export async function callLLM(systemPrompt, userMessage) {
  const response = await fetch(OPENROUTER_URL, {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
      "Content-Type": "application/json",
      "HTTP-Referer": "http://localhost:4000",
      "X-Title": "Yolo Chatbot Platform"
    },
    body: JSON.stringify({
      model: "mistralai/mistral-7b-instruct",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userMessage }
      ],
      temperature: 0.7
    })
  });

  if (!response.ok) {
    const errText = await response.text();
    throw new Error("OpenRouter error: " + errText);
  }

  const data = await response.json();
  return data.choices[0].message.content;
}
