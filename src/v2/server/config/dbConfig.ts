export const ENV = {
  develop: process.env.NODE_ENV || "development",
  port: process.env.PORT || 3000,
  jwtSecret: "inveligent@2025",
  jwtRefreshSecret: "inveligent@2025@refresh",
  jwtAccessExpiration: "1h",
  jwtRefreshExpiration: "7d",

  //Database
  DB_SERVER_PORT: "1435",
  DB_USER: "sa",
  DB_PASSWORD: "789dtl@",
  DB_SERVER: "192.168.1.216/SQL2019",
  DB_DATABASE: "CONTROL_PROYECTOS",

  //SMTP
  SMTP_HOST: "smtp.gmail.com",
  SMTP_PORT: "587",
  //SMTP_SECURE_OLD = false
  SMTP_USER: "proyectos.inveligent@gmail.com",
  SMTP_PASSWORD: "jvph mgzc lyay tyhb",
  FRONTEND_URL: "http://localhost:4200",
};

export const config = {
  user: ENV.DB_USER! || "",
  password: ENV.DB_PASSWORD! || "",
  server: ENV.DB_SERVER! || "",
  database: ENV.DB_DATABASE! || "",
  port: parseInt(ENV.DB_SERVER_PORT || "1433"),
  options: {
    encrypt: true,
    trustServerCertificate: true,
  },
};

//SMTP
