import { UserEntity } from '@src/domain/entities/User'
import { UserRepository } from '@src/domain/repositories/UserRepository'

export class UserGetterUseCase {
  private readonly _userRepository: UserRepository

  constructor (userRepository: UserRepository) {
    this._userRepository = userRepository
  }

  async run (): Promise<UserEntity[]> {
    const users: UserEntity[] = await this._userRepository.getAll()
    return users
  }
}
