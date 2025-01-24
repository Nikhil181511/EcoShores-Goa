import React, { useEffect } from 'react';

// Helper function to calculate the total distance of a route
const calculateTotalDistance = (route) => {
  return route.reduce((totalDistance, segment) => totalDistance + segment, 0);
};

// Helper function to find the optimal route using brute force (not ideal for large sets of points)
const findOptimalRoute = (coordinates, router) => {
  const permutations = getPermutations(coordinates);
  let optimalRoute = null;
  let minimalDistance = Infinity;

  permutations.forEach((perm) => {
    const waypoints = perm.map((coord) => `geo!${coord.lat},${coord.lng}`);
    const routingParameters = {
      mode: 'fastest;car',
      representation: 'display',
      waypoints: waypoints.join(';'),
      routeattributes: 'summary',
    };

    // Calculate the route for this permutation
    router.calculateRoute(routingParameters, (result) => {
      if (result.response && result.response.route) {
        const distance = result.response.route[0].summary.distance;
        if (distance < minimalDistance) {
          minimalDistance = distance;
          optimalRoute = perm;
        }
      }
    }, (error) => {
      console.error('Error calculating route for permutation:', error.message);
    });
  });

  return optimalRoute;
};

// Helper function to generate all permutations of the points
const getPermutations = (arr) => {
  if (arr.length === 0) return [[]];
  const first = arr[0];
  const rest = arr.slice(1);
  const restPerms = getPermutations(rest);
  const perms = [];
  restPerms.forEach((perm) => {
    for (let i = 0; i <= perm.length; i++) {
      const newPerm = [...perm.slice(0, i), first, ...perm.slice(i)];
      perms.push(newPerm);
    }
  });
  return perms;
};

const TruckPath = () => {
  useEffect(() => {
    // Initialize HERE Maps API
    const platform = new window.H.service.Platform({
      apikey: 'ACR-fZbAZvsEmJyejgGVdFi-p6QKbf7aCmGeFrlJwKI', // Replace with your HERE Maps API key
    });

    // Obtain the default map layers
    const defaultLayers = platform.createDefaultLayers();

    // Initialize the map
    const map = new window.H.Map(
      document.getElementById('mapContainer'),
      defaultLayers.vector.normal.map,
      {
        center: { lat: 15.3402, lng: 73.9511 }, // Center around Don Bosco College of Engineering, Goa
        zoom: 14,
        pixelRatio: window.devicePixelRatio || 1,
      }
    );

    // Enable map interaction (zoom, pan, etc.)
    const behavior = new window.H.mapevents.Behavior(new window.H.mapevents.MapEvents(map));

    // Create the default UI components for map controls
    const ui = window.H.ui.UI.createDefault(map, defaultLayers);

    // Array of coordinates for the markers
    const coordinates = [
      { lat: 15.3402, lng: 73.96 }, // Don Bosco College of Engineering
      { lat: 15.3455, lng: 73.9510 }, // Example location 1
      { lat: 15.3460, lng: 73.98 }, // Example location 2
      { lat: 15.3460, lng: 73.99 }, // Additional locations
      { lat: 15.3460, lng: 73.97 },
      { lat: 15.34, lng: 73.99 },
      { lat: 15.35, lng: 73.999 },
    ];

    // Create a routing service
    const router = platform.getRoutingService(null, 8);

    // Function to add markers to the map
    const addMarkers = (coords) => {
      coords.forEach((coord) => {
        const marker = new window.H.map.Marker({ lat: coord.lat, lng: coord.lng });
        map.addObject(marker);
      });
    };

    // Add the markers to the map
    addMarkers(coordinates);

    // Function to calculate the optimal route and draw the path on the map
    const calculateOptimalRoute = () => {
      const optimalRoute = findOptimalRoute(coordinates, router);

      if (optimalRoute) {
        // Create a polyline to display the route on the map
        const lineString = new window.H.geo.LineString();
        optimalRoute.forEach((coord) => {
          lineString.pushLatLngAlt(coord.lat, coord.lng);
        });

        const routeLine = new window.H.map.Polyline(lineString, {
          style: { strokeColor: 'green', lineWidth: 5 },
        });

        map.addObject(routeLine);
        map.getViewModel().setLookAtData({
          bounds: routeLine.getBoundingBox(),
        });
      } else {
        console.error('No optimal route found');
      }
    };

    // Calculate and display the optimal route
    calculateOptimalRoute();

    return () => {
      const mapContainer = document.getElementById('mapContainer');
      if (mapContainer) mapContainer.innerHTML = ''; // Cleanup on unmount
    };
  }, []);

  return (
    <div style={{ textAlign: 'center', padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1 style={{ color: '#333', marginBottom: '10px' }}>See Truck Path</h1>
      <p style={{ color: '#555', fontSize: '18px' }}>
        View the real-time route of waste collection trucks in your area.
      </p>
      <div
        id="mapContainer"
        style={{
          width: '100%',
          height: '500px',
          margin: '0 auto',
          borderRadius: '10px',
          boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
        }}
      ></div>
    </div>
  );
};

export default TruckPath;
