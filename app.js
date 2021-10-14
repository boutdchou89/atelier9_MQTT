// Andrée-Anne Beaudet-Racine       16-09-2021          Labo3
// C:\Users\boutd\Google_Drive\Cegep\Session5\Programmation_Systeme\JS_JQuery_Node.js\Labo3_
const express = require('express');
const app = express();
const port = 8080;
app.set('view engine', 'ejs');

var etat = [0,0,0,0,0,0];

app.get('/', function (req, res, next) {
    res.render('./index');
});
app.get('/contact', function (req, res, next) {
    res.render('./contact');
});
app.get('/controle', function (req, res, next) {
    res.render('./controle', {etat: etat });
});
app.get('/update/:number', function (req, res, next) {
    etat[req.params.number]=!etat[req.params.number];
    res.redirect('/controle');
});
app.get('/module/:number', function (req, res, next) {
    if (req.params.number > 0 && req.params.number < 7) {
        res.render('./module', { nbr: req.params.number, etat:etat});
    } else
        res.send("module inconnu...");
});
app.get('/reset', function (req, res, next) {
    for (var i = 0; i < etat.length; i++) {
        etat[i] = 0;}
    res.render('./reset');
});
app.use(function (req, res) {
    res.render('404.ejs');
    res.writeHead(404);
});
app.listen(port, () => {
    console.log(`Le serveur est lancé sur le port  ${port}!`)
});
