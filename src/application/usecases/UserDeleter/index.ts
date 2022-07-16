import { User } from '@src/domain/entities/User'
import { UserRepository } from '@src/domain/repositories/UserRepository'
import { UserGetterById } from '../../../domain/services/UserGetterById'
import { UserNotFoundException } from '../../../domain/exceptions/UserNotFoundException'

export class UserDeleterUseCase {
  private readonly _userRepository: UserRepository
  private readonly _userGetterById: UserGetterById

  constructor (userRepository: UserRepository) {
    this._userRepository = userRepository
    this._userGetterById = new UserGetterById(userRepository)
  }

  public async run (userId: string): Promise<User> {
    const userToBeDeleted: User | null = await this._userGetterById.run(userId)

    if (userToBeDeleted === undefined) throw new UserNotFoundException()
    await this._userRepository.delete(userToBeDeleted.id)
    return userToBeDeleted
  }
}
