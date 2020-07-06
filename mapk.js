var map = L.map('map').setView([-0.067116, -78.403128], 12);

var puntosCasaInsitutos = [
    [    [-0.257128, -78.546270],[-0.225069,-78.5168959]],
    [    [-0.355708, -78.528793],[-0.225069,-78.5168959]],
    [    [-0.2537563,-78.5330725],[-0.225069,-78.5168959]],
    [    [-0.0866811,-78.5073176],[-0.225069,-78.5168959]],
    [    [-0.2235145,-78.5113281],[-0.225069,-78.5168959]],
    [    [-0.071850, -78.435068],[-0.225069,-78.5168959]],
    [    [-0.290397, -78.552108],[-0.225069,-78.5168959]],
    [    [-0.241768, -78.526977],[-0.225069,-78.5168959]],
    [    [-0.352055, -78.528046],[-0.225069,-78.5168959]],
]
var compañerosCasa = ['Kevin',
                    'Jazmin',
                    'Steven',
                    'Brayan',
                    'Jeniffer',
                    'Francisco',
                    'Kevin Quemag',
                    'Michael',
                    'Mauricio']
var distanciasDecimales = [];

var distanciasKm = [];

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

var myIcon = L.icon({
    iconUrl: 'facebook.svg',
    iconSize: [30, 30],
    iconAnchor: [15, 30],
});
var iconHome = L.icon({
    iconUrl: 'home.svg',
    iconSize: [30, 30],
    iconAnchor: [15, 30],
});
var iconInst = L.icon({
    iconUrl: 'placeholder.svg',
    iconSize: [30, 30],
    iconAnchor: [15, 30],
});

dibujarLineas(puntosCasaInsitutos);
distanciaEnKm(puntosCasaInsitutos);
distanciaDosPuntos(puntosCasaInsitutos);
dibujarPin(puntosCasaInsitutos,compañerosCasa);


function dibujarPin(puntos,compañeros){
    let auxArray = [];
    let numeroCompañero=0;
    for(let i =0; i<puntos.length;i++){
        for(let j = 0; j<2;j++){
            if(j==0)
            {
                auxArray = puntos[i][j];
                L.marker(auxArray, {icon: myIcon}).addTo(map)
                .bindPopup(' Casa de: '+compañeros[numeroCompañero]+ ' la distancia entre entre el Instituto y su casa en grados decimales es: '+ distanciasDecimales[numeroCompañero]+ " y su distancia en Km es :" +distanciasKm[numeroCompañero])
                .openPopup();
                numeroCompañero++;
            }
        }
    }
    L.marker([-0.225069,-78.5168959], {icon: iconInst}).addTo(map)
    .bindPopup('Tecnológico De Turismo Y Patrimonio "Yavirac')
    .openPopup();
} 

L.marker([-0.124883,  -78.515205], {icon: iconHome}).addTo(map)
    .bindPopup('Mi casa')
    .openPopup();

    L.polyline([[-0.124883,  -78.515205], [-0.225069,-78.5168959]]).addTo(map);

function dibujarLineas (puntos){
    for(let i=0 ;i<puntos.length ;i++){
        L.polyline(puntos[i], {color: colorRandom()}).addTo(map);
    }
}

function colorRandom(){
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

function distanciaDosPuntos(puntos){
    let distancia = 0;
    let institutoX = -0.225069;
    let institutoY = -78.5168959;
    let auxArray = []
    for(let i =0; i<puntos.length;i++){
        for(let j = 0; j<2;j++){
            if(j==0){  
                auxArray = puntos[i][j];
                distancia = Math.sqrt(Math.pow(institutoX-auxArray[0],2)+Math.pow(institutoY-auxArray[1],2))
                distanciasDecimales.push(distancia);
                console.log(distancia);
            }
        }
    }
}
function distanciaEnKm(puntos){
    console.log("ENTRE A LA FUNCION DE LO KM ")
    let instituto = turf.point([-0.225069,-78.5168959]);
    let auxArray=[];
    let options = {units: 'kilometers'};
    let distance = 0;
    let compañero =0
    for(let i=0;i<puntos.length;i++){
        for(let j=0;j<2;j++){
            if(j==0){
                auxArray = puntos[i][j];
                let casa = turf.point(auxArray);
                distance = turf.distance(instituto,auxArray , options);
                distanciasKm.push(distance);
                console.log(distanciasKm[compañero] + " casa de " + compañerosCasa[compañero])
                compañero++;
            }
        }
    }
}
