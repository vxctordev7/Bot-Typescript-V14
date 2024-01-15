import { client } from '../../..'
import { Event } from '../../types/EventType'

export default new Event({
    name: 'ready',
    once: true,
    run() {

        const { commands } = client

        console.log(`[SISTEMA]`.blue + '\n' +  `✅ Bot Online em ${client.user?.username}`.green + '\n')
    }
})