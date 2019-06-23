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
const s = new Spotify({id: clientId, secret: clientSecret});

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.get('/api/search', (req, res) => {
  const searchr = s.search({type:'track', query: 'cicuta', limit: 20, market: 'PE'}).then(function(result){
    console.log(result);    
    res.send(result.tracks.items);
  });
});

app.get('/api/recommendations', (req, res) => {
  s.recommendations({limit: 20, market: 'PE'}).then(function(result){
    console.log(result);
    res.send(result.tracks);
  });
});

app.listen(3000, () => {
  console.log('Example app listening on port 3000!');
  const s = new Spotify({id: clientId, secret: clientSecret});
  console.log('set token');
  //s.setToken();
  console.log(s.search({type:'track', query: 'cicuta', limit: 20, market: 'PE'}));
  /*console.log(s.getCredentialHeader());
  console.log(s);
  console.log('search');
  console.log();
  console.log(s.isTokenExpired());*/
});
