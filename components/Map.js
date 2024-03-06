// MapComponent.js
import React, { useRef, useEffect } from "react";
import { WebView } from "react-native-webview";

const Map = React.forwardRef(
  ({ markers, onMessage }, ref) => {
    const webViewRef = useRef(null);

    useEffect(() => {
      if (ref) {
        ref.current = webViewRef.current;
      }
    }, [ref]);

    const handleMessage = (event) => {
      const { data } = event.nativeEvent;
      onMessage(data);
    };

    const htmlContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <link rel="stylesheet" href="https://unpkg.com/leaflet/dist/leaflet.css" />
          <style>
            body {
              margin: 0;
              height: 100vh;
            }
            #map {
              height: 100%;
            }
          </style>
        </head>
        <body>
          <div id="map"></div>
          <script src="https://unpkg.com/leaflet/dist/leaflet.js"></script>
          <script>
            try {
              // Créer une carte sans le contrôle de zoom par défaut
              var map = L.map('map', { zoomControl: false }).setView([50.627942, 3.070897], 16);

              // Ajouter une couche de tuiles (map) à la carte
              L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
                attribution: '© OpenStreetMap contributors', opacity: 0.9,
              }).addTo(map);

              ${markers.map(
                ({ id, coordinates, imagePath }) => `
                  var customIcon = L.icon({
                    iconUrl: "${imagePath}",
                    iconSize: [44, 62],
                    iconAnchor: [20, 62],
                    popupAnchor: [0, -40]
                  });
                  var marker = L.marker(${JSON.stringify(coordinates)}, { icon: customIcon, id: ${id} }).addTo(map);
                  marker.on('click', function () { window.ReactNativeWebView.postMessage(String(${id})); map.setView(${JSON.stringify(coordinates)}, 22); });
                `
              ).join('\n')}

            } catch (error) {
              alert("Error provider loading!")
            }
          </script>
        </body>
      </html>
      `;

    return (
      <WebView
        ref={webViewRef}
        source={{ html: htmlContent }}
        style={{ flex: 1 }}
        onLoad={() => console.log("WebView loaded successfully")}
        onError={(syntheticEvent) => {
          const { nativeEvent } = syntheticEvent;
          console.error("WebView error: ", nativeEvent);
        }}
        onMessage={handleMessage}
      />
    );
  }
);

export default Map;
