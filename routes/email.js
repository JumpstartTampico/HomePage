var express = require('express');
var bodyParser = require('body-parser');
var router = express.Router();
var sendgrid = require('sendgrid')(process.env.SENDGRID_USERNAME,process.env.SENDGRID_PASSWORD);
var fs = require('fs');
var template = fs.readFileSync('./ink/build/index.html','utf-8');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('email', { title: 'Registro de taller'});
});
router.post('/', function(req, res, next) {
  sendgrid.send({
    to: req.body.email,
    from: 'noreply@jumpstart.mx',
    subject: 'Talleres',
    html: template
  }, function(error, json){
    if (error) {return res.send('Error enviando email');}
    res.send('Email enviado');
  })
})
module.exports = router;
