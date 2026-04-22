const enviar = document.getElementById("enviar");

enviar.addEventListener("click", buscarClima);

function obtenerIcono(codigo) {

    if (codigo === 0){
        return "☀️";
    } 
    if (codigo >= 1 && codigo <= 3){
        return "⛅";
    } 
    if (codigo >= 45 && codigo <= 48) {
        return "🌫️";
    }
    if (codigo >= 51 && codigo <= 55) {
        return "🌦️";
    }
    if (codigo >= 61 && codigo <= 65) {
        return "🌧️";
    }
    if (codigo >= 71 && codigo <= 77) {
        return "❄️";
    }
    if (codigo >= 80 && codigo <= 82) {
        return "🌧️";
    }
    if (codigo >= 95) {
        return "⛈️";
    }
    return "🌤️";
}

function cambiarFondo(codigo) {

    let fondo = "";

    if (codigo === 0) {
        fondo = "url(nivel1.jpg)";
    }
    else if (codigo >= 1 && codigo <= 3) {
        fondo = "url(nivel123.jpg)";
    }
    else if (codigo >= 45 && codigo <= 65) {
        fondo = "url(nivel4548.jpg)";
    }
    else if (codigo >= 71 && codigo <= 77) {
        fondo = "url(nivel5155.jpg)";
    }
    else if (codigo >= 95) {
        fondo = "url(nivel90.jpg)";
    }
    else {
        fondo = "linear-gradient(to right, #4facfe, #00f2fe)";
    }

    document.body.style.background = fondo;
}

async function buscarClima() {

    const ciudad = document.getElementById("input-ciudad").value;

    if (!ciudad) return;

    try {

        const geoUrl = `https://geocoding-api.open-meteo.com/v1/search?name=${ciudad}&count=1&language=es`;

        const geoResponse = await fetch(geoUrl);
        const geoData = await geoResponse.json();

        if (!geoData.results) {
            document.getElementById("resultado").innerHTML = "Ciudad no encontrada";
            return;
        }

        const lat = geoData.results[0].latitude;
        const lon = geoData.results[0].longitude;
        const nombreReal = geoData.results[0].name;

        const weatherUrl = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true&timezone=auto`;

        const weatherResponse = await fetch(weatherUrl);
        const weatherData = await weatherResponse.json();

        const temp = weatherData.current_weather.temperature;
        const viento = weatherData.current_weather.windspeed;
        const codigo = weatherData.current_weather.weathercode;

        const icono = obtenerIcono(codigo);

        cambiarFondo(codigo);

        document.getElementById("resultado").innerHTML = `
      <h3>${nombreReal} ${icono}</h3>
      <p>🌡️ Temperatura: ${temp} °C</p>
      <p💨 Viento: ${viento} km/h</p>
    `;

    } catch (error) {
        console.error(error);
        document.getElementById("resultado").innerHTML = "Error obteniendo el clima";
    }
}