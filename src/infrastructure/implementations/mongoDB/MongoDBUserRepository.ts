import { UserEntity } from '@src/domain/entities/User'
import { UserRepository } from '@src/domain/repositories/UserRepository'
import { UserModelSchema } from '../../../infrastructure/driven-adapters/mongoDB/models/user'

export class MongoDBUserRepository implements UserRepository {
  async getAll (): Promise<UserEntity[]> {
    const users = await UserModelSchema.find()
    console.log(users)
    return users
  }

  async getById (id: string): Promise<UserEntity | null> {
    const user = await UserModelSchema.find({ id })
    console.log('getById: ', user)
    /* @ts-expect-error */
    return user
  }

  async getByUserName (username: string): Promise<UserEntity | null> {
    const user = await UserModelSchema.find({ username })
    console.log('getByUserName: ', user)
    /* @ts-expect-error */
    return user
  }

  async save (user: UserEntity): Promise<UserEntity> {
    /* @ts-expect-error */
    await UserModelSchema.save(user)
    console.log('save: ', user)
    return user
  }

  async update (user: UserEntity): Promise<UserEntity> {
    let userToBeUpdated = await UserModelSchema.find({ id: user.id })
    console.log('update to be: ', userToBeUpdated)
    /* @ts-expect-error */
    userToBeUpdated = user
    /* @ts-expect-error */
    userToBeUpdated.save()
    console.log('update updated: ', userToBeUpdated)
    return user
  }

  async delete (id: string): Promise<void> {
    await UserModelSchema.deleteOne({ id })
  }
}
