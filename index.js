'use strict';

const line = require('@line/bot-sdk');
const express = require('express');

// create LINE SDK config from env variables
const config = {
  channelAccessToken: "Dd3eLHO+RdRnRo4oIcuI4xe/aXhvW+UvdiBbfMCv8Wl6wy0WV4Cs/ROztuJsDXhy3Rx5kiYe/OlPt6HAJ2U+FlcRqroGdDYMVyOqFCYBLkcWlfq3ruXuiMBJ2JLRybCG5DHeQJQ0ADiw1lMCv++uSgdB04t89/1O/w1cDnyilFU=",
  channelSecret:"18dc9a14031140c9e0847d0c40a29165",
};

// create LINE SDK client
const client = new line.Client(config);

// create Express app
// about Express itself: https://expressjs.com/
const app = express();

// register a webhook handler with middleware
// about the middleware, please refer to doc
app.post('/callback', line.middleware(config), (req, res) => {
  Promise
    .all(req.body.events.map(handleEvent))
    .then((result) => res.json(result))
    .catch((err) => {
      console.error(err);
      res.status(500).end();
    });
});

// event handler
function handleEvent(event) {
  if (event.type !== 'message' || event.message.type !== 'text') {
    // ignore non-text-message event
    return Promise.resolve(null);
  }
  else if (event.message.type === "text" &&  (event.message.text === "hello" || event.message.text === "Hello"  ) ){
    const payload = {
      type: "text",
      text: "การศึกษา MASSAGING API โดยกลุ่มพัฒนาระบบงานจัดเก็บข้อมูล ศูนย์เทคโนโลยีสารสนเทศและการสื่อสาร"
    };
    return client.replyMessage(event.replyToken, payload);
  }
  else if (event.message.type === "text" &&  event.message.text === "สวัสดี"  ){
    const payload = {
      type: "text",
      text: "การศึกษา MASSAGING API โดยกลุ่มพัฒนาระบบงานจัดเก็บข้อมูล ศูนย์เทคโนโลยีสารสนเทศและการสื่อสาร"
    };
    return client.replyMessage(event.replyToken, payload);
  }
}

 


// listen on port
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`listening on ${port}`);
});
