import { ApplicationCommandData, CommandInteraction, CommandInteractionOptionResolver } from 'discord.js'
import { MeuBot } from '../../classes/MeuBot'

interface CommandProperties {
    client: MeuBot
    interaction: CommandInteraction
    options: CommandInteractionOptionResolver
}

interface ApplicationCommandDataDefault {
    name: string
    description: string
    dmPermission: boolean
}

export type CommandType = ApplicationCommandData & ApplicationCommandDataDefault & {
    run(sua_propriedade_aqui: CommandProperties): any
}

export class Command {
    constructor(options: CommandType) {
        Object.assign(this, options)
    }
}