// Andrée-Anne Beaudet-Racine       16-09-2021          Labo3
// C:\Users\boutd\Google_Drive\Cegep\Session5\Programmation_Systeme\JS_JQuery_Node.js\Labo3_
const express = require('express');
const app = express();
const port = 8080;
app.set('view engine', 'ejs');
app.listen(port, () => {
    console.log(`Le serveur est lancé sur le port  ${port}!`)
});

var etat = [0,0,0,0,0,0];

// Connexion MQTT
const mqtt = require('mqtt');
const client = mqtt.connect('mqtt://192.168.2.15:1883');
client.subscribe('MODULE/#');

client.on('connect', function () {
    console.log("MQTT connecté !");
    client.publish('MODULE', 'le serveur js vous dit bonjour');
});
client.on('message', function (topic, message) {
    var sujet = topic.toString();
    var msg = message.toString();
    console.log("--> sujet : " + sujet);
    console.log("--> msg : " + msg);
    var mySplit = topic.split("/");
    var numModule = mySplit[mySplit.length-1]; 
    if (msg == "on"){
        etat[numModule-1] = 1;
        console.log("**etat(on) : " + etat);
    }
    else if (msg == "off"){
        etat[numModule-1] = 0;
        console.log("**etat(off) : " + etat);
    }
    else
        console.log("commande non reconnue"); 

  });
  

// Gestion de connexion aux pages du site

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
    etat[req.params.number-1]=!etat[req.params.number-1];
    res.redirect('/controle');
});
app.get('/module/:number', function (req, res, next) {
    if (req.params.number > 0 && req.params.number < 7) {
        etat[req.params.number-1]=1;
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
});

