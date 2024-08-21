import * as fs from 'node:fs'

export default defineEventHandler(async (event) => {

  const body = await readBody(event)

  const urlData = await urlModel.find()

  let redirectUrl = ''

  if (body.code && body.code != 'undefined') {
    urlData.map((item) => {
      if (item['code'] == body.code) {
        redirectUrl = item['url']
      }
    })

  }

  return redirectUrl
})