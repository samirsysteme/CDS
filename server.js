const express = require('express');
const cors = require('cors');
const { OpenAI } = require('openai');

const app = express();
const PORT = 3000;

const openai = new OpenAI({
  apiKey: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 'ضع_مفتاحك_الخاص_هنا' // ⚠️ ضع مفتاح API الخاص بك من OpenAI هنا
});

app.use(cors());
app.use(express.json());

app.post('/rewrite', async (req, res) => {
  const userScript = req.body.script;

  if (!userScript) {
    return res.status(400).json({ error: 'يرجى إرسال نص القصة' });
  }

  const prompt = `
I want you to analyze the structure, pacing, twists, and storytelling style of the script I just pasted.
Then, rewrite a completely original version of it in the same style, keeping the same energy, emotional beats, and twist order that make it engaging and viral.
Make the tone feel fresh, human, and natural, like it's being told by a great storyteller. Add subtle changes so it feels unique and not copied, but still delivers the same impact and flow.
Think of it like a remix, same vibe, same structure, but new words, new flavor.
Here’s the original script:
${userScript}
`;

  try {
    const completion = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.9
    });

    const rewritten = completion.choices[0].message.content;
    res.json({ rewritten });

  } catch (err) {
    console.error('OpenAI error:', err.message);
    res.status(500).json({ error: 'حدث خطأ أثناء الاتصال بـ OpenAI' });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
