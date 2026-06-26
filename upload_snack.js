const fs = require('fs');
const https = require('https');

const appJsContent = fs.readFileSync('App.js', 'utf8');

const payload = JSON.stringify({
  manifest: {
    name: "GYM APP WARZONE",
    description: "Minimalist Strength Log using Expo & WebView",
    sdkVersion: "51.0.0"
  },
  dependencies: {
    "react-native-webview": { version: "*" }
  },
  code: {
    "App.js": {
      type: "CODE",
      contents: appJsContent
    }
  }
});

const options = {
  hostname: 'exp.host',
  port: 443,
  path: '/--/api/v2/snack/save',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': Buffer.byteLength(payload)
  }
};

const req = https.request(options, res => {
  let data = '';
  res.on('data', chunk => {
    data += chunk;
  });
  res.on('end', () => {
    try {
      const response = JSON.parse(data);
      if (response.id) {
        console.log(`SNACK_URL: https://snack.expo.dev/${response.id}`);
      } else {
        console.error('Error in response:', response);
      }
    } catch (e) {
      console.error('Failed to parse response:', data);
    }
  });
});

req.on('error', error => {
  console.error('Request error:', error);
});

req.write(payload);
req.end();
