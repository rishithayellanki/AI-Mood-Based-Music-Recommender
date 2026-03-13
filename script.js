const video = document.getElementById("video");
const canvas = document.getElementById("overlay");
const ctx = canvas.getContext("2d");
const previewImg = document.getElementById("previewImg");
const result = document.getElementById("result");
const fileInput = document.getElementById("fileInput");

const startBtn = document.getElementById("startBtn");
const captureBtn = document.getElementById("captureBtn");
const stopBtn = document.getElementById("stopBtn");


let stream = null;
let ROI_RADIUS = 150;

/* YouTube Links */
const YT = {
    angry: "https://youtu.be/ww6N-jyjsbw?si=UrQXIcEFbLWWzREX",
    disgust: "https://youtu.be/9E6b3swbnWg?si=gYznxgvQYj648XHg",
    happiness: "https://youtu.be/eoXtKw_bW_s?si=TvKnwZl0gvgqEIXk",
    sadness: "https://youtu.be/jkd_EW-0IE0?si=q7nQKmiZzrKvIe6i",
    fear: "https://youtu.be/8CX_Pr-DlL0?si=VuNNdJ3KFGyuVCSc",
    surprise: "https://youtu.be/ljnGl5nvUJY?si=JIljMDtOQjr2EIUl",
    neutral: "https://youtu.be/HfoNNEA9MIE?si=qsN5U9qmqx8lFoHO"
};

/* ---------------- START CAMERA -------------------- */
async function startCam() {
    stream = await navigator.mediaDevices.getUserMedia({ video:true });
    video.srcObject = stream;

    video.onloadedmetadata = () => {
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        drawROI();
    };
}

/* ---------------- STOP CAMERA -------------------- */
function stopCam() {
    if(stream){
        stream.getTracks().forEach(t=>t.stop());
        video.srcObject = null;
    }
}

/* ---------------- DRAW ROI CIRCLE -------------------- */
function drawROI(){
    ctx.clearRect(0,0,canvas.width,canvas.height);
    ctx.beginPath();
    ctx.lineWidth = 6;
    ctx.strokeStyle = "#ff1744";
    ctx.arc(canvas.width/2, canvas.height/2, ROI_RADIUS, 0, Math.PI*2);
    ctx.stroke();
    requestAnimationFrame(drawROI);
}

/* ---------------- CAPTURE FRAME -------------------- */
function capture(){
    if(!stream) return alert("Start camera first!");

    const temp = document.createElement("canvas");
    temp.width = video.videoWidth;
    temp.height = video.videoHeight;

    temp.getContext("2d").drawImage(video,0,0);
    const img = temp.toDataURL();

    previewImg.src = img;
    previewImg.style.display = "block";

    temp.toBlob(b => analyze(b),"image/jpeg");
}

/* ---------------- UPLOAD IMAGE -------------------- */
fileInput.addEventListener("change", e=>{
    let file = e.target.files[0];
    if(file){
        previewImg.src = URL.createObjectURL(file);
        previewImg.style.display="block";
        analyze(file);
    }
});

/* ---------------- BACKEND CALL -------------------- */
async function analyze(file){
    result.innerHTML = "⏳ Analyzing...";

    const fd = new FormData();
    fd.append("file", file);

    const res = await fetch("http://127.0.0.1:8000/analyze", {
        method:"POST",
        body:fd
    });

    const data = await res.json();

    document.getElementById("ytBtn")?.remove();

    if(data.emotion === "no_face_detected"){
        result.innerHTML = "❌ No Face Detected";
        return;
    }

    if(data.error){
    result.innerHTML = "❌ Error: " + data.error;
    return;
}

if(!data.emotion){
    result.innerHTML = "❌ Emotion not detected";
    return;
}

let em = data.emotion.toUpperCase();
result.innerHTML = "Detected Emotion: <b>"+em+"</b>";


    let btn = document.createElement("button");
    btn.id="ytBtn";
    btn.textContent = "▶ Open YouTube Playlist";
    btn.onclick =()=> window.open(YT[data.emotion],"_blank");
    document.getElementById("container").appendChild(btn);
}

/* ---------------- EVENTS -------------------- */
startBtn.onclick = startCam;
stopBtn.onclick = stopCam;
captureBtn.onclick = capture;