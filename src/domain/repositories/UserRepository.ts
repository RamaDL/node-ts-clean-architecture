import { UserEntity } from '@src/domain/entities/User'

export interface UserRepository {
  getAll: () => Promise<UserEntity[]>
  save: (user: UserEntity) => Promise<UserEntity>
  getByUserName: (username: string) => Promise<UserEntity | null>
  update: (user: UserEntity) => Promise<UserEntity>
  delete: (id: string) => Promise<void>
  getById: (id: string) => Promise<UserEntity | null>
}
