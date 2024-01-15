import { BitFieldResolvable, GatewayIntentsString, IntentsBitField, Partials } from 'discord.js'

export const MeuBotOptions = {
    intents: Object.keys(IntentsBitField.Flags) as BitFieldResolvable<GatewayIntentsString, number>,

    Partials: [
        Partials.Channel, Partials.GuildMember, Partials.GuildScheduledEvent,
        Partials.Message, Partials.Reaction, Partials.ThreadMember, Partials.User
    ]
}