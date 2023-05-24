"use strict";

class Czml {
  constructor() {
    this.czmlObj = [
      {
        id: "document",
        name: "SimpleExample",
        description: "A simple example",
        version: "1.0",
        clock: {
          interval: "",
          currentTime: "",
        },
      },
      {
        id: "Facility/KSAT",
        name: "KSAT",

        description:
          "<!--HTML-->\r\n<p>\r\n Knongsberg Satellite Services AS or KSAT is an operator of satellite ground stations based in Svalbard, Norway. It is a joint venture equally owned by the Kongsberg Group and the Norwegian Space Centre, the latter owned by the Ministry of Trade and Industry. KSAT has three main ground stations: Tromsø Satellite Station, Svalbard Satellite Station and Troll Satellite Station. The company is chaired by Tormod Hermansen since 2013.",
        billboard: {
          eyeOffset: {
            cartesian: [0, 0, 0],
          },
          horizontalOrigin: "CENTER",
          image:
            "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAACvSURBVDhPrZDRDcMgDAU9GqN0lIzijw6SUbJJygUeNQgSqepJTyHG91LVVpwDdfxM3T9TSl1EXZvDwii471fivK73cBFFQNTT/d2KoGpfGOpSIkhUpgUMxq9DFEsWv4IXhlyCnhBFnZcFEEuYqbiUlNwWgMTdrZ3JbQFoEVG53rd8ztG9aPJMnBUQf/VFraBJeWnLS0RfjbKyLJA8FkT5seDYS1Qwyv8t0B/5C2ZmH2/eTGNNBgMmAAAAAElFTkSuQmCC",
          pixelOffset: {
            cartesian2: [0, 0],
          },
          scale: 1.5,
          show: true,
          verticalOrigin: "CENTER",
        },
        label: {
          fillColor: {
            rgba: [0, 255, 255, 255],
          },
          font: "11pt Lucida Console",
          horizontalOrigin: "LEFT",
          outlineColor: {
            rgba: [0, 0, 0, 255],
          },
          outlineWidth: 2,
          pixelOffset: {
            cartesian2: [12, 0],
          },
          show: true,
          style: "FILL_AND_OUTLINE",
          text: "Svalbard",
          verticalOrigin: "CENTER",
        },
        position: {
          cartographicDegrees: [15.389123, 78.230127, 459],
        },
      },
      {
        id: "Facility/TrollSAT",
        name: "TrollSAT",

        description:
          "<!--HTML-->\r\n<p>\r\n The TrollSat ground station is ideal for LEOP, TT&C and data dump services. TrollSat provides S- and X-band support from 7.3 meter systems and communication via geostationary satellites and two independent earth terminals. The communication terminals provide narrow- and broadband communication between Antarctica and Europe/US tailored to the user’s needs. The station is equipped with a complete backend/frontend system for TT&C operations. KSAT also has the ability to support onsite integration of mission specific TT&C equipment as defined by the user. ",
        billboard: {
          eyeOffset: {
            cartesian: [0, 0, 0],
          },
          horizontalOrigin: "CENTER",
          image:
            "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAACvSURBVDhPrZDRDcMgDAU9GqN0lIzijw6SUbJJygUeNQgSqepJTyHG91LVVpwDdfxM3T9TSl1EXZvDwii471fivK73cBFFQNTT/d2KoGpfGOpSIkhUpgUMxq9DFEsWv4IXhlyCnhBFnZcFEEuYqbiUlNwWgMTdrZ3JbQFoEVG53rd8ztG9aPJMnBUQf/VFraBJeWnLS0RfjbKyLJA8FkT5seDYS1Qwyv8t0B/5C2ZmH2/eTGNNBgMmAAAAAElFTkSuQmCC",
          pixelOffset: {
            cartesian2: [0, 0],
          },
          scale: 1.5,
          show: true,
          verticalOrigin: "CENTER",
        },
        label: {
          fillColor: {
            rgba: [0, 255, 255, 255],
          },
          font: "11pt Lucida Console",
          horizontalOrigin: "LEFT",
          outlineColor: {
            rgba: [0, 0, 0, 255],
          },
          outlineWidth: 2,
          pixelOffset: {
            cartesian2: [12, 0],
          },
          show: true,
          style: "FILL_AND_OUTLINE",
          text: "TrollSAT",
          verticalOrigin: "CENTER",
        },
        position: {
          cartographicDegrees: [2.53838, -72.0117, 1400],
        },
      },
      {
        id: "sunTerminator",
        name: "sunlight/penumbra",
        polyline: {
          positions: [],
          width: 1,
          material: {
            solidColor: {
              color: {
                rgba: [255, 230, 0, 102],
              },
            },
          },
          show: true,
          loop: true,
          interpolationAlgorithm: "LAGRANGE",
          interpolationDegree: 5,
        },
      },
      {
        id: "shadowTerminator",
        name: "sunlight/penumbra",
        polyline: {
          positions: [],
          width: 1,
          material: {
            solidColor: {
              color: {
                rgba: [0, 115, 255, 102],
              },
            },
          },
          show: true,
          loop: true,
          interpolationAlgorithm: "LAGRANGE",
          interpolationDegree: 5,
        },
      },
    ];
  }
}
