import { ClientEvents } from 'discord.js'

export type EventType<EventName extends keyof ClientEvents> = {
    name: EventName
    once: boolean
    run(...args: ClientEvents [EventName]): any
}

export class Event<EventName extends keyof ClientEvents> {
    constructor(options: EventType<EventName>) {
        Object.assign(this, options)
    }
}