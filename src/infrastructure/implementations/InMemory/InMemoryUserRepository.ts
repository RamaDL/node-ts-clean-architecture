import { UserEntity } from '@src/domain/entities/User'
import { UserRepository } from '@src/domain/repositories/UserRepository'

export class InMemoryUserRepository implements UserRepository {
  private _userData: UserEntity[] = []

  async getAll (): Promise<UserEntity[]> {
    return this._userData
  }

  async save (user: UserEntity): Promise<UserEntity> {
    this._userData.push(user)
    return user
  }

  async getByUserName (username: string): Promise<UserEntity | null> {
    const userFound = this._userData.find(x => x.username === username)

    if (userFound === undefined) return null

    return userFound
  }

  async update (user: UserEntity): Promise<UserEntity> {
    const users = this._userData.filter(x => x.id !== user.id)
    users.push(user)
    this._userData = users
    return user
  }

  async delete (userId: string): Promise<void> {
    this._userData = this._userData.filter(x => x.id !== userId)
  }

  async getById (id: string): Promise<UserEntity | null> {
    const user: UserEntity[] | null = this._userData.filter(x => x.id === id)

    if (user.length > 0) return user[0]

    return null
  }
}
