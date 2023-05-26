const satName = ["IS"];
const czmlObj = new Czml();

console.log("czmlObj", czmlObj);

const czmlDataSource = new Cesium.CzmlDataSource();

// Initialize the Cesium Viewer in the HTML element with the `cesiumContainer` ID.
const viewer = new Cesium.Viewer("cesiumContainer", {
  terrainProvider: Cesium.createWorldTerrain({
    requestWaterMask: true,
  }),
});

viewer.dataSources.add(czmlDataSource);

viewer.entities.add({
  name: "Equator",
  polyline: {
    positions: Cesium.Cartesian3.fromDegreesArray([
      -180, 0, -90, 0, 0, 0, 90, 0, 180, 0,
    ]),

    loop: true,
    width: 2,
    material: new Cesium.Color(1, 1, 1, 1),
  },
});
console.log(satName);
