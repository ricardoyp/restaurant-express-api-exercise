const express = require("express");
const app = express();
const PORT = 3000;

const router = require('./routes/plates');

app.use(express.json());
app.use('/', router);

app.listen(PORT, () => {
  console.log(`Running on PORT ${PORT} 🚀`)
});

