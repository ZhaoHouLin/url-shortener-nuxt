import mongoose from "mongoose"

export default async (_nitroApp) => {

  const username = encodeURIComponent('ZZ')
  const password = encodeURIComponent('1qaz@WSX')
  const database = 'zz-url'

  try {
    mongoose.set("strictQuery", true)  // 嚴格模式
    await mongoose.connect(
      `mongodb+srv://${username}:${password}@raiden-nuxt3.9z6hyp9.mongodb.net/${database}`
    )
    console.log("連接 MongoDB")
  } catch (e) {
    console.error("Error MongoDB =>", e)
  }
}
