import * as fs from 'node:fs'

export default defineEventHandler(async (event) => {
  const filePath = '@/../Data/url-data.json'

  const body = await readBody(event)
  console.log(body.code)

  let redirectUrl = ''

  if (body.code && body.code != 'undefined') {
    let json = fs.readFileSync(filePath, 'utf8', (err, data) => {
      if (err) throw err
      const info = data.toString()

      return info
    })

    JSON.parse(json).map((item) => {
      if (item['短網址代碼'] == body.code) {
        // res.redirect(item['原網址'])
        redirectUrl = item['原網址']
      }
    })
  }

  return redirectUrl
})