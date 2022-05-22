video="";
objects=[];
status="";


function preload(){


}

function setup(){
canvas = createCanvas(480, 380);
  canvas.center();
  video = createCapture(VIDEO);
  video.size(380,380);
  video.hide();
  objectDetector = ml5.objectDetector('cocossd', modelLoaded);
  document.getElementById("status").innerHTML = "Status : Detecting Objects";

}

function gotresults(error,results){
  if(error){
  console.log(error);
  
  }
  console.log(results);
  objects=results;
  
  }
  

function draw(){
 image(video, 0, 0, 480, 380);

if(status != ""){
objectDetector.detect(video,gotresults);
for(i=0;i<objects.length;i++){
document.getElementById("status").innerHTML="Status : objects detected";
document.getElementById("object").innerHTML="Number of objects detected are :" + objects.length;
fill('orange');
percent = floor(objects[i].confidence*100);
text(objects[i].label+" "+percent+"%",objects[i].x+15,objects[i].y+15);
noFill();
stroke('red');
rect(objects[i].x,objects[i].y,objects[i].width,objects[i].height)

if(objects[i].label == "object")
          {
            document.getElementById("found").innerHTML = object + " Found";
            console.log("stop");
            video.stop()
            objectDetector.detect(gotresults);
            var synth = window.speechSynthesis;
            var utterThis = new SpeechSynthesisUtterance("Object required found");
            synth.speak(utterThis);
          }
          else
          {
            document.getElementById("found").innerHTML = "Object Not Found";
        
          }
}
}

}


function start(){
objectDetector=ml5.objectDetector('cocossd',modelloaded);
document.getElementById("status").innerHTML="Status : Detecting Objects ";
object=document.getElementById('input').value
}

function stop(){
video.stop();

}

function modelloaded(){
console.log("cocossd Model Loaded");
status=true;


}
