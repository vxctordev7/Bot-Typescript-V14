import { Command } from "../../types/CommandType";

export default new Command({
    name: 'ping',
    description: 'Apenas um comando de teste!',
    dmPermission: false,
    run({ interaction }) {
        interaction.reply(`${interaction.user}, Pong! 🏓`)
    },
})