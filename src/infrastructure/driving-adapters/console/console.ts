import { User } from '@src/domain/entities/User'
import { UserCreatorUseCase } from '../../../application/usecases/UserCreator'
import { UserGetterUseCase } from './../../../application/usecases/UserGetter/index'
import { InMemoryUserRepository } from '../../../infrastructure/implementations/InMemory/InMemoryUserRepository'

(async () => {
  const inMemoruUserRepo = new InMemoryUserRepository()
  const userCreatorUseCase = new UserCreatorUseCase(inMemoruUserRepo)
  const userGetterUseCase = new UserGetterUseCase(inMemoruUserRepo)
  const userToBeCreated: User = {
    name: 'John',
    age: 12,
    username: 'JD',
    id: 'manana'
  }
  console.log('Fetching users...')
  let users: User[] = []
  users = await userGetterUseCase.run()
  console.log('Current users:', users, '\n')

  console.log(`Creating user ${userToBeCreated.name}...`)
  await userCreatorUseCase.run(userToBeCreated)
  console.log('User successfully created.', '\n')

  console.log('Fetching users...')
  users = await userGetterUseCase.run()
  console.log('Current users:', users, '\n')
})()
