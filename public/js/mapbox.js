export const displayMap = locations => {
  mapboxgl.accessToken = 'pk.eyJ1IjoiY2FybG9zYXJhIiwiYSI6ImNrbmV2c3R5ZzBhZmIycG1tZ3R0Z3R2Z3gifQ.-1.5.1';

  var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/carlosara/ckp4b4q5z0z2r17o3z3w5u3x4',
    scrollZoom: false,
    // center: [-118.113491, 34.111745],
    // zoom: 10,
    // interactive: false
  });

  const bounds = new mapboxgl.LngLatBounds();

  locations.forEach(loc => {
    // Create marker
    const el = document.createElement('div');
    el.className = 'marker';

    // Add marker
    new mapboxgl.Marker({
      element: el,
      anchor: 'bottom'
    }).setLngLat(loc.coordinates).addTo(map);

    // Add popup
    new mapboxgl
      .Popup({
        offset: 30
      })
      .setLngLat(loc.coordinates)
      .setHTML(`<p>Day ${loc.day}: ${loc.description}</p>`)
      .addTo(map);

    // Extend map bounds to include current location
    bounds.extend(loc.coordinates)
  });


  map.fitBounds(bounds, {
    padding: {
      top: 200,
      bottom: 150,
      left: 100,
      right: 100
    }
  });

};

