import * as fs from 'node:fs'
import urlModel from '../models/urlData.model'

export default defineEventHandler(async (event) => {

  const body = await readBody(event)

  const { url } = body


  const urlData = await urlModel.find()

  const urlTempData = {
    "url": '',
    "code": ''
  }

  const repeatData = urlData.find((item, idx, arr) => {
    return item["url"] == url
  })

  //  隨機取得由大小寫及數字組成的亂數
  const randomCode = (digits) => {
    let code = ""
    let codeList = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"
    for (let i = 0; i < digits; i++)
      code += codeList.charAt(Math.floor(Math.random() * codeList.length))
    return code
  }

  const checkRepeatCode = (digits, data) => {
    const code = randomCode(digits)

    let result = data.find((item) => {
      return item["code"] == code
    })

    if (result == undefined) {
      return code
    } else {
      checkRepeatCode(digits, data)
    }
  }

  if (repeatData == undefined) {
    urlTempData["url"] = url
    urlTempData["code"] = checkRepeatCode(5, urlData)
    const newUrlData = new urlModel(urlTempData)
    await newUrlData.save()
  } else {
    urlTempData["code"] = repeatData["code"]
  }


  return urlTempData.code
})