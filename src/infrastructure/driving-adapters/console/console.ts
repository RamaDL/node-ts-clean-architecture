import { User } from '@src/domain/entities/User'
import { UserCreatorUseCase } from '../../../application/usecases/UserCreator'
import { InMemoryUserRepository } from '../../../infrastructure/implementations/InMemory/InMemoryUserRepository'

(async () => {
  const inMemoruUserRepo = new InMemoryUserRepository()
  console.log(inMemoruUserRepo._userData)
  const userCreatorUseCase = new UserCreatorUseCase(inMemoruUserRepo)
  const userToBeCreated: User = {
    name: 'John',
    age: 12,
    username: 'JD',
    id: 'manana'
  }
  await userCreatorUseCase.run(userToBeCreated)
  console.log(inMemoruUserRepo._userData)
})()
