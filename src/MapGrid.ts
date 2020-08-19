import { SVG, Svg } from "@svgdotjs/svg.js";
import { Floor } from "./Floor";
import find from "lodash.find";

export interface Placeable {
  isWalkable: boolean;
  color: string;
}

interface PositionedPlaceable {
  element: Placeable;
  x: number;
  y: number;
}

export class MapGrid {
  private gridContent: Placeable[][];
  private canvas: Svg;
  private realWidth: number;
  private realHeight: number;
  private singleElementWidth: number;
  private singleElementHeight: number;

  constructor(gridContent: Placeable[][]) {
    this.gridContent = gridContent;
    this.canvas = SVG()
      .addTo("#map")
      .size(this.width * 100, this.height * 100);
    this.realHeight = this.height * 100;
    this.realWidth = this.width * 100;
    this.singleElementWidth = this.realWidth / this.width;
    this.singleElementHeight = this.realHeight / this.height;
  }

  get width(): number {
    const gridLengths = this.gridContent.map((horizontal) => horizontal.length);
    return Math.max(...gridLengths);
  }

  get height(): number {
    return this.gridContent.length;
  }

  public draw(): void {
    this.canvas.rect(this.realWidth, this.realHeight).fill("#f06");
    this.gridContent.forEach((horizontal: Placeable[], i: number) => {
      horizontal.forEach((element: Placeable, j: number) => {
        this.canvas
          .rect(this.singleElementWidth, this.singleElementHeight)
          .attr({
            x: this.singleElementWidth * j,
            y: this.singleElementHeight * i
          })
          .fill(element.color);
      });
    });
  }

  public findSurroundingWalkables(
    startX: number,
    startY: number,
    potentialStartpoints: PositionedPlaceable[] = [],
    walkables: PositionedPlaceable[] = []
  ): PositionedPlaceable[] {
    //TODO: Account for the cases where +1 and -1 access nonexistent index
    const start = {
      element: this.gridContent[startY][startX],
      x: startX,
      y: startY
    };
    const leftAndRight = [
      {
        element:
          this.gridContent[startY][startX + 1] &&
          this.gridContent[startY][startX + 1],
        x: startX + 1,
        y: startY
      },
      {
        element:
          this.gridContent[startY][startX - 1] &&
          this.gridContent[startY][startX - 1],
        x: startX - 1,
        y: startY
      }
    ];
    const aboveAndBelow = [
      {
        element:
          this.gridContent[startY + 1] && this.gridContent[startY + 1][startX],
        x: startX,
        y: startY + 1
      },
      {
        element:
          this.gridContent[startY - 1] && this.gridContent[startY - 1][startX],
        x: startX,
        y: startY - 1
      }
    ];
    const surrounding = [...leftAndRight, ...aboveAndBelow];
    const walkablePlaceables: PositionedPlaceable[] = surrounding.filter(
      (positionedPlaceable: PositionedPlaceable) => {
        return (
          positionedPlaceable.element &&
          positionedPlaceable.element.isWalkable &&
          find(walkables, positionedPlaceable) === undefined
        );
      }
    );
    potentialStartpoints = potentialStartpoints.concat(walkablePlaceables);
    walkables.push(start);
    console.log("walkables", walkables);
    if (potentialStartpoints.length !== 0) {
      console.log("startpoints", potentialStartpoints);
      const newStart = potentialStartpoints.pop();
      console.log("newstart", newStart, potentialStartpoints);
      if (newStart === undefined) {
        throw new Error("newStart is undefined");
      }

      return this.findSurroundingWalkables(
        newStart.x,
        newStart.y,
        potentialStartpoints,
        walkables
      );
    }

    return walkables;
  }

  public drawValidRoutes(startX: number, startY: number): void {
    //TODO: check if start point is walkable element
    const walkables = this.findSurroundingWalkables(startX, startY);

    walkables.forEach((walkable) => {
      this.canvas
        .rect(this.singleElementWidth / 3, this.singleElementHeight)
        .attr({ x: walkable.x * 100, y: walkable.y * 100 })
        .fill("#00FF00");
    });
  }
}
