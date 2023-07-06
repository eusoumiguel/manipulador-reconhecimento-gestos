noseX=0;
noseY=0;
difference = 0;
rightWristX = 0;
leftWristX = 0;




function setup() {
    video = createCapture(VIDEO);
    video.size(550, 500);
    
    canvas = createCanvas(500, 500);
    canvas.position(560, 150);
    
    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}

function preload() {
    classifier = ml5.imageClassifier('DoodleNet');
}

function clearCanvas(){
    background("white");
}

function draw() {
    strokeWeight(10);
    stroke(0);

    if (mouseIsPressed) {
        line(pmouseX, pmouseY, mouseX, mouseY);
    }
}

function classifyCanvas() {
    classifier.classify(canvas, gotResult);
}

function gotResult(results) {
    if (results.length > 0) {
        console.log(results);
        noseX = results[0].pose.nose.x;
        noseY = results[0].pose.nose.y;
        console.log("noseX = " + noseX + "noseY = " + noseX);

        leftWristX = results[0].pose.leftWrist.x;
        rightWristX = results[0].pose.rightWristX.x;
        difference = floor(leftWristX - rightWrist);

        console.log("leftWristX = " + leftWristX + "rightWristX = " + rightWristX + "difference =" + difference);
    }
}

function draw() {
    background('#969A97');  

    document.getElementById("square_side").innerHTML = "Largura e altura serão = " + difference + "px";
    fill('#F90093');
    stroke('#F90093');
    square(noseX, noseY, difference);
}