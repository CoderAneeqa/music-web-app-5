song1 = "";
song2 = "";
leftWristX = 0;
leftWristY = 0;
rightWristX = 0;
rightWristY = 0;
score_leftWrist = 0;
status_song1 = 0;
score_rightwrist = 0;
status_song2 = 0;


function preload(){

    song1 = loadSound("music.mp3");
    song2 = loadSound("music2.mp3");

}

function setup(){

    canvas = createCanvas(600, 400);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);

}

function modelLoaded(){

    console.log("Model Is Loaded !");

}

function draw(){

    image(video, 0, 0, 600, 400);
    fill('blue');
    stroke('blue');

    status_song1 = song1.isPlaying();

    if(score_leftWrist>0.2){

        circle(leftWristX, leftWristY, 20);
        song2.stop();

        if(status_song1==false){

            song1.play();
            document.getElementById("song_name").innerHTML = "Harry Potter Theme Song is Playing !";
        }


    }

    status_song2 = song2.isPlaying();

    if(score_rightwrist>0.2){

        circle(rightWristX, rightWristY, 20);
        song1.stop();

        if(status_song2==false){

            song2.play();
            document.getElementById("song_name").innerHTML = "Peter Pan Song is Playing !";
        }
    }

}


function gotPoses(results){

    if(results.length>0){

        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
        score_leftWrist = results[0].pose.keypoints[9].score;
        score_rightwrist = results[0].pose.keypoints[10].score;

    }


}

function stop(){

    song1.stop();
}





