console.log("js attached successfully");
let video = document.getElementById("video");
let model;
let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");
const setupCamera = () => {
  navigator.mediaDevices
    .getUserMedia({
      video: { width: 400, height: 400 },
      audio: false,
    })
    .then((stream) => {
      video.srcObject = stream;
    });
};
const detectFaces = async () => {
  const prediction = await model.estimateFaces(video, false);
  // console.log(prediction);
  ctx.drawImage(video, 0, 0, 400, 400);
  prediction.forEach((pred) => {
    ctx.beginPath();
    ctx.lineWidth = "2";
    ctx.strokeStyle = "green";
    ctx.rect(
      pred.topLeft[0],
      pred.topLeft[1],
      pred.bottomRight[0] - pred.topLeft[0],
      pred.bottomRight[1] - pred.topLeft[1]
    );
    ctx.stroke();

    ctx.fillStyle = "blue";
    pred.landmarks.forEach((landmark) => {
      ctx.fillRect(landmark[0], landmark[1], 3, 3);
    });
  });
};
setupCamera();
video.addEventListener("loadeddata", async () => {
  model = await blazeface.load();
  setInterval(detectFaces, 40);
});
