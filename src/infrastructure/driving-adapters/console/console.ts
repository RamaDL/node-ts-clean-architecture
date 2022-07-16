import { User } from '@src/domain/entities/User'
import { UserCreatorUseCase } from '../../../application/usecases/UserCreator'
import { UserGetterUseCase } from '../../../application/usecases/UserGetter/index'
import { UserUpdaterUseCase } from '../../../application/usecases/UserUpdater'
import { UserDeleterUseCase } from '../../../application/usecases/UserDeleter'
import { InMemoryUserRepository } from '../../../infrastructure/implementations/InMemory/InMemoryUserRepository'

(async () => {
  const inMemoruUserRepo = new InMemoryUserRepository()
  const userCreatorUseCase = new UserCreatorUseCase(inMemoruUserRepo)
  const userGetterUseCase = new UserGetterUseCase(inMemoruUserRepo)
  const userUpdaterUseCase = new UserUpdaterUseCase(inMemoruUserRepo)
  const userDeleterUseCase = new UserDeleterUseCase(inMemoruUserRepo)
  const userToBeCreated: User = {
    name: 'John',
    age: 12,
    username: 'JD',
    id: '1'
  }
  console.log('Fetching users...')
  let users: User[] = []
  users = await userGetterUseCase.run()
  console.log('Current users:', users, '\n')

  // Create user
  console.log(`Creating user ${userToBeCreated.username}...`)
  await userCreatorUseCase.run(userToBeCreated)
  console.log('User successfully created.')
  users = await userGetterUseCase.run()
  console.log('Current users:', users, '\n')

  // Update user
  const dataToUpdate: User = { ...userToBeCreated, username: 'JhonyCotolongo' }
  console.log(`Updting user ${dataToUpdate.username}...`)
  await userUpdaterUseCase.run(dataToUpdate)
  users = await userGetterUseCase.run()
  console.log('Current users:', users, '\n')

  // Update user
  console.log(`Deleting user ${dataToUpdate.username}...`)
  await userDeleterUseCase.run('1')
  users = await userGetterUseCase.run()
  console.log('Current users:', users, '\n')
})()
