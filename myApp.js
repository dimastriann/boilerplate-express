var express = require('express');
const bodyParser = require('body-parser');
var app = express();

console.log("Hello World");
app.use(bodyParser.urlencoded({extended: false}))
app.use('/public', express.static(__dirname + '/public'))

app.use('/', (req, res, next) => {
  console.log(`${req.method} /${req.path} - ${req.ip}`)
  next();
})

app.get('/', (req, res) => {
  // res.send("Hello Express");
  res.sendFile(__dirname + '/views/index.html')
})

app.get("/json", (req, res) => {
  let response = "Hello json";
  if(process.env.MESSAGE_STYLE == "uppercase"){
    response = response.toUpperCase();
  }
  
  res.json({
    "message": response
  })
})

app.get('/now', (req, res, next) => {
  req.time = new Date().toString();
  next();
}, (req, res) => {
  res.send({
    time: req.time
  });
})

app.get('/:word/echo', (req, res) => {
  const { word } = req.params;
  res.json({
    echo: word
  })
})

app.route('/name')
  .get( (req, res) => {
    const { first, last } = req.query;
    // console.log(req.query);
    res.json({
      name: `${first} ${last}`
    })
  })
  .post( (req, res) => {
    const { first, last } = req.body;
    // console.log(req.body);
    res.json({
      name: `${first} ${last}`
    }) 
  })




































 module.exports = app;
