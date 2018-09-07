const { readFileSync, outputJsonSync } = require('fs-extra')
const { spawnSync } = require('child_process')

const apiResponse = readFileSync(`${__dirname}/dist/api_start2`).toString()

const parseApi = s => {
  try {
    return JSON.parse(s.replace(/^.*svdata=/, '')).api_data
  } catch (_) {
    return null
  }
}

const sortKeys = o => {
  Object.keys(o)
    .sort()
    .forEach(k => {
      const v = o[k]
      delete o[k]
      o[k] = v
    })
}

const api = parseApi(apiResponse)

sortKeys(api.api_mst_const)

outputJsonSync(`${__dirname}/../kancolle-data/dist/api_start2.json`, api, { spaces: 2 })

console.log('saved api_start2.json')

const ts = new Date().toISOString().split('T')[0]

spawnSync('git', ['-C', `${__dirname}/../kancolle-data`, 'add', '.'])
spawnSync('git', ['-C', `${__dirname}/../kancolle-data`, 'commit', '-m', `"chore: autoupdate api_start2 for ${ts}"`])
spawnSync('git', ['-C', `${__dirname}/../kancolle-data`, 'push'])

console.log('pushed api_start2.json to kancolle-data')
