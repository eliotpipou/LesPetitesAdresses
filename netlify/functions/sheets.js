export async function handler(event, context) {
  const API_URL = "https://script.google.com/macros/s/AKfycbwYHElqLtpwswgW0D0i7YATUI52yze_svOR8finL-ECum1gdQiVjgDI68-EK_D2MPqJ/exec";

  const options = {
    method: event.httpMethod,
    headers: { "Content-Type": "application/json" }
  };

  // Ajouter le body uniquement pour POST
  if (event.httpMethod === "POST") {
    options.body = event.body;
  }

  const response = await fetch(API_URL, options);
  const text = await response.text();

  return {
    statusCode: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers": "Content-Type",
      "Content-Type": "application/json"
    },
    body: text
  };
}
