const express = require('express');
const app = express();
app.use(express.static('.'));
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`App on http://127.0.0.1:${PORT}`));
