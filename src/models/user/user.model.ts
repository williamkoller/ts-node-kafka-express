import mongoose from 'mongoose'
import { randomUUID } from 'node:crypto'

const userSchema = new mongoose.Schema(
  {
    _id: {
      type: String,
      default: function genUuid() {
        return randomUUID()
      },
    },
    name: {
      type: String,
      require: true,
    },
    surname: {
      type: String,
      require: true,
    },
    age: {
      type: Number,
      require: true,
    },
  },
  {
    timestamps: true,
  }
)

const User = mongoose.model('User', userSchema)

export { User }
