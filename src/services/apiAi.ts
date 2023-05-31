interface ApiResponse {
  id: string
  object: string
  created: number
  model: string
  choices: Array<{
    text: string
    index: number
    logprobs: null
    finish_reason: string
  }>
  usage: {
    prompt_tokens: number
    completion_tokens: number
    total_tokens: number
  }
}

// OPENAI API_KEY from .env
const API_KEY: string = import.meta.env.VITE_API_KEY

export const askToIa = async (msg: string): Promise<string> => {
  try {
    const res: Response = await fetch('https://api.openai.com/v1/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${API_KEY}`
      },
      body: JSON.stringify({
        model: 'text-davinci-003',
        prompt: msg,
        max_tokens: 500,
        temperature: 0.3
      })
    })
    const data: ApiResponse = await res.json()

    return data.choices[0].text.trim()
  } catch (error) {
    console.log(error)
    return 'Its not possible answer right now'
  }
}
