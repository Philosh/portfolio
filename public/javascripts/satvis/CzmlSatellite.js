class CzmlSatellite {
  constructor(satName, satEpoch) {
    this.obj = {
      id: satName,
      name: satName,
      label: {
        text: satName,
        fillColor: {
          rgba: [255, 255, 255, 255],
        },
      },
      description:
        "<p style='font-size:20px'>X1 Is the first satellite to be launched by ICEYE Oy which is scheduled to be launched during the month of January in India</p>",
      path: {
        width: 2,
        leadTime: 2640,
        trailTime: 2640,
      },
      billboard: {
        eyeOffset: {
          cartesian: [0, 0, 0],
        },
        horizontalOrigin: "CENTER",
        image:
          "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAADJSURBVDhPnZHRDcMgEEMZjVEYpaNklIzSEfLfD4qNnXAJSFWfhO7w2Zc0Tf9QG2rXrEzSUeZLOGm47WoH95x3Hl3jEgilvDgsOQUTqsNl68ezEwn1vae6lceSEEYvvWNT/Rxc4CXQNGadho1NXoJ+9iaqc2xi2xbt23PJCDIB6TQjOC6Bho/sDy3fBQT8PrVhibU7yBFcEPaRxOoeTwbwByCOYf9VGp1BYI1BA+EeHhmfzKbBoJEQwn1yzUZtyspIQUha85MpkNIXB7GizqDEECsAAAAASUVORK5CYII=",
        pixelOffset: {
          cartesian2: [0, 0],
        },
        scale: 1.5,
        show: true,
        verticalOrigin: "CENTER",
      },
      model: {
        gltf: "SampleData/pfm_full_scaled_cesium.gltf",
        scale: 1,
        runAnimations: false,
        show: true,
      },
      position: {
        interpolationAlgorithm: "LAGRANGE",
        interpolationDegree: 5,
        epoch: satEpoch,
        cartesian: [],
      },
      orientation: {
        interpolationAlgorithm: "LINEAR",
        interpolationDegree: 1,
        epoch: satEpoch,
        unitQuaternion: [],
      },
    };
  }
  propagate(tle1, tle2) {
    // Sample TLE
    const tleLine1 =
        "1 25544U 98067A   19156.50900463  .00003075  00000-0  59442-4 0  9992",
      tleLine2 =
        "2 25544  51.6433  59.2583 0008217  16.4489 347.6017 15.51174618173442";

    // Initialize a satellite record
    const satrec = satellite.twoline2satrec(tleLine1, tleLine2);

    //  Propagate satellite using time since epoch (in minutes).
    const positionAndVelocity1 = satellite.sgp4(satrec, 60);

    //  Or you can use a JavaScript Date
    const positionAndVelocity = satellite.propagate(satrec, new Date());

    // The position_velocity result is a key-value pair of ECI coordinates.
    // These are the base results from which all other coordinates are derived.
    const positionEci = positionAndVelocity.position;

    // You will need GMST for some of the coordinate transforms.
    // http://en.wikipedia.org/wiki/Sidereal_time#Definition
    const gmst = satellite.gstime(new Date());

    // You can get ECF, Geodetic, Look Angles, and Doppler Factor.
    const positionEcf = satellite.eciToEcf(positionEci, gmst),
      positionGd = satellite.eciToGeodetic(positionEci, gmst);

    // The coordinates are all stored in key-value pairs.
    // ECI and ECF are accessed by `x`, `y`, `z` properties.
    const satelliteX = positionEcf.x,
      satelliteY = positionEcf.y,
      satelliteZ = positionEcf.z;

    // Geodetic coords are accessed via `longitude`, `latitude`, `height`.
    const longitude = positionGd.longitude,
      latitude = positionGd.latitude,
      height = positionGd.height;

    const coords = [0, satelliteX * 1000, satelliteY * 1000, satelliteZ * 1000];

    console.log("satCoords", coords);
  }
}
