const express = require('express');
const service = express.Router();
const serviceRegistry = require('../controllers/serviceRegistry');

service.put('/register/:servicename/:serviceversion/:serviceport', (req, res) => {
    const { servicename, serviceversion, serviceport } = req.params;
    const serviceip = req.connection.remoteAddress.includes('::') ? `[${req.connection.remoteAddress}]` : req.connection.remoteAddress;
    const serviceKey = serviceRegistry.register(servicename, serviceversion, serviceip, serviceport);

    return res.json({ result: serviceKey });
});

service.delete('/register/:servicename/:serviceversion/:serviceport', (req, res) => {
    const { servicename, serviceversion, serviceport } = req.params;
    const serviceip = req.connection.remoteAddress.includes('::') ? `[${req.connection.remoteAddress}]` : req.connection.remoteAddress;
    const serviceKey = serviceRegistry.unregister(servicename, serviceversion, serviceip, serviceport);
    return res.json({ result: serviceKey });
});

service.get('/find/:servicename/:serviceversion', (req, res) => {
    const { servicename, serviceversion } = req.params;
    const svc = serviceRegistry.get(servicename, serviceversion);
    if (!svc) return res.status(404).json({ result: 'Service not found' });
    return res.json(svc);
});

module.exports = service;