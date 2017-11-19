const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;

const app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');

app.use((req, res, next) => {
  let now = new Date().toString();
  let log = `${now}: ${req.method} ${req.url}`;
  console.log(log);
  fs.appendFile('server.log', log + '\n', (err) => {
    if (err) {
        console.log('unable to append to server.log')
    }
  });
  next();
});

// app.use((req, res, next) => {
//   res.render('maintenance.hbs', {
//     pageTitle: 'maintenance'
//   });
// });

app.use(express.static(__dirname + '/public'));


hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear()
});

hbs.registerHelper('screamIt', (text) => {
  return text.toUpperCase();
})

app.get('/', (req,res) => {
  //res.send('<h1>Hello James</h1>');
  //res.render home.hbs
  //h1 and footer with a welcome message in paragraph. pagetitle,currentyear, welcome message
  res.render('home.hbs', {
      pageTitle: 'Home Page',
      welcomeMessage: 'Welcome to the home page'
  });
});

app.get('/projects', (req,res) => {
  res.render('projects.hbs', {
    pageTitle: 'Projects',
    hyperlink: 'https://github.com/jameshodge96'
  });
});

// /projects as a view file. render the header and footer. Render a message
//paritals - link for pojects you can go to home / about / projects
//commit and push to github
// push it to heroku to use push heroku
// check to see if it works.

app.get('/about', (req,res) => {
  res.render('about.hbs', {
    pageTitle: 'About Page',

  });
});

app.get('/bad', (req,res) => {
  res.send({
    errorMessage: 'Bad Request You idiot'
  });
});


app.listen(port, () => {
  console.log(`server is up on port ${port}`);
});
