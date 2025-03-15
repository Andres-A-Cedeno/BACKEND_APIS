/**
 * CalendarEntity.ts
 * Entity class for calendar tasks with getters and setters
 */

export class CalendarEntity {
  private _userDni: number;
  private _clientDni: number;
  private _tittleTask: string;
  private _createdAt: Date;
  private _startTime: string; // Time stored as string in format HH:MM:SS
  private _endTime: string; // Time stored as string in format HH:MM:SS
  private _project: number;
  private _seccion: number;
  private _description: string;

  constructor(
    userDni: number,
    clientDni: number,
    tittleTask: string,
    createdAt: Date = new Date(),
    startTime: string,
    endTime: string,
    project: number,
    seccion: number,
    description?: string
  ) {
    this._userDni = userDni;
    this._clientDni = clientDni;
    this._tittleTask = tittleTask;
    this._createdAt = createdAt;
    this._startTime = startTime;
    this._endTime = endTime;
    this._project = project;
    this._seccion = seccion;
    this._description = description || "";
  }

  // Getters
  get userDni(): number {
    return this._userDni;
  }

  get clientDni(): number {
    return this._clientDni;
  }

  get tittleTask(): string {
    return this._tittleTask;
  }

  get createdAt(): Date {
    return this._createdAt;
  }

  get startTime(): string {
    return this._startTime;
  }

  get endTime(): string {
    return this._endTime;
  }

  get project(): number {
    return this._project;
  }

  get seccion(): number {
    return this._seccion;
  }

  get description(): string {
    return this._description;
  }

  // Setters
  set userDni(value: number) {
    this._userDni = value;
  }

  set clientDni(value: number) {
    this._clientDni = value;
  }

  set tittleTask(value: string) {
    this._tittleTask = value;
  }

  set createdAt(value: Date) {
    this._createdAt = value;
  }

  set startTime(value: string) {
    this._startTime = value;
  }

  set endTime(value: string) {
    this._endTime = value;
  }

  set project(value: number) {
    this._project = value;
  }

  set seccion(value: number) {
    this._seccion = value;
  }

  set description(value: string) {
    this._description = value;
  }

  // Convert entity to plain object for API responses or database operations
  toJSON() {
    return {
      userDni: this._userDni,
      clientDni: this._clientDni,
      tittleTask: this._tittleTask,
      fechaRegistro: this._createdAt.toISOString().split("T")[0], // Format as YYYY-MM-DD
      startTime: this._startTime,
      endTime: this._endTime,
      ou_proyecto: this._project,
      ou_seccion: this._seccion,
      ou_descripcion: this._description,
    };
  }

  // Create entity from plain object (e.g., from API request)
  static fromJSON(data: any): CalendarEntity {
    return new CalendarEntity(
      Number(data.userDni),
      Number(data.clientDni),
      data.tittleTask,
      data.fechaRegistro ? new Date(data.fechaRegistro) : new Date(),
      data.startTime,
      data.endTime,
      Number(data.ou_proyecto),
      Number(data.ou_seccion),
      data.ou_descripcion
    );
  }
}
