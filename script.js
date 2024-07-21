// script.js

// Función para inicializar el mapa
function initMap() {
  // Crear el mapa y establecer la vista inicial
  var map = L.map('map').setView([51.505, -0.09], 13);

  // Añadir un mapa base de OpenStreetMap
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(map);

  // Intentar obtener la ubicación del usuario
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      function (position) {
        var pos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };

        // Colocar un marcador en la ubicación del usuario
        L.marker(pos).addTo(map)
          .bindPopup('Tu ubicación actual').openPopup();

        // Centrar el mapa en la ubicación del usuario
        map.setView(pos, 13);
      },
      function () {
        handleLocationError(true, map.getCenter());
      }
    );
  } else {
    // El navegador no soporta geolocalización
    handleLocationError(false, map.getCenter());
  }
}

// Manejo de errores de geolocalización
function handleLocationError(browserHasGeolocation, pos) {
  var message = browserHasGeolocation
    ? "Error: El servicio de geolocalización falló."
    : "Error: Tu navegador no soporta geolocalización.";
  L.popup()
    .setLatLng(pos)
    .setContent(message)
    .openOn(map);
}

// Llamar a la función para inicializar el mapa cuando la página se haya cargado
window.onload = initMap;
