#!/usr/bin/env node

const { execFileSync } = require('child_process')

execFileSync(`${__dirname}/../../../electron/dist/electron`, [`${__dirname}/..`, ...process.argv.slice(2)])
