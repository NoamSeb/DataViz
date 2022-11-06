//chargement de AOS qui permet d'animer les éléments du sites
AOS.init();

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
// initialisation d'une fonction random qui choisi un valeur au hasard compris entre une valeur minimal et maximale
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
        // Code du graphique qui prend en compte les données stocké dans le tableau data_paires
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
        .style("stroke", "#FFE589")
        .style("stroke-width", "4")
    d3.select

    // attribution de valeurs aux axes x et y du graphique
    const axesB = d3.axisBottom(d3.scaleLinear().domain([2016, 2022]).range([0, 700]))
        .ticks(7)
        .tickFormat(d3.format('d'));
    const axesL = d3.axisLeft(d3.scaleLinear().domain([0, 300]).range([0, -300]))
        .ticks(7)

    d3.select("#dessin")
        .append("g")
        .call(axesB)
        .style("font-size", "1rem")

    d3.select("#dessin")
        .append("g")
        .call(axesL)
        .style("font-size", "1rem")

    // calcul de la moyenne de féminicide par ans depuis 2016 grâce au valeurs comprises dans le tableau
    let myArray = [123, data16.length, data17.length, data18.length, data19.length, data20.length, data21.length, data22.length];
    let a = ArrayAvg(myArray);
    const avr = Math.ceil(a)

    let allArray = [data16, data17, data18, data19, data20, data21, data22];
    let annee = 2016;

    for (let array of allArray) {
        d3.select("#nuage")
            .style("position", "relative")
            .selectAll("ijhkjhkjh")
            .data(array)
            .enter()
            .append("div")
            .attr("class", "prenom pra" + annee)
            .text(d => d.name.split(/[ ,]/)[0])
            .style("position", "absolute")
            .style("top", d => random(5, 95) + "%")
            .style("left", d => random(5, 95) + "%")
        annee++
    }
    d3.merge(allArray).forEach(element => {
        var coordinates = element.coordonnees.split(',')
        if (coordinates.length > 1) {
            coordinates[0] = parseFloat(coordinates[0])
            coordinates[1] = parseFloat(coordinates[1])
            var marker = L.marker(coordinates).addTo(mapObject);
            marker.bindPopup("<b>" + element.name + " ( " + element.age + " ) <br>" + element.ville + "<br>" + element.departement);
        }
    });

    var markersCluster = new L.MarkerClusterGroup();

    var cities = getCities();
    for (var i = 0; i < cities.length; i++) {
        var latLng = new L.LatLng(cities[i][1], cities[i][2]);
        var marker = new L.Marker(latLng, { title: cities[i][0] });
        markersCluster.addLayer(marker);
    }

    map.addLayer(markersCluster);

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

//fonction qui calcul la moyenne
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
    media.currentTime = event.offsetX;
    progress.value = (media.currentTime * 100 / media.duration)
});

// script pour le nuage de prénom
d3.selectAll('.annee').on("click", function(e, d) {
    d3.selectAll(".annee")
        .style("text-decoration", "none")
    d3.selectAll(`#${this.id}`)
        .style("text-decoration", "underline #FFE589 7px")
    d3.selectAll(".prenom")
        .transition()
        .duration(1000)
        .ease(d3.easeSin)
        .style("opacity", "0")
    d3.selectAll(`.pr${this.id}`)
        .style("opacity", "0")
        .transition()
        .duration(1000)
        .ease(d3.easeSin)
        .style("opacity", d => random(3, 7) / 10);
})

// pour les mentions légales
document.querySelector('.mentions').addEventListener('click', function(e) {
    let m = document.querySelector('.mentionsTexte');
    if (m.classList.contains('invisible')) {
        m.classList.replace('invisible', 'visible')
    } else {
        m.classList.replace('visible', 'invisible')
    }
})

// pour l'apparition au scroll
const threshold = 0.3;
const options = {
    root: null,
    rootMargin: '0px',
    threshold
}

const handleIntersect = function(entries, observer) {
    entries.forEach(function(entry) {
        if (entry.intersectionRatio > threshold) {
            entry.target.classList.remove('reveal')
            observer.unobserve(entry.target)
        }
    })
}

window.addEventListener("DOMContentLoaded", function() {
    const observer = new IntersectionObserver(handleIntersect, options)
    const targets = document.querySelectorAll('.reveal')
    targets.forEach(function(target) {
        observer.observe(target)
    })
})


function counter() {

    var duration = 16;
    var count = setInterval(function() {
        var c = parseInt($('.counter').text());
        $('.counter').text((++c).toString());
        if (c == 100) {
            duration += 100
        }

        if (c == 112) {
            clearInterval(count);
            $('.counter').addClass('hide')
            $('.preloader').addClass('active')
            $('.text-counter').addClass('active')
        }
    }, duration)
}
counter()