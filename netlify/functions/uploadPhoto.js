exports.handler = async (event) => {
  try {
    const boundary = event.headers["content-type"].split("boundary=")[1];
    const bodyBuffer = Buffer.from(event.body, "base64");

    // Envoi direct du body multipart à Apps Script
    const response = await fetch("https://script.google.com/macros/s/AKfycbz609e_KsZN1ty6H1QVNfMNETkLXTjR3UhWWHTV2zCBjiJZWuM9p3yZYvWgXnFvy88p/exec", {
      method: "POST",
      headers: {
        "Content-Type": `multipart/form-data; boundary=${boundary}`
      },
      body: bodyBuffer
    });

    const data = await response.json();

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