const pieces = [];

const colors = [
    "#EB5757",
    "#F2994A",
    "#6FCF97",
    "#9B51E0",
    "#2F80ED",
    "#56CCF2",
    "#219653",
    "#F2C94C"
];

const initial = [
    { radius: 81, start: 0, end: 0.7853981633974483, color: "#F2C94C" }, 
    { radius: 195, start: 0.7853981633974483, end: 1.5707963267948966, color: "#6FCF97" }, 
    { radius: 226, start: 1.5707963267948966, end: 2.356194490192345, color: "#2F80ED" }, 
    { radius: 330, start: 2.356194490192345, end: 3.141592653589793, color: "#219653" }, 
    { radius: 278, start: 3.141592653589793, end: 3.9269908169872414, color: "#EB5757" }, 
    { radius: 84, start: 3.9269908169872414, end: 4.71238898038469, color: "#9B51E0" }, 
    { radius: 266, start: 4.71238898038469, end: 5.497787143782138, color: "#F2994A" }, 
    { radius: 69, start: 5.497787143782138, end: 6.283185307179586, color: "#56CCF2" }
];

const center = document.getElementById("center");
const ctx = center.getContext("2d");
const pies_number = 8;

center.width = window.innerWidth;
center.height = window.innerHeight;

const centerX = center.width / 2;
const centerY = center.height / 2;

(function renderBasic() {
    initial.forEach(piece => {
        ctx.fillStyle = piece.color;
        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        ctx.arc(centerX, centerY, piece.radius, piece.start, piece.end);
        ctx.lineTo(centerX, centerY);
        ctx.fill();
    });
    drawBaseCircle()
})();

center.addEventListener("click", changeChart);

function changeChart() {
    const pieceNum = Math.floor(Math.random() * pies_number) + 1;
    pieces.length = 0;
    let startAngle = 0; // Угол начала для первого сектора

    const availableColors = colors.slice();

    for (let pie = 0; pie < pieceNum; pie++) {
        const radius = Math.floor(Math.random() * (350 - 66 + 1)) + 66;

        const colorIndex = Math.floor(Math.random() * availableColors.length);
        const color = availableColors.splice(colorIndex, 1)[0];

        const endAngle = startAngle + (Math.PI * 2 * (1 / pieceNum)); // Рассчитываем угол конца для сектора

        pieces.push({ radius, start: startAngle, end: endAngle, color });

        startAngle = endAngle;
    }

    redrawChart();
}



function redrawChart() {
    ctx.clearRect(0, 0, center.width, center.height);

    pieces.forEach(piece => {
        ctx.fillStyle = piece.color;
        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        ctx.arc(centerX, centerY, piece.radius, piece.start, piece.end);
        ctx.lineTo(centerX, centerY);
        ctx.fill();
    });

    drawBaseCircle()
}

function drawBaseCircle() {
    ctx.fillStyle = "black";
    ctx.beginPath();
    ctx.arc(centerX, centerY, 33, 0, Math.PI * 2);
    ctx.fill();
}