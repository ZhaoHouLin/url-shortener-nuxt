import * as fs from 'node:fs'
import * as XLSX from 'xlsx'
XLSX.set_fs(fs)

export default defineEventHandler(async (event) => {
  const filePath = '@/../Data/url-data.json'

  let json = fs.readFileSync(filePath, 'utf8', (err, data) => {
    if (err) throw err
    const info = data.toString()

    return info
  })

  json = JSON.parse(json)

  return json

})