{\rtf1\ansi\ansicpg1252\cocoartf2709
\cocoatextscaling0\cocoaplatform0{\fonttbl\f0\fswiss\fcharset0 Helvetica;}
{\colortbl;\red255\green255\blue255;}
{\*\expandedcolortbl;;}
\paperw11900\paperh16840\margl1440\margr1440\vieww11520\viewh8400\viewkind0
\pard\tx720\tx1440\tx2160\tx2880\tx3600\tx4320\tx5040\tx5760\tx6480\tx7200\tx7920\tx8640\pardirnatural\partightenfactor0

\f0\fs24 \cf0 const fetch = require("node-fetch");\
const FormData = require("form-data");\
\
exports.handler = async (event) => \{\
  try \{\
    const form = new FormData();\
    const body = event.body;\
    const contentType = event.headers["content-type"];\
\
    form.append("photo", Buffer.from(body, "base64"), \{\
      filename: "photo.jpg",\
      contentType\
    \});\
\
    const response = await fetch("https://script.google.com/macros/s/AKfycbxaB90SI6JPYHDlEd2D4uj4mSKVjyBGb3ATRljoU0fyHCXMTO29zytU8eNdYAII8N3N/exec", \{\
      method: "POST",\
      body: form\
    \});\
\
    const data = await response.json();\
\
    return \{\
      statusCode: 200,\
      body: JSON.stringify(\{ url: data.url \})\
    \};\
\
  \} catch (err) \{\
    return \{\
      statusCode: 500,\
      body: JSON.stringify(\{ error: err.toString() \})\
    \};\
  \}\
\};\
}