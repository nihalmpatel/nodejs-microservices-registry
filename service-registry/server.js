const express = require('express');
const app = express();
const logger = require('./logger');
const service = require('./routes/service');
const PORT = process.env.PORT || 3000

// routes
app.use('/services', service);

// launch
app.listen(PORT, () => {
    logger.info('SERVICE STARTED AT PORT %d', PORT);
})
