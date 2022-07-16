import { User } from '@src/domain/entities/User'
import { UserCreatorUseCase } from '../../../application/usecases/UserCreator'
import { UserGetterUseCase } from '../../../application/usecases/UserGetter/index'
import { UserUpdaterUseCase } from '../../../application/usecases/UserUpdater'
import { InMemoryUserRepository } from '../../../infrastructure/implementations/InMemory/InMemoryUserRepository'

(async () => {
  const inMemoruUserRepo = new InMemoryUserRepository()
  const userCreatorUseCase = new UserCreatorUseCase(inMemoruUserRepo)
  const userGetterUseCase = new UserGetterUseCase(inMemoruUserRepo)
  const userUpdaterUseCase = new UserUpdaterUseCase(inMemoruUserRepo)
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
  console.log('User successfully created.', '\n')

  console.log('Fetching users...')
  users = await userGetterUseCase.run()
  console.log('Current users:', users, '\n')

  // Update user
  const dataToUpdate: User = { ...userToBeCreated, username: 'JhonyCotolongo' }
  console.log(`Updting user ${dataToUpdate.username}...`)
  await userUpdaterUseCase.run(dataToUpdate)
  console.log('Current users:', users, '\n')

  console.log('Fetching users...')
  users = await userGetterUseCase.run()
  console.log('Current users:', users, '\n')
})()
