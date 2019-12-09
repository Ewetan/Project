var input = document.querySelector("#input");
var latInput = document.querySelector("#latInput");
var longInput = document.querySelector("#longInput");

function autocomplete(input, latInput, longInput) {
  if (!input) return;

  const dropdown = new google.maps.places.Autocomplete(input);

  dropdown.addListener("place_changed", () => {
    const place = dropdown.getPlace();

    latInput.value = place.geometry.location.lat();
    longInput.value = place.geometry.location.lng();
  });
}

autocomplete(input, latInput, longInput);

function init() {
  const initialPosition = { lat: 6.4664, lng: 3.2003 };

  const map = new google.maps.Map(document.getElementById("map"), {
    center: initialPosition,
    zoom: 15,
    disableDefaultUI: true
  });

  const marker = new google.maps.Marker({
    map,
    position: initialPosition,
    scrollWheel: false
  });

  // Get user's location
  if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition(
      position =>
        console.log(
          `Lat: ${position.coords.latitude} Lng: ${position.coords.longitude}`
        ),
      err => alert(`Error (${err.code}): ${err.message}`)
    );
  } else {
    alert("Geolocation is not supported by your browser.");
  }

  navigator.geolocation.getCurrentPosition(
    // On success
    position =>
      console.log(
        `Lat: ${position.coords.latitude} Lng: ${position.coords.longitude}`
      ),
    // On error
    err => alert(`Error (${err.code}): ${err.message}`)
  );

  // marker.setPosition({
  //   lat: getCurrentPosition.coords.latitude,
  //   lng: getCurrentPosition.coords.longitude
  // });

  // map.panTo({
  //   lat: getCurrentPosition.coords.latitude,
  //   lng: getCurrentPosition.coords.longitude
  // });
}
