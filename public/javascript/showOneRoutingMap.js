
const va=JSON.parse(vehiculeActif)
let marker;
mapboxgl.accessToken = 'pk.eyJ1IjoiYmFjaGlyNjEzIiwiYSI6ImNsM3UwM2JvdzA4NmkzZXFwMzBqcXhqYncifQ.0X6T98MdEYNQbWGZ9m4rgg';
        const map = new mapboxgl.Map({
            container: 'map3', // container ID
            style: 'mapbox://styles/mapbox/streets-v11', // style URL
            center: va.location[0], // starting position [lng, lat]
            zoom: 6 // starting zoom
        });
        for(let i=0;i<va.routing.length;i++){
            marker = new mapboxgl.Marker({ color: 'black' ,symbol:`${i+1}`})
           .setLngLat(va.location[i])
           .setPopup(
               new mapboxgl.Popup({ offset: 25 }) // add popups
                 .setHTML(
                   `<div style='border-radius: 30px;'>
                      <h4>${va.routing[i]}</h4>
                      <a href="/palettes/${va._id}/${va.routing[i]}" class="btn stretched-link">Details</a>
                   </div>`
                 )
             )
           .addTo(map);
           }
           map.addControl(new mapboxgl.NavigationControl());