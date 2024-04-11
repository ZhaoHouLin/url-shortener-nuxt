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

  let redirectUrl = ''

  const filePath = '@/../Data/url-data.json'

  console.log(body.code)


  if (body.code && body.code != 'undefined') {
    // let json = fs.readFileSync(filePath, 'utf8', (err, data) => {
    //   if (err) throw err
    //   const info = data.toString()

    //   return info
    // })

    jsonData.map((item) => {
      if (item['短網址代碼'] == body.code) {
        // res.redirect(item['原網址'])
        redirectUrl = item['原網址']
      }
    })
  }

  return redirectUrl
})