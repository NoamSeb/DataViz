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

    // axis(d3.scaleLog().domain([1e0, 1e6]))
    //     .ticks(2)
    //     .render()
    //     .style("color", "white")
    var myArray = [123, data16.length, data17.length, data18.length, data19.length, data20.length, data21.length, data22.length];
    var a = ArrayAvg(myArray);
    console.log(a)
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

function playPause(e) {
    if (media.paused == false) {
        media.pause()
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