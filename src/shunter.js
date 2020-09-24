/*eslint-env node */
'use strict';

const Docker = require('dockerode');
const RingElection = require('ring-election');
const RedBird = require('redbird');
const fs = require('fs');

try {
    /*
     *      Check docker socket
     */
    var socket = process.env.DOCKER_SOCKET || '/var/run/docker.sock';
    if (!fs.existsSync(socket)) {
        throw new Error('Are you sure the docker is running?');
    }

    var stats  = fs.statSync(socket);
    if (!stats.isSocket()) {
        throw new Error('Are you sure the docker is running?');
    }

    var docker = new Docker({ socketPath: socket });
    docker.listServices((err, list) => {
        if (err)
            throw new Error(err);

        for (service in list) {
            console.log(service.id);
        }
    });
} catch (err) {
    console.error(err);
    process.exit(1);
}