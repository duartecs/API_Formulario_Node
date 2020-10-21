const JWT = require("jsonwebtoken");

const secret = "UeDJxHBocBtlnDztgISI1UlaG5DBieqbTOk1TXw7nihD4rliPqHtPzzI3zsIz0oOFawq+FzG6wCwdn/dCh4XBmldj1GdvWQDw5WScggsa73AcWJf8t7u+ZGByHAkhvBKdACv4phQKzawgBS4ERplehpLG0fho9+HvnlJRRzy8JVBYDMhSgSrs1lu6rC1rv8zqrIBIQm4T2NGs2yUa1UK+YEFU2abBSK0SPGzx5BIEex1CJ47s6hcbKUVHQ0auSPgTgYZak2aWaTiLexu9zhQIPlizaV7T+cGB9kZIK6LWUfc+bSE3ZDtzBExO2QpSAuFnSzS245tIOyn8O0jORjsuQ==";

module.exports = {
  getToken: (usuario) => {
    const JWTData = {
      iss: "teste-api",
      sub: usuario.login,
    };
    return new Promise((resolve, reject) => {
      JWT.sign(JWTData, secret, { algorithm: "HS256" }, (err, token) => {
        if (err) {
          reject("Deu ruim JWT: " + err);
          console.log(err)
        }
        resolve(token);
      });
    });
  },

  verifyToken: (token) => {
    return new Promise((resolve, reject) => {
      if (JWT.verify(token, secret)) {
        resolve(JWT.decode(token));
      } else {
        reject("Token invalido");
      }
    });
  },
};
