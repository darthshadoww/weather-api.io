const bodyParser = require('body-parser')
const express = require('express')
const app = express()

const port = 3000
const https = require("https")

app.use(bodyParser.urlencoded({extended: true}));

app.get('/', function(req, res){
    res.sendFile(__dirname+"/index.html");
    

});



app.get('/jokes.html', function(req, res){
    res.sendFile(__dirname+"/jokes.html");
   

});

app.post("/", function(req ,res){
    console.log("post request received")
    // if (myRes = ){}
    const name = req.body.cityName;
    console.log(name)
    const url = "https://api.openweathermap.org/data/2.5/weather?q="+ name+ "&appid=8e6e1a243162bcc1f41cc72df575a17b&units=metric"
    https.get(url, function(response){
        console.log(response);
        console.log(response.statusCode)
    
    response.on("data", function(data){
        const weatherData =JSON.parse(data);
        console.log(weatherData )
        const descr = weatherData.weather[0].description;
        const icon = weatherData.weather[0].icon
        const temp = weatherData.main.temp
        const iconURL = "https://openweathermap.org/img/wn/"+icon+"@2x.png"
        console.log(descr)
        res.write("<h1>The weather is like "+descr +" in " + name+ " <\h1>");
        res.write("<h1>The weather temperature is "+temp+"° Celsius in " + name+ "<\h1>")
        res.write("<img src=" + iconURL+" >")
        res.send()
    })
});
})

app.post("/jokes.html", function(req ,res){
    const url2 = "https://v2.jokeapi.dev/joke/Any"
    https.get(url2, function(response){
        console.log(response);
        console.log(response.statusCode)
    
    res.on("data", function(data){
        const myJokes=JSON.parse(data);
        console.log(myJokes)
        const descr2 = myJokes.joke;
        console.log(descr2)
        res.send("<h1>"+descr2 + "<\h1>")
    })
});
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
  
})