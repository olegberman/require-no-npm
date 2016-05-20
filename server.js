'use strict';

const express = require('express')
const npm = require('npm')
const fs = require('fs')

const app = express()

npm.load({
  loaded: false
})

app.use('/index.html', express.static('./index.html'));
app.use('/client.js', express.static('./client.js'));
app.use('/favicon.ico', (req, res) => {
  res.sendStatus(404)
});

app.get('/:module_name', (req, res) => {
  if(req.params.module_name === 'favicon.ico') {
    return res.sendStatus(500)
  }
  npm.commands.install([req.params.module_name], (err, data) => {
    if(err) res.sendStatus(500)
    let path = './node_modules/' + req.params.module_name
    let package_json = require(path + '/package.json')
    fs.readFile(path + '/' + package_json.main, 'utf8', (err, contents) => {
      if(err) res.sendStatus(500)
      res.send(contents)
    })
  })
})

app.listen(5000)
