import { ApplicationCommandDataResolvable, Client, ClientEvents, Collection } from 'discord.js'
import { MeuBotOptions } from './MeuBotOptions'
import { CommandType } from '../structures/types/CommandType'
import { EventType } from '../structures/types/EventType'
import { Tokens } from '../config/Tokens'
import fs from 'node:fs'
import path from 'node:path'

export class MeuBot extends Client {
    constructor() {
        super(MeuBotOptions)
    }

    public commands: Collection<string, CommandType> = new Collection()

    public start() {
        this.loadModules()
        this.loadEvents()
        this.login(Tokens.BOT_TOKEN)
    }

    private loadCommands(commands: Array<ApplicationCommandDataResolvable>) {
        this.application?.commands.set(commands)
        if (this.commands.size === 0) {
            console.warn('[SISTEMA]'.blue + '\n' + '⚠️ Nenhum Slash Command (/) foi registrado.' + '\n'.yellow)
        }

        if (this.commands.size === 1) {
            console.log('[SISTEMA]'.blue + '✅ 1 Slash Command (/) foi registrado.' + '\n'.green)
        }

        if (this.commands.size > 1) {
            console.log('[SISTEMA]'.blue + `✅ ${this.commands.size} Slash Commands (/) registrados.` + '\n')
        }
    }

    private loadModules() {
        const SlashCommands: Array<ApplicationCommandDataResolvable> = new Array()
        const CommandsPath = path.join(__dirname, '..', 'structures', 'commands')
        const FileExtensionFilter = (FileName: string) => FileName.endsWith('.ts')

        fs.readdirSync(CommandsPath).forEach(local => {
            fs.readdirSync(CommandsPath + `/${local}/`).filter(FileExtensionFilter).forEach(async FileName => {
                const command: CommandType = (await import(`../structures/commands/${local}/${FileName}`))?.default
                const { name } = command

                if (name) {
                    this.commands.set(name, command)
                    SlashCommands.push(command)
                }
            })
        })

        this.on('ready', () => this.loadCommands(SlashCommands))
    }

    private loadEvents() {
        const EventsPath = path.join(__dirname, '..', 'structures', 'events')  
        const FileExtensionFilter = (FileName: string) => FileName.endsWith('.ts')


        fs.readdirSync(EventsPath).forEach(local => {
            fs.readdirSync(`${EventsPath}/${local}`).filter(FileExtensionFilter).forEach(async FileName => {
                const { name, once, run }: EventType<keyof ClientEvents> = (await import(`../structures/events/${local}/${FileName}`))?.default

                try {
                    if (name) (once)? this.once(name, run): this.on(name, run)
                }
                catch(error) {
                    console.log('[SISTEMA]'.blue + '\n' + `❌ Ocorreu algum erro no evento ${name}.`.red + '\n' + '\n' + `${error}` )
                }
            })
        })
    }
}