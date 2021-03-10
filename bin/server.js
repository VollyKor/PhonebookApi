const app = require("../app");
const db = require("../model/db");
const debug = require("debug")("phonebookapi:server");

const PORT = normalizePort(process.env.PORT || "3000");
app.set("port", PORT);

app.listen(PORT, () => {
  console.log(`Server running. Use our API on port: ${PORT}`);
});

function normalizePort(val) {
  const port = parseInt(val, 10);
  if (isNaN(port)) {
    return val;
  }
  if (port >= 0) {
    return port;
  }
  return false;
}
