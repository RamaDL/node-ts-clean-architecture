import mongoose, { model, Schema } from 'mongoose'
import { UserEntity } from '@src/domain/entities/User'

type UserDoc = UserEntity & mongoose.Document

const UserSchema = new Schema<UserDoc>({
  id: { type: String },
  name: { type: String, required: true },
  username: { type: String, require: true },
  age: { type: Number, required: false }
})

export const UserModelSchema = model<UserDoc>('users', UserSchema)
