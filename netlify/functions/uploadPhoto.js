exports.handler = async (event) => {
  try {
    const contentType = event.headers["content-type"];
    const boundary = contentType.split("boundary=")[1];

    const bodyBuffer = Buffer.from(event.body, "base64");

    const response = await fetch("https://script.google.com/macros/s/AKfycbz609e_KsZN1ty6H1QVNfMNETkLXTjR3UhWWHTV2zCBjiJZWuM9p3yZYvWgXnFvy88p/exec", {
      method: "POST",
      headers: {
        "Content-Type": `multipart/form-data; boundary=${boundary}`
      },
      body: bodyBuffer
    });

    // On lit d'abord en texte
    const text = await response.text();

    // Debug si Apps Script renvoie une page HTML
    if (text.startsWith("<")) {
      throw new Error("Apps Script a renvoyé du HTML : " + text.slice(0, 200));
    }

    const data = JSON.parse(text);

    return {
      statusCode: 200,
      body: JSON.stringify({ url: data.url })
    };

  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.toString() })
    };
  }
};
