const satName = ["ISS"];
const czmlObj = new Czml();

console.log("czmlObj", czmlObj);

const czmlDataSource = new Cesium.CzmlDataSource();

// Initialize the Cesium Viewer in the HTML element with the `cesiumContainer` ID.
const viewer = new Cesium.Viewer("cesiumContainer", {
  terrainProvider: Cesium.createWorldTerrain({
    requestWaterMask: true,
  }),
});

const viewerClock = viewer.clock;

const ISSTle = `ISS (ZARYA)\n
1 25544U 98067A   23146.80130009  .00012707  00000-0  22864-3 0  9999\n
2 25544  51.6416  74.5455 0005483  22.6152  73.9832 15.50194644398475`;

viewer.dataSources.add(czmlDataSource);

// Adding basic Lines in a globe
const addBasicFeatures = () => {
  //Add Equator
  viewer.entities.add({
    name: "Equator",
    polyline: {
      positions: Cesium.Cartesian3.fromDegreesArray([
        -180, 0, -90, 0, 0, 0, 90, 0, 180, 0,
      ]),

      loop: true,
      width: 1.5,
      material: new Cesium.Color(1, 0.85, 0.69, 0.38),
    },
  });

  //Add prime meridian
  viewer.entities.add({
    name: "PrimeMeridian",
    polyline: {
      positions: Cesium.Cartesian3.fromDegreesArray([
        0, -180, 0, -90, 0, 0, 0, 90, 0, 180,
      ]),

      loop: true,
      width: 1.5,
      material: new Cesium.Color(1, 1, 1, 1),
    },
  });

  let lon = -180;
  const lat1 = 23.43717;
  const lat2 = -23.43717;
  const lat3 = 65.8256;
  const lat4 = -65.8256;
  const pos1 = [];
  const pos2 = [];
  const arctic = [];
  const antartic = [];
  for (let i = 0; i < 360; i++) {
    pos1.push(lon, lat1);
    pos2.push(lon, lat2);
    arctic.push(lon, lat3);
    antartic.push(lon, lat4);
    lon++;
  }

  //Add other Lines
  viewer.entities.add({
    name: "Cancer dashed line",
    polyline: {
      positions: Cesium.Cartesian3.fromDegreesArray(pos1),
      width: 1,
      material: new Cesium.PolylineDashMaterialProperty({
        color: new Cesium.Color(0.33, 0.93, 0.79, 0.4),
      }),
    },
  });

  viewer.entities.add({
    name: "Capricorn dashed line",
    polyline: {
      positions: Cesium.Cartesian3.fromDegreesArray(pos2),
      width: 1,
      material: new Cesium.PolylineDashMaterialProperty({
        color: new Cesium.Color(0.33, 0.93, 0.79, 0.4),
      }),
    },
  });

  viewer.entities.add({
    name: "Arctic dashed line",
    polyline: {
      positions: Cesium.Cartesian3.fromDegreesArray(arctic),
      width: 1,
      material: new Cesium.PolylineDashMaterialProperty({
        color: new Cesium.Color(0.33, 0.93, 0.79, 0.4),
      }),
    },
  });

  viewer.entities.add({
    name: "Antartic dashed line",
    polyline: {
      positions: Cesium.Cartesian3.fromDegreesArray(antartic),
      width: 1,
      material: new Cesium.PolylineDashMaterialProperty({
        color: new Cesium.Color(0.33, 0.93, 0.79, 0.4),
      }),
    },
  });
};

const setClockMultiplier = (clock, multiplier) => {
  clock._multiplier = multiplier;
};

addBasicFeatures();
setClockMultiplier(viewerClock, 1);
viewer.clockViewModel.shouldAnimate = true;
const cesiumSat = new CzmlSatellite(satName, getCzmlEpoch(new Date()));
cesiumSat.propagate(1, 2);

console.log(cesiumSat);
