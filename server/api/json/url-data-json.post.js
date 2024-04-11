import * as fs from 'node:fs'

export default defineEventHandler(async (event) => {
  const filePath = '@/../Data/url-data.json'
  let json = fs.readFileSync(filePath, 'utf8', (err, data) => {
    if (err) throw err
    const info = data.toString()
    // info = JSON.parse(info)
    return info
  })

  const body = await readBody(event)

  let jsonParse = JSON.parse(json)

  const originUrl = body.url

  const urlData = {
    "原網址": '',
    "短網址代碼": ''
  }

  const repeat = jsonParse.find((item, idx, arr) => {
    return item["原網址"] == originUrl
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
    // console.log('data', data)
    const code = randomCode(digits)

    let result = data.find((item) => {
      // console.log(code)
      return item["短網址代碼"] == code
    })

    if (result == undefined) {
      return code
    } else {
      checkRepeatCode(digits, data)
    }
  }


  if (repeat == undefined) {
    urlData["原網址"] = originUrl
    urlData["短網址代碼"] = checkRepeatCode(5, jsonParse)
    jsonParse.push(urlData)
  } else {
    urlData["短網址代碼"] = repeat["短網址代碼"]
  }

  let result = JSON.stringify(jsonParse)

  fs.writeFile(filePath, result, (err) => {
    if (err) {
      console.error(err)
    }
    console.log('Successful')
  })

  return urlData["短網址代碼"]
})