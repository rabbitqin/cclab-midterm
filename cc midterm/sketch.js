var weather;

var serial;          
var portName = '/dev/cu.usbmodem1421'; 
var inData;                            
var outByte = 0;                     
var t = 0;

function preload() {
  var url = 'http://api.openweathermap.org/data/2.5/weather?q=NewYork&units=metric&APPID=54237b181673b6885b600030205dbe74';
  weather = loadJSON(url);
}

function setup() {
 createCanvas(windowWidth, windowHeight);
 serial = new p5.SerialPort();  
 serial.open(portName);           
}

function serialEvent() {
 var inByte = serial.read();
 inData = inByte;
}
 
function serialError(err) {
  console.log("error");
  println('check serial port.' + err);
}

function draw() {
  angleMode(DEGREES);

  var cityName = weather.name;
  var country = weather.sys.country;
  var weatherDescription = weather.weather[0].description;
  var Cloud = weather.clouds.all;
  var humidity = weather.main.humidity;
  var windSpeed = round(weather.wind.speed);
  var windDeg = round(weather.wind.deg);
  var temp = round(weather.main.temp);

  var speedratio = sin(windSpeed);

  var xratio = sin(windDeg) * speedratio * 5;
  var yratio = -cos(windDeg) * speedratio * 5; 

  var size = round(200 - Cloud);
  var countX = round(windowWidth / size * 2) + 2;
  var countY = round(windowHeight / size * 2) + 2;
  
  background(255);

  outByte = int(windSpeed);
  serial.write(outByte);
  console.log(outByte);

  // push();

  // translate(width / 2, height / 2 - 45);
  textSize(15);
  text(cityName + " / " + country, 10, 20);
  text(temp + "° " + "WindSpeed: " + windSpeed + "m/s Degree: " + windDeg + "° " + weatherDescription, 10, 40);

  // pop();
  
  angleMode(RADIANS);

  for (var x = 0; x < countX; x++) {
    for (var y = 0; y < countY; y++) {
      
      var r = map(windSpeed,1,5,10,20);
      var s = random(1,r);
      push();
      
      strokeWeight(s);
      if (temp<20){
      stroke(random(50,100),random(200,240),random(230,255));
    }
    else{
      stroke(255,random(160,180),0);
    }
      translate(x * size / 2, y * size / 2);
      rotate((frameCount * (speedratio) + x * xratio + y * yratio));
      point(size/10, size/2);
      pop();

    }
  }
 
}
