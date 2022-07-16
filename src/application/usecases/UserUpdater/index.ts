import { User } from '@src/domain/entities/User'
import { UserRepository } from '@src/domain/repositories/UserRepository'
import { UserGetterById } from '../../../domain/services/UserGetterById'

export class UserUpdaterUseCase {
  private readonly _userRepository: UserRepository
  private readonly _userGetterById: UserGetterById

  constructor (userRepository: UserRepository) {
    this._userRepository = userRepository
    this._userGetterById = new UserGetterById(userRepository)
  }

  async run (data: User): Promise<User> {
    const user: User = await this._userGetterById.run(
      data.id
    )

    const updatedData: User = {
      age: data.age ?? user.age,
      name: data.name ?? user.name,
      username: data.username ?? user.username,
      id: data.id
    }

    const userUpdated = await this._userRepository.update(updatedData)

    return userUpdated
  }
}
