#include <Servo.h> 

Servo myservo;  

int pos = 0;     
int speed = 0;

void setup() 
{ 
  Serial.begin(9600);
  myservo.attach(9);  
} 

void loop() 
{ 
  if(Serial.available()>0){
   speed = Serial.read();
   Serial.print(speed);
  for(pos = 0; pos <= 180; pos += speed/2) 
  {                                 
    myservo.write(pos);               
    delay(10);                      
  } 
  for(pos = 180; pos>=0; pos-= speed/2)     
  {                                
    myservo.write(pos);               
    delay(10);                        
  } 
} 
}

