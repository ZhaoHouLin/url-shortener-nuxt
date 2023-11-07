import mongoose from "mongoose"

// schema
const schema = new mongoose.Schema({
  url: {
    type: String,
  },
  code: {
    type: String,
  },

})

const data = mongoose.model("zz-url", schema, "urlData")

// model
export default data
