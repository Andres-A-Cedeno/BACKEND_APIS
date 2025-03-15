export enum AuthEnumState {
  ACTIVE = 1,
  INACTIVE = 0,
}

export enum AuthParams {
  dni = "ou_cedula",
  nickname = "ou_nicknameUsuario",
  name = "ou_nombreUsuario",
  lastName = "ou_apellidoUsuario",
  email = "ou_email",
  status = "ou_estado",
  departament = "ou_departamento",
  role = "ou_tipoUsuario",
  typeProcess = "ou_tipoproceso",
  outputParam = "ou_salida",
  executionRegister = "SP_LOGIN_USUARIO",
  executionLogin = "SP_CREARACTUALIZAR_USUARIO",
}
