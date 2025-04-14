const fetch = require('node-fetch');

const NASA_API_KEY = "DEMO_KEY";
const WEBHOOK_URL = "https://webhook.site/52b572f0-fdb1-4954-89dd-f2ae8ad02cea";

async function connectApis() {
  try {
    const nasaRes = await fetch(`https://api.nasa.gov/planetary/apod?api_key=${NASA_API_KEY}`);
    const nasaData = await nasaRes.json();

    const payload = {
      title: nasaData.title,
      date: nasaData.date,
      image_url: nasaData.url,
      explanation: nasaData.explanation
    };

    const webhookRes = await fetch(WEBHOOK_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    if (webhookRes.ok) {
      console.log("✅ Sent to webhook");
    } else {
      console.error("❌ Webhook error:", webhookRes.status);
    }
  } catch (err) {
    console.error("🔥 Error:", err);
  }
}

connectApis();
