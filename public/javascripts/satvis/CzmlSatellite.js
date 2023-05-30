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
        "<p style='font-size:20px'>The International Space Station is the largest modular space station in low Earth orbit. The project involves five space agencies: the United States' NASA, Russia's Roscosmos, Japan's JAXA, Europe's ESA, and Canada's CSA.</p>",
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
        "1 25544U 98067A   23149.25829992  .00013900  00000-0  24880-3 0  9993",
      tleLine2 =
        "2 25544  51.6433  62.3698 0005487  31.7591 105.9049 15.50253786398851";

    // Initialize a satellite record
    const satrec = satellite.twoline2satrec(tleLine1, tleLine2);
    const coords = [];

    for (let i = 0; i < 360; i++) {
      //  Or you can use a JavaScript Date
      const positionAndVelocity = satellite.propagate(
        satrec,
        new Date(new Date().getTime() + i * 60000)
      );

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

      coords.push(
        i * 60,
        satelliteX * 1000,
        satelliteY * 1000,
        satelliteZ * 1000
      );
    }
    this.obj["position"]["cartesian"] = coords;
  }
}
