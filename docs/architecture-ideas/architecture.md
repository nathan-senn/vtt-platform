# Store basierte Architektur

Vorteile:
- data sharing: react und Pixi.js teilen sich die selben Daten was zu einem konsistenten Blick auf die Daten führt
- updates (mutations) sind React kompatibel (wird von der aktuellen Store Implementierung gehandhabt)
- Lässt uns die socket.io Interaktionen abstrahieren
    - Sync Strategien:
        - Local first
            + eigenen Store mit neuen Daten updaten
            + Socket.io broadcast an andere Clients mit den neuen Daten
            + Store der anderen Clients mit neuen Daten updaten
        - Remote first
            + Socket.io broadcast an alle Clients mit den neuen Daten
            + Store aller Clients mit neuen Daten updaten
- Lässt uns Business Logik zwischen React und Pixi.JS teilen

