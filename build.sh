#!/bin/bash

# Minify JavaScript
uglifyjs --compress --mangle -- src/ip_to_hosting_fetch.js > dist/ipToHosting.min.js