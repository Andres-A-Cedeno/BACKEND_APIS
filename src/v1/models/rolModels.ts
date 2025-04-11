export interface Role {
  id?: string;
  name: string;
  action?: string;
  menu?: string[];
  state?: boolean;
}

export interface userRole {
  idrol: number;
  iduser: string;
}
