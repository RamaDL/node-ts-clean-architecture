import { UserRepository } from '@src/domain/repositories/UserRepository'
import { UserAlreadyExistException } from '../../../domain/exceptions/UserAlreadyExistException'

export class ExistUserByUserName {
  private readonly _userRepository: UserRepository

  constructor (userRepository: UserRepository) {
    this._userRepository = userRepository
  }

  async run (username: string): Promise<boolean> {
    const user = await this._userRepository.getByUserName(username)

    if (user !== null) throw new UserAlreadyExistException()

    return false
  }
}
