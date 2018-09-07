const { readFileSync, outputJsonSync } = require('fs-extra')
const { spawnSync } = require('child_process')
const sortKeys = require('sort-keys')
const { json } = require('generate-schema')

const parseApi = s => sortKeys(JSON.parse(s.replace(/^.*svdata=/, '')).api_data, { deep: true })

const sh = (command, ...args) => {
  const { stderr, stdout } = spawnSync(command, args)
  process.stdout.write(stderr.toString() || stdout.toString())
}

const apiResponse = readFileSync(`${__dirname}/dist/api_start2`).toString()

const api = parseApi(apiResponse)

outputJsonSync(`${__dirname}/../kancolle-data/dist/api_start2.json`, api, { spaces: 2 })

console.log('saved api_start2.json')

outputJsonSync(`${__dirname}/../kancolle-data/dist/api_start2.schema.json`, json(api), { spaces: 2 })

console.log('saved api_start2.schema.json')

const ts = new Date().toISOString().split('T')[0]

sh('git', '-C', `${__dirname}/../kancolle-data`, 'add', '.')
sh('git', '-C', `${__dirname}/../kancolle-data`, 'commit', '-m', `chore: autoupdate api_start2 for ${ts}`)
sh('git', '-C', `${__dirname}/../kancolle-data`, 'push')
