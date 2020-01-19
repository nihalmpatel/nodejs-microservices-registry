const logger = require('../logger');
const semver = require('semver');

var services = {};
var timeout = process.env.SERVICE_TIMEOUT || 30;

function cleanup() {
    const now = Math.floor(new Date() / 1000);
    Object.keys(services).forEach((key) => {
        if (services[key].timestamp + timeout < now) {
        delete services[key];
        logger.debug(`Removed service ${key}`);
        }
    });
}

module.exports = {
    get: (name, version) => {
        cleanup();
        const candidates = Object.values(services).filter(service => service.name === name && semver.satisfies(service.version, version));

        return candidates[Math.floor(Math.random() * candidates.length)];
    },

    register: (name, version, ip, port) => {
        cleanup();
        const key = name + version + ip + port;

        if (!services[key]) {
            services[key] = {};
            services[key].timestamp = Math.floor(new Date() / 1000);
            services[key].ip = ip;
            services[key].port = port;
            services[key].name = name;
            services[key].version = version;
            logger.debug(`Added services ${name}, version ${version} at ${ip}:${port}`);
            return key;
        }
        services[key].timestamp = Math.floor(new Date() / 1000);
        logger.debug(`Updated services ${name}, version ${version} at ${ip}:${port}`);
        return key;
    },

    unregister(name, version, ip, port) {
        const key = name + version + ip + port;
        delete services[key];
        return key;
    }

}