export class RoleModel {
  private name: string;
  private id?: number;
  private menu?: { idMenu: number; nameScreens: string }[];
  private action?: string;
  private state?: boolean;

  constructor(
    name: string,
    id?: number,
    menu?: { idMenu: number; nameScreens: string }[],
    action?: string,
    state?: boolean
  ) {
    this.id = id;
    this.name = name;
    this.action = action;
    this.menu = menu || [];
    this.state = state;
  }

  // Getters
  public getId(): number | undefined {
    return this.id;
  }

  public getName(): string {
    return this.name;
  }

  public getAction(): string | undefined {
    return this.action;
  }

  public getMenu(): { idMenu: number; nameScreens: string }[] {
    return this.menu || [];
  }

  public getState(): boolean | undefined {
    return this.state;
  }

  // Setters
  public setId(id: number): void {
    this.id = id;
  }

  public setName(name: string): void {
    this.name = name;
  }

  public setAction(action: string): void {
    this.action = action;
  }

  public setMenu(menu: { idMenu: number; nameScreens: string }[]): void {
    this.menu = menu;
  }

  public setState(state: boolean): void {
    this.state = state;
  }

  // Convertir a JSON para respuestas API
  public toJSON(): object {
    return {
      id: this.id,
      name: this.name,
      action: this.action,
      menu: this.menu,
      state: this.state,
    };
  }
}
