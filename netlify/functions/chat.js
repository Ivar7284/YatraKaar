exports.handler = async (event, context) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  // Uses GROQ_API_KEY from environment variables (Netlify dashboard)
  const apiKey = process.env.GROQ_API_KEY;
  
  if (!apiKey) {
    console.error("GROQ_API_KEY is not set in environment variables");
    return { statusCode: 500, body: JSON.stringify({ error: 'API key not configured' }) };
  }

  try {
    const { history } = JSON.parse(event.body);

    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'llama-3.1-8b-instant',
        messages: history
      })
    });

    if (!response.ok) {
      console.error(`Groq API Error: ${response.status} ${response.statusText}`);
      const errText = await response.text();
      console.error("Details:", errText);
      return { statusCode: response.status, body: JSON.stringify({ error: 'Failed to communicate with AI provider' }) };
    }

    const data = await response.json();

    return {
      statusCode: 200,
      body: JSON.stringify({ reply: data.choices[0].message.content })
    };
  } catch (error) {
    console.error("Chatbot Error:", error);
    return { statusCode: 500, body: JSON.stringify({ error: 'Internal Server Error' }) };
  }
};
