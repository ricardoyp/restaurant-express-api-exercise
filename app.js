const express = require("express");
const app = express();
const PORT = 3000;

const router = require('./routes');

app.use(express.json());
app.use('/rest', router);

app.listen(PORT, () => {
  console.log(`Running on PORT ${PORT} 🚀`)
});

