
      var input = document.querySelector('#input');
      var latInput = document.querySelector('#latInput');
      var longInput = document.querySelector('#longInput');

      function autocomplete(input, latInput, longInput) {
        if (!input) return;

        const dropdown = new google.maps.places.Autocomplete(input);

        dropdown.addListener('place_changed', () => {
          const place = dropdown.getPlace();

          latInput.value = place.geometry.location.lat();
          longInput.value = place.geometry.location.lng();

        });
      }

      

      autocomplete(input, latInput, longInput);

