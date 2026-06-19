const fetch = require("node-fetch");
const FormData = require("form-data");

exports.handler = async (event) => {
  try {
    const form = new FormData();

    const contentType = event.headers["content-type"];
    const body = Buffer.from(event.body, "base64");

    form.append("photo", body, {
      filename: "photo.jpg",
      contentType
    });

    const response = await fetch("https://script.google.com/macros/s/AKfycbxaB90SI6JPYHDlEd2D4uj4mSKVjyBGb3ATRljoU0fyHCXMTO29zytU8eNdYAII8N3N/exec", {
      method: "POST",
      body: form
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