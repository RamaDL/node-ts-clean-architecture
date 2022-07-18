import { connect } from 'mongoose'

// const connectionString = 'mongodb://dolz:1234@localhost:27017/cleanarch?authSource=admin'

// conexion a mongo db
export const mongoDBConnect = async (connectionString: string): Promise<boolean> => {
  try {
    await connect(connectionString)
    console.log('Connected to Mongo DB')
    return true
  } catch (err) {
    console.error('Mongo DB connection failure: ', err)
    return false
  }
}
