

        const coordinates=JSON.parse(vehcule).location
        const emplacemnts=JSON.parse(vehcule).routing
        const id=JSON.parse(vehcule)._id
        console.log(coordinates)
        let marker;
        mapboxgl.accessToken = 'pk.eyJ1IjoiYmFjaGlyNjEzIiwiYSI6ImNsM2o0NWNmZTAwY2Ezam5tdDhqcW90YWwifQ.bdlvYq2FfibbXixqjhv1ig';
        const map = new mapboxgl.Map({
            container: 'map', // container ID
            style: 'mapbox://styles/mapbox/streets-v11', // style URL
            center: coordinates[coordinates.length-1], // starting position [lng, lat]
            zoom: 6 // starting zoom
        });
        for(let i=0;i<emplacemnts.length;i++){
         marker = new mapboxgl.Marker({ color: 'black' })
        .setLngLat(coordinates[i])
        .setPopup(
            new mapboxgl.Popup({ offset: 25 }) // add popups
              .setHTML(
                `<div >
                   <h4>${emplacemnts[i]}</h4>
                   <a href="/palettes/${id}/${emplacemnts[i]}" class="btn stretched-link">Details</a>
                </div>`
              )
          )
        .addTo(map);
        }
        map.addControl(new mapboxgl.NavigationControl());