import { User } from '@src/domain/entities/User'
import { UserRepository } from '@src/domain/repositories/UserRepository'

export class InMemoryUserRepository implements UserRepository {
  public readonly _userData: User[] = []

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
    return user
  }

  async delete (user: User): Promise<void> {

  }

  async getById (id: string): Promise<User | null> {
    return null
  }
}
