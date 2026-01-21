// wherever you create solarData (e.g. src/data/solarData.js)
import {
  mercury,
  venus,
  earth,
  mars,
  jupiter,
  saturn,
  saturnRing,
  uranus,
  uranusRing,
  neptune
} from "../assets/planets";

const solarData = [
  { name: "Mercury", url: mercury, radius: 0.383 },
  { name: "Venus",   url: venus,   radius: 0.949 },
  { name: "Earth",   url: earth,   radius: 1.0 },
  { name: "Mars",    url: mars,    radius: 0.532 },
  { name: "Jupiter", url: jupiter, radius: 11.21 },
  { name: "Saturn",  url: saturn,  radius: 9.45, ringUrl: saturnRing },
  { name: "Uranus",  url: uranus,  radius: 4.01, ringUrl: uranusRing },
  { name: "Neptune", url: neptune, radius: 3.88 }
];

export default solarData;
