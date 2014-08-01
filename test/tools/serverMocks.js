/*
 * Copyright 2013 Telefonica Investigación y Desarrollo, S.A.U
 *
 * This file is part of fiware-orion-pep
 *
 * fiware-orion-pep is free software: you can redistribute it and/or
 * modify it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the License,
 * or (at your option) any later version.
 *
 * fiware-orion-pep is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.
 * See the GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public
 * License along with fiware-orion-pep.
 * If not, seehttp://www.gnu.org/licenses/.
 *
 * For those usages not covered by the GNU Affero General Public License
 * please contact with::[daniel.moranjimenez@telefonica.com]
 */

'use strict';

var express = require('express'),
    http = require('http'),
    https = require('https');

function startMock(port, callback) {
    var app = express(),
        mocks;

    app.set('port', port);
    app.set('host', '0.0.0.0');
    app.use(express.json());
    app.use(express.urlencoded());
    app.use(app.router);

    var server = http.createServer(app);

    server.listen(app.get('port'), app.get('host'), function (error) {
        callback(error, server, app);
    });
}

function stopMock(server, callback) {
    server.close(callback);
}

function mock(code) {
    return function(req, res) {
        res.json(code, {});
    };
}

function mockPath(url, app, callback) {
    app.delete(url, mock(200));
    app.get(url, mock(200));
    app.post(url, mock(200));
    app.put(url, mock(200));
    callback();
}

exports.start = startMock;
exports.stop = stopMock;
exports.mockPath = mockPath;