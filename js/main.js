document.getElementById("lottery").addEventListener("click", (event) => {
    event.preventDefault();
    const  drawTimes = document.getElementById("times").value;
    for (let i = 0; i < drawTimes; i++) {
        draw(i);
    }
    
});

function draw(kierros) {
    let answ = [];

    const contestants = document.getElementById("contestants").value.split(/\r?\n/);

    const fastestLap = document.getElementById("fastest").value;
    const fastest = time2sec(fastestLap);

    const slowestLap = fastest + parseFloat(document.getElementById("slowest").value);
    const slowest = slowestLap;

    contestants.forEach(os => {
        const time = Math.random() * (fastest - slowest) + slowest;
        const item = { contestant: os, time: sec2time(time).toFixed(3) };
        answ.push(item);
    });

    let fastestContestant = parseInt(Math.random() * (answ.length - 1));
    let slowestContestant = parseInt(Math.random() * (answ.length - 1));

    while (fastestContestant === slowestContestant) {
        fastestContestant = parseInt(Math.random() * (answ.length - 1));
        slowestContestant = parseInt(Math.random() * (answ.length - 1));
    }

    answ[fastestContestant].time = parseFloat(fastestLap).toFixed(3);
    answ[slowestContestant].time = parseFloat(sec2time(slowestLap)).toFixed(3);

    answ.sort(function(a, b){return a.time-b.time});

    document.getElementById("push").innerHTML = ``;

    document.getElementById("push").innerHTML += `<div id="k${kierros}" class="col">`;
    answ.forEach(osal => {
        document.getElementById(`k${kierros}`).innerHTML += `<p>${osal.contestant} ${osal.time}`;
    });
}

function time2sec(time) {
    let parse = parseFloat(time);

    if(time % 1 === 0) {
        return time * 60;
    };

    const minutes = parseInt(parse) * 60;

    const seconds = ( parse - parseFloat(parseInt(parse)) ) * 100;

    return minutes + seconds;
}

function sec2time(time) {
    let finalTime = parseInt(time / 60);

    finalTime += (time - finalTime * 60) / 100;

    return finalTime;
}