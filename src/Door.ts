export class Door {
  public isOpen: boolean = false;

  constructor(isOpen = false) {
    this.isOpen = isOpen;
  }

  public get isWalkable(): boolean {
    return this.isOpen;
  }

  public get color(): string {
    return this.isOpen ? "#FF7F00" : "#FF0000";
  }

  public open() {
    this.isOpen = true;
  }

  public close() {
    this.isOpen = false;
  }
}
