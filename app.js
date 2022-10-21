const express = require('express');
const https = require('https');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.get('/',function(req,res){
  res.sendFile(__dirname + "/index.html");
});

app.post("/",function(req,res){
  const query = req.body.cityName;
  const apiKey = "85bfc0871a99bea5353ec4e03dedddc6";
  const unit = "metric"
  const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + apiKey + "&units=" + unit;
  https.get(url,function(response){
    console.log(response.statusCode);

    response.on("data",function(data){
      const weatherData = JSON.parse(data);
      const temp = weatherData.main.temp;
      const description = weatherData.weather[0].description;
      const icon = weatherData.weather[0].icon;
      const iconURL = "https://openweathermap.org/img/wn/" + icon +"@2x.png";
      res.write("<p>The weathe is currently " + description + "</p>");
      res.write("<h1>The temperature in " + query +" is " + temp + " degree Celcius</h1>");
      res.write("<img src = " + iconURL +"></img>")
      res.send();
    });
  });
});

app.listen(3000,function(res,req){
  console.log("Server running at port 3000");
});
