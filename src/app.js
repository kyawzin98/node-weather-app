//Node Core Modules
const path = require("path");

//NPM Modules
const express = require("express");
const hbs = require("hbs");

//Custom Modules
const {geocode} = require("./utils/geocode");
const {forecast} = require("./utils/forecast");

//Set up Express
const app = express();

//Define Custom Paths for Views
const publicPath = path.join(__dirname, '../public');
const partialPath = path.join(__dirname, '../views/partials');
const pagesPath = path.join(__dirname, '../views/pages');

//Set up static public directory
app.use(express.static(publicPath));

//Set up View Template Engine and view locations
app.set('view engine', 'hbs');
app.set('views', pagesPath);
hbs.registerPartials(partialPath);

app.get('/', (req, res) => {
  res.render('index', {
    title: "Weather App",
    name: "Kyaw Zin"
  });
});

app.get('/about', (req, res) => {
  res.render('about', {
    title: "About Page",
    name: "Kyaw Zin"
  });
});

app.get('/help', (req, res) => {
  res.render('help', {
    title: "Help Page",
    name: "Kyaw Zin",
    help: "Varnish each side of the pork butt with half a kilo of meatloaf."
  });
});

app.get('/weather', (req, res) => {
  if (!req.query.address){
    return res.send({error:"You must provide an address"})
  }
  geocode(req.query.address, (error, {latitude,longitude,location} = {}) => {
    if (error){
      return res.send({error});
    }
    forecast(latitude,longitude, (error, forecastData) => {
      if (error){
        return res.send({error});
      }
      res.send({
        location: location,
        forecast: forecastData
      });
    })
  })
});

app.get('/help/*',(req,res)=>{
  // res.redirect('/help');
  res.render('404',{message:'Help Article Not Found',name:"Kyaw Zin"});
})

//404 routes
app.get('*',(req,res)=>{
  res.render('404',{message:'404 :) Page Not Found',name:"Kyaw Zin"});
})

//Running Server on Port 3000
app.listen(3000, () => {
  console.log('Server is up on port 3000');
});
