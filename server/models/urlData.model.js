import mongoose from "mongoose"

// people schema
const schema = new mongoose.Schema({
  url: {
    type: String,
  },
  code: {
    type: String,
  },

})

const data = mongoose.model("zz-url", schema, "urlData")

// people model
export default data
