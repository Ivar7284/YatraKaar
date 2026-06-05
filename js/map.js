// Interactive Map Initialization Module

document.addEventListener('DOMContentLoaded', () => {
  const mapEls = document.querySelectorAll('.interactiveMap');
  
  if(mapEls.length === 0) return;

  mapEls.forEach(mapEl => {
    // If it's already initialized, skip
    if (mapEl._leaflet_id) return;

    const map = L.map(mapEl, { scrollWheelZoom: false }).setView([22.5, 79.0], 4);
    
    // Using CartoDB Dark Matter (No Labels) to prevent drawing incorrect borders
    // We will overlay our own correct GeoJSON
    L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_nolabels/{z}/{x}/{y}{r}.png', {
      attribution: '&copy; <a href="https://carto.com/attributions">CARTO</a>',
      subdomains: 'abcd',
      maxZoom: 19
    }).addTo(map);

    // Optional: Re-enable scroll zoom when user clicks on map
    map.on('focus', () => { map.scrollWheelZoom.enable(); });
    map.on('blur', () => { map.scrollWheelZoom.disable(); });

    // Load Indian Government Approved Borders GeoJSON
    fetch('public/india-simplified.geojson')
      .then(response => {
        if (!response.ok) throw new Error('GeoJSON not found');
        return response.json();
      })
      .then(data => {
        L.geoJSON(data, {
          style: {
            color: 'rgba(230,184,79,0.3)', // gold color for border
            weight: 1.5,
            fillColor: '#111024', // match the dark theme
            fillOpacity: 0.5
          }
        }).addTo(map);
      })
      .catch(err => console.log('Error loading official borders:', err));

    const locations = [
      { name: 'Hyderabad', lat: 17.3850, lng: 78.4867, img: 'public/images/logo.png', isLogo: true },
      { name: 'Char Dham', lat: 30.7352, lng: 79.0669, img: 'public/images/hero-chardham.png' },
      { name: 'Rishikesh', lat: 30.0869, lng: 78.2676, img: 'public/images/dest-adventure.png' },
      { name: 'Haridwar', lat: 29.9457, lng: 78.1642, img: 'public/images/dest-adventure.png' },
      { name: 'Hemkund Sahib', lat: 30.6997, lng: 79.6158, img: 'public/images/dest-adventure.png' },
      { name: 'Ayodhya', lat: 26.7922, lng: 82.1998, img: 'public/images/dest-ayodhya.png' },
      { name: 'Mathura', lat: 27.4924, lng: 77.6737, img: 'public/images/dest-ayodhya.png' },
      { name: 'Vrindavan', lat: 27.5650, lng: 77.6593, img: 'public/images/dest-ayodhya.png' },
      { name: 'Chitrakoot', lat: 25.1764, lng: 80.8409, img: 'public/images/dest-ayodhya.png' },
      { name: 'Naimisharanya', lat: 27.3486, lng: 80.4855, img: 'public/images/dest-ayodhya.png' },
      { name: 'Kashi', lat: 25.3176, lng: 82.9739, img: 'public/images/dest-kashi.png' },
      { name: 'Prayagraj', lat: 25.4358, lng: 81.8463, img: 'public/images/dest-kashi.png' },
      { name: 'Puri', lat: 19.8135, lng: 85.8312, img: 'public/images/dest-kashi.png' },
      { name: 'Konark', lat: 19.8876, lng: 86.0945, img: 'public/images/dest-kashi.png' },
      { name: 'Tirupati', lat: 13.6288, lng: 79.4192, img: 'public/images/dest-tirupati.png' },
      { name: 'Ahobilam', lat: 15.1325, lng: 78.6806, img: 'public/images/dest-tirupati.png' },
      { name: 'Srisailam', lat: 16.0722, lng: 78.8686, img: 'public/images/dest-jyotirlinga.png' },
      { name: 'Somnath', lat: 20.8880, lng: 70.4012, img: 'public/images/dest-jyotirlinga.png' },
      { name: 'Dwaraka', lat: 22.2442, lng: 68.9685, img: 'public/images/dest-shirdi.png' },
      { name: 'Nashik', lat: 20.0039, lng: 73.7844, img: 'public/images/dest-jyotirlinga.png' },
      { name: 'Ujjain', lat: 23.1765, lng: 75.7885, img: 'public/images/dest-jyotirlinga.png' },
      { name: 'Rameswaram', lat: 9.2876, lng: 79.3129, img: 'public/images/dest-south-temple.png' },
      { name: 'Madurai', lat: 9.9252, lng: 78.1198, img: 'public/images/dest-south-temple.png' },
      { name: 'Arunachalam', lat: 12.2300, lng: 79.0667, img: 'public/images/dest-south-temple.png' },
      { name: 'Thiruvananthapuram', lat: 8.5241, lng: 76.9366, img: 'public/images/dest-south-temple.png' },
      { name: 'Nepal (Pashupatinath)', lat: 27.7106, lng: 85.3488, img: 'public/images/dest-hero.png' },
      { name: 'Muktinath', lat: 28.8175, lng: 83.8711, img: 'public/images/dest-hero.png' }
    ];

    locations.forEach(loc => {
      let iconHtml = '<div style="background:#e6b84f;width:12px;height:12px;border-radius:50%;box-shadow:0 0 10px #e6b84f; border: 2px solid #111024; cursor:pointer;"></div>';
      
      if(loc.isLogo) {
        iconHtml = '<div style="background:#fff; border-radius:12px; overflow:hidden; border:2px solid #e6b84f; box-shadow:0 0 15px #e6b84f; width:45px; height:45px; display:flex; align-items:center; justify-content:center; cursor:pointer;"><img src="' + loc.img + '" style="width:90%;height:90%;object-fit:contain;"></div>';
      }

      const icon = L.divIcon({
        html: iconHtml,
        className: 'custom-leaflet-icon',
        iconSize: loc.isLogo ? [45, 45] : [12, 12],
        iconAnchor: loc.isLogo ? [22, 22] : [6, 6]
      });

      const marker = L.marker([loc.lat, loc.lng], {icon: icon}).addTo(map);
      
      // Update: Show preview on hover
      const tooltipContent = '<div style="text-align:center; margin: 0; padding: 0;">' +
                            '<div style="border-radius:6px; overflow:hidden; width:140px; height:90px; margin-bottom: 5px;">' +
                              '<img src="' + loc.img + '" style="width:100%; height:100%; object-fit:cover;">' +
                            '</div>' +
                            '<span>' + loc.name + '</span>' +
                          '</div>';
                          
      marker.bindTooltip(tooltipContent, { 
        className: 'custom-tooltip',
        direction: 'top',
        offset: [0, -10]
      });
    });
  });
});
