//fetch de tout les fichiers de données afin de pouvoir utilisé leurs contenus
Promise.all([
    fetch("data_JSON/data2016.json").then((res) => res.json()),
    fetch("data_JSON/data2017.json").then((res) => res.json()),
    fetch("data_JSON/data2018.json").then((res) => res.json()),
    fetch("data_JSON/data2019.json").then((res) => res.json()),
    fetch("data_JSON/data2020.json").then((res) => res.json()),
    fetch("data_JSON/data2021.json").then((res) => res.json()),
    fetch("data_JSON/data2022.json").then((res) => res.json()),
]).then(([data16, data17, data18, data19, data20, data21, data22]) => {
    initApp(data16, data17, data18, data19, data20, data21, data22);
});

function random(min, max) {
    let n;
    do {
        n = Math.round(Math.random() * (max - min) + min);
    } while (n === 0);
    return n;
}

function initApp(data16, data17, data18, data19, data20, data21, data22) {
    //correction du nombre de victime en 2016 après vérification sur internet
    //stockage de données dans un tableau
    let data_paires = [
        { A: 123, B: data17.length },
        { A: data17.length, B: data18.length },
        { A: data18.length, B: data19.length },
        { A: data19.length, B: data20.length },
        { A: data20.length, B: data21.length },
        { A: data21.length, B: data22.length }
    ]
    let pointX1 = 700 / data_paires.length
    let pointX2 = pointX1 + (1000 / data_paires.length)

    d3.select("#dessin")
        .selectAll("g")
        .data(data_paires)
        .enter()
        .append("g")
        .attr("class", "dataAnnee")

    d3.selectAll(".dataAnnee")
        .append("line")
        .data(data_paires)
        .attr("x1", 0)
        .attr("transform", (d, i) => `translate(${i * pointX1})`)
        .attr("y1", d => -d.A)
        .attr("x2", pointX1)
        .attr("y2", d => -d.B)
        .style("stroke", "yellow")
        .style("stroke-width", "4")
    d3.select

    const axesB = d3.axisBottom(d3.scaleLinear().domain([2016, 2022]).range([0, 700]))
        .ticks(7)
        .tickFormat(d3.format('d'));
    const axesL = d3.axisLeft(d3.scaleLinear().domain([0, 300]).range([0, -300]))
        .ticks(7)


    d3.select("#dessin")
        .append("g")
        .call(axesB)
        .style("font-size", "1vw")

    d3.select("#dessin")
        .append("g")
        .call(axesL)
        .style("font-size", "1vw")


    let myArray = [123, data16.length, data17.length, data18.length, data19.length, data20.length, data21.length, data22.length];
    let a = ArrayAvg(myArray);
    console.log(Math.ceil(a))

    // code pour le nuage de prénom

    let allArray = [data16, data17, data18, data19, data20, data21, data22];
    let annee = 2016;

    for (let array of allArray) {
        d3.select("#nuage")
            .style("position", "relative")
            .selectAll("ijhkjhkjh")
            .data(array)
            .enter()
            .append("div")
            .attr("class", "prenom " + annee)
            .text(d => d.name.split(/[ ,]/)[0])
            .style("position", "relative")
            .style("top", d => random(5, 95) + "%")
            .style("left", d => random(5, 95) + "%")
            .style("opacity", d => random(3, 8) / 10)
        annee++
    }

    console.log(data16.name)


}

//Code pour map Leaflet

const mapObject = L.map('myMap')
    .setView([48.866667, 2.333333], 5);

//Ajout du layer openstreetmap 

L.tileLayer('https://stamen-tiles.a.ssl.fastly.net/toner/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    subdomains: 'abcd',
    minZoom: 0,
    maxZoom: 20,
    ext: 'png'
}).addTo(mapObject);

// var marker = L.marker([data16.coordinates]).addTo(mapObject);

// //48.837242683910375, 2.584856744517518
// var circle = L.circle([48.83687, 2.58394], {
//     color: 'red',
//     fillColor: '#f03',
//     fillOpacity: 0.5,
//     radius: 20
// }).addTo(mapObject);

function ArrayAvg(myArray) {
    var i = 0,
        summ = 0,
        ArrayLen = myArray.length;
    while (i < ArrayLen) {
        summ = summ + myArray[i++];
    }
    return summ / ArrayLen;
}




// lecteur vidéo

const media = document.querySelector("video");
const btn = document.querySelector("button");
const volume = document.querySelector("input");
const progress = document.querySelector("progress");
const pause = document.querySelector(".pauseDiv")

function playPause(e) {
    if (media.paused == false) {
        media.pause()
        pause.style.display = "block"
    } else {
        media.play()
    }
}

btn.addEventListener("click", playPause);
media.addEventListener("click", playPause);

media.volume = 0.7
volume.value = 0.7
volume.addEventListener("input", function() {
    media.volume = volume.value
})

media.addEventListener("timeupdate", timeProgress)

function timeProgress() {
    progress.value = (media.currentTime * 100 / media.duration);
}
progress.addEventListener('click', (event) => {
    console.log(event.offsetX)
    media.currentTime = event.offsetX;
    progress.value = (media.currentTime * 100 / media.duration)
});

// script pour le nuage de prénom

// const anneeHommage = document.querySelector(".annee");

// function changePrenom() {
//     console.log("hello");
//     document.querySelectorAll(".prenom").style.display = "none";

//     if (document.querySelector(".prenom").classList.contains(n)) {
//         document.querySelector(".prenom " + n).style.display = "block";
//     }
// }

// anneeHommage.addEventListener("click", changePrenom);

document.querySelectorAll('.annee').forEach(function(i) {
    i.addEventListener('click', function(e) {

        document.querySelectorAll(".prenom").forEach(function(pre) {


            if (pre.classList.contains(e.target.getAttribute('id'))) {
                pre.style.display = "block";
            } else {
                pre.style.display = "none";
            }
        })
    })
})