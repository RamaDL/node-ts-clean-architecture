import { User } from '@src/domain/entities/User'
import { UserRepository } from '@src/domain/repositories/UserRepository'

export class InMemoryUserRepository implements UserRepository {
  private _userData: User[] = []

  async getAll (): Promise<User[]> {
    return this._userData
  }

  async save (user: User): Promise<User> {
    this._userData.push(user)
    return user
  }

  async getByUserName (username: string): Promise<User | null> {
    const userFound = this._userData.find(x => x.username === username)

    if (userFound === undefined) return null

    return userFound
  }

  async update (user: User): Promise<User> {
    const users = this._userData.filter(x => x.id !== user.id)
    users.push(user)
    this._userData = users
    return user
  }

  async delete (user: User): Promise<void> {

  }

  async getById (id: string): Promise<User | null> {
    const user: User[] | null = this._userData.filter(x => x.id === id)

    if (user.length > 0) return user[0]

    return null
  }
}
