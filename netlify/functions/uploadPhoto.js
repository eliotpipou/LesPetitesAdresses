exports.handler = async (event) => {
  try {
    const boundary = event.headers["content-type"].split("boundary=")[1];
    const bodyBuffer = Buffer.from(event.body, "base64");

    // Envoi direct du body multipart à Apps Script
    const response = await fetch("https://script.google.com/macros/s/AKfycbxaB90SI6JPYHDlEd2D4uj4mSKVjyBGb3ATRljoU0fyHCXMTO29zytU8eNdYAII8N3N/exec", {
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