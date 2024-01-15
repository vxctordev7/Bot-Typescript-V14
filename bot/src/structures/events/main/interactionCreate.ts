import { client } from '../../..'
import { Event } from '../../types/EventType'
import { CommandInteractionOptionResolver } from 'discord.js'

export default new Event({
    name: 'interactionCreate',
    once: false,
    run(interaction) {
        
        if (!interaction.isCommand()) return

        const cmd = client.commands.get(interaction.commandName)
        if (!cmd) return

        if (interaction.isCommand()) {
            const options = interaction.options as CommandInteractionOptionResolver

            cmd.run({ client, interaction, options })
            return
        }
    },
})