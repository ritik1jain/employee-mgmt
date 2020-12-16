const config = require("config");

const dbUsername = config.get("dbUsername");
const dbPassword = process.env.FAR_DB_PASSWORD;

function dbUriFunc(dbName) {
  const uri = `mongodb+srv://${dbUsername}:${dbPassword}@bill.3moso.mongodb.net/${dbName}?retryWrites=true&w=majority`;
  return uri;
}

exports.dbUriFunc = dbUriFunc;
