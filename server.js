const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;

// HBS
hbs.registerPartials(__dirname + '/views/partials');
hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear();
});
hbs.registerHelper('screamIt', (text) => {
  return text.toUpperCase();

});

// EXPRESS
var app = express();
app.set('view engine', 'hbs');
// Logger
app.use((request, response, next) => {
  var now = new Date().toString();
  var log = `${now}: ${request.method} ${request.url}`;
  console.log(log);
  fs.appendFile('server.log', log + "\n", (err) => {
    if (err) {
      console.log("Unable to append to server.log");
    }
  });
  next();
});
// Maintenance
// app.use((request, response, next) => {
//   response.render('maintenance.hbs');
// });

// Static content
app.use(express.static(__dirname + '/public'));

// Home
app.get('/', (request, response) => {
  //response.send('<h2>Hello Express!</h2>');
  response.render('home.hbs', {
    pageTitle: "Home",
    welcomeMessage: "Welcome to the site"
  });
});

// About
app.get('/about', (request, response) => {
  response.render('about.hbs', {
    pageTitle: "About Page"
  });
});

// Bad
app.get('/bad', (request, response) => {
  response.send({
    errorMessage: "Unable to handle request"
  })
})

// Maintenance
// app.get('/maintenance', (request, response) => {
//   response.render('maintenance.hbs');
// });

app.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});

