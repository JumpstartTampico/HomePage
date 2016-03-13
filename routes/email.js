var express = require('express');
var sendgrid = require('sendgrid')('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');
var Hogan = require('hogan.js');
var fs = require('fs');
var router = express.Router();
var template = fs.readFileSync('./public/mails/git.hjs','utf-8');
var compiledTemplate = Hogan.compile(template);

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('email', { title: 'Registro de taller'});
});
router.post('/', function(req, res, next) {
  // console.log("Nombre: "+ req.body.firstName)
  // console.log("Email: " + req.body.email)
  sendgrid.send({
    to: req.body.email,
    from: 'talleres@jumpstart.mx',
    subject: 'Talleres',
    html: compiledTemplate.render({firstName: req.body.firstName})
  }, function(error, json){
    if (error) {return res.send('Error enviando email');}
    res.send('Email enviado');
  })
})
module.exports = router;
