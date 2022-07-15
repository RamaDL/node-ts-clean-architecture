import { User } from '@src/domain/entities/User'
import { UserRepository } from '@src/domain/repositories/UserRepository'
import { ExistUserByUserName } from '../../../domain/services/ExistUserByUserame'
import { UserAlreadyExistException } from '../../../domain/exceptions/UserAlreadyExistException'

export class UserCreatorUseCase {
  private readonly _userRepository: UserRepository
  private readonly _existUserByUserName: ExistUserByUserName

  constructor (userRepository: UserRepository) {
    this._userRepository = userRepository
    this._existUserByUserName = new ExistUserByUserName(userRepository)
  }

  async run (body: User): Promise<User> {
    const existUser: boolean = await this._existUserByUserName.run(
      body.username
    )

    if (existUser) throw new UserAlreadyExistException()

    const userCreated: User = await this._userRepository.save(body)

    return userCreated
  }
}
