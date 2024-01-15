export * from 'colors'
import { MeuBot } from '../src/classes/MeuBot'

export const client = new MeuBot()

client.start()