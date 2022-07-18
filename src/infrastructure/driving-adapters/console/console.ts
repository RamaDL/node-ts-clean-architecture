import { UserEntity } from '@src/domain/entities/User'
import { UserGetterUseCase } from '../../../application/usecases/UserGetter/index'
import { UserCreatorUseCase } from '../../../application/usecases/UserCreator'
// import { UserUpdaterUseCase } from '../../../application/usecases/UserUpdater'
// import { UserDeleterUseCase } from '../../../application/usecases/UserDeleter'
// import { InMemoryUserRepository } from '../../../infrastructure/implementations/InMemory/InMemoryUserRepository'
import { mongoDBConnect } from '../../../infrastructure/driven-adapters/mongoDB'
import { MONGODB_URI } from '../../../config'
import { MongoDBUserRepository } from '../../implementations/mongoDB/MongoDBUserRepository'

(async () => {
  // In memory storaga
  // const repository = new InMemoryUserRepository()
  // MongoDB storage
  await mongoDBConnect(MONGODB_URI ?? 'a')
  const repository = new MongoDBUserRepository()
  const userGetterUseCase = new UserGetterUseCase(repository)
  const userCreatorUseCase = new UserCreatorUseCase(repository)
  // const userUpdaterUseCase = new UserUpdaterUseCase(repository)
  // const userDeleterUseCase = new UserDeleterUseCase(repository)
  const userToBeCreated: UserEntity = {
    name: 'John',
    age: 12,
    username: 'JD',
    id: '1'
  }
  console.log('Fetching users...')
  let users: UserEntity[] = []
  users = await userGetterUseCase.run()
  console.log('Current users:', users, '\n')

  // Create user
  console.log(`Creating user ${userToBeCreated.username}...`)
  await userCreatorUseCase.run(userToBeCreated)
  console.log('User successfully created.')
  users = await userGetterUseCase.run()
  console.log('Current users:', users, '\n')

  // // Update user
  // const dataToUpdate: UserEntity = { ...userToBeCreated, username: 'JhonyCotolongo' }
  // console.log(`Updting user ${dataToUpdate.username}...`)
  // await userUpdaterUseCase.run(dataToUpdate)
  // users = await userGetterUseCase.run()
  // console.log('Current users:', users, '\n')

  // // Update user
  // console.log(`Deleting user ${dataToUpdate.username}...`)
  // await userDeleterUseCase.run('1')
  // users = await userGetterUseCase.run()
  // console.log('Current users:', users, '\n')
})()
