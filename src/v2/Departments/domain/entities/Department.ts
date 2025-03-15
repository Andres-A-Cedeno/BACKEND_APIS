export class Department {
  private id: number;
  private nombre: string;

  constructor(id: number, name: string) {
    this.id = id;
    this.nombre = name;
  }

  public getId(): number {
    return this.id || 0;
  }

  public getName(): string {
    return this.nombre;
  }

  public setId(id: number): void {
    this.id = id;
  }

  public setName(name: string): void {
    this.nombre = name;
  }

  public toJSON() {
    return {
      id: this.id,
      nombre: this.nombre,
    };
  }
}
