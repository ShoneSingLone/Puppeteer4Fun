// myscript.js
var oracledb = require("oracledb");
var mypw = "Oracle";

oracledb.getConnection(
  {
    user: "scott",
    password: mypw,
    connectString: "192.168.225.130/orcl",
  },
  function (err, connection) {
    if (err) {
      console.error(err.message);
      return;
    }
    connection.execute(
      `select count(*) from BONUS;`,
      [103], // bind value for :id
      function (err, result) {
        if (err) {
          console.error(err.message);
          doRelease(connection);
          return;
        }
        console.log(result.rows);
        doRelease(connection);
      }
    );
  }
);

function doRelease(connection) {
  connection.close(function (err) {
    if (err) console.error(err.message);
  });
}
