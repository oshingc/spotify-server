const dotenv = require('dotenv').config();
const express = require('express');
const app = express();
const crypto = require('crypto');
const cookie = require('cookie');
const nonce = require('nonce')();
const querystring = require('querystring');
const request = require('request-promise');
const Spotify = require('./spotify-connection');
const env = require('./../');

const clientId = process.env.SPOTIFY_CLIENT_ID;
const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;
const scopes = 'user-read-private user-read-email';
const forwardingAddress = "{ngrok forwarding address}"; // Replace this with your HTTPS Forwarding address

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(3000, () => {
  console.log('Example app listening on port 3000!');
  const s = new Spotify({id: clientId, secret: clientSecret});
  console.log('set token');
  s.setToken();
  console.log(s.getCredentialHeader());
  console.log(s);
  console.log('search');
  console.log(s.search({query: 'libido', type: 'artist', market: 'PE'}));
  console.log(s.isTokenExpired());
  //console.log(s.getCredentialHeader());
  //console.log(s.getTokenHeader());
});