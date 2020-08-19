// model map as Map class with width and height as a grid
// model doors as separate classes with state of closed and open
// map has an array of doors that contains doors
// doors also have a position on the grid that is saved on their instance
// map has a draw function, that draws the map to the dom
// map has a show open pathways function, that draws open pathways into the map.
// map is being drawn on canvas
// map also contains information about walls

import { MapGrid } from "./MapGrid";
import { Door } from "./Door";
import { Wall } from "./Wall";
import { Floor } from "./Floor";

const gridContent = [
  [new Wall(), new Door(), new Wall()],
  [new Wall(), new Floor(), new Wall(), new Wall(), new Wall(), new Wall()],
  [
    new Wall(),
    new Floor(),
    new Door(true),
    new Floor(),
    new Floor(),
    new Wall()
  ],
  [new Wall(), new Floor(), new Wall(), new Wall(), new Wall(), new Wall()],
  [new Wall(), new Door(), new Wall()],
  [new Wall(), new Floor(), new Wall()],
  [new Wall(), new Floor(), new Wall()],
  [new Wall(), new Wall(), new Wall()]
];
const myMap = new MapGrid(gridContent);
myMap.draw();
myMap.drawValidRoutes(1, 2);
