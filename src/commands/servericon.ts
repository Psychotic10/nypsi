import { CommandInteraction, Message } from "discord.js";
import { Command, Categories, NypsiCommandInteraction } from "../utils/models/Command";
import { CustomEmbed } from "../utils/models/EmbedBuilders";

const cmd = new Command("servericon", "get the server icon", Categories.INFO);

async function run(message: Message | (NypsiCommandInteraction & CommandInteraction)) {
    return message.channel.send({
        embeds: [
            new CustomEmbed(message.member).setImage(
                message.guild.iconURL({
                    size: 256,
                })
            ),
        ],
    });
}

cmd.setRun(run);

module.exports = cmd;
