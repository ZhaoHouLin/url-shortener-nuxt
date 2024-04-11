import * as fs from 'node:fs'
import * as XLSX from 'xlsx'
XLSX.set_fs(fs)

export default defineEventHandler(async (event) => {
  const XLSXfilePath = '@/../Data/url-data.xlsx'

  // 讀取 XLSX 檔案
  const workbook = XLSX.readFile(XLSXfilePath)
  // 獲取工作表的名稱
  const sheetName = workbook.SheetNames[0]
  // 獲取工作表的資料
  const worksheet = workbook.Sheets[sheetName]
  // 將工作表轉換為 JSON 格式
  const jsonData = XLSX.utils.sheet_to_json(worksheet)

  const body = await readBody(event)

  const originUrl = body.url

  const urlData = {
    "原網址": '',
    "短網址代碼": ''
  }

  const repeat = jsonData.find((item, idx, arr) => {
    originUrl.replace(/\s*/g, "")
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
    if (originUrl !== '') {
      urlData["原網址"] = originUrl
    }
    urlData["短網址代碼"] = checkRepeatCode(5, jsonData)
    // 獲取工作表中現有的資料範圍
    const range = XLSX.utils.decode_range(worksheet['!ref'])
    // 將新資料追加到現有資料範圍之後
    const newRow = range.e.r + 1
    XLSX.utils.sheet_add_json(worksheet, [urlData], { skipHeader: true, origin: newRow })
    // 將工作表寫回到 XLSX 檔案中
    XLSX.writeFile(workbook, XLSXfilePath)
  } else {
    urlData["短網址代碼"] = repeat["短網址代碼"]
  }

  return urlData["短網址代碼"]
})