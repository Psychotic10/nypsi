import { bottomAmount } from "../utils/economy/utils.js";
import { CommandInteraction, Message, PermissionFlagsBits } from "discord.js";
import { Command, Categories, NypsiCommandInteraction } from "../utils/models/Command";
import { CustomEmbed } from "../utils/models/EmbedBuilders.js";
import { addCooldown, getResponse, onCooldown } from "../utils/cooldownhandler.js";

const cmd = new Command("balbottom", "view bottom balances in the server", Categories.MONEY).setAliases([
    "bottom",
    "brokeboys",
]);

async function run(message: Message | (NypsiCommandInteraction & CommandInteraction), args: string[]) {
    if (await onCooldown(cmd.name, message.member)) {
        const embed = await getResponse(cmd.name, message.member);

        return message.channel.send({ embeds: [embed] });
    }

    await addCooldown(cmd.name, message.member, 10);

    let amount;

    if (args.length == 0) {
        args[0] = "5";
    }

    if (isNaN(parseInt(args[0])) || parseInt(args[0]) <= 0) {
        args[0] = "5";
    }

    amount = parseInt(args[0]);

    if (amount > 10 && !message.member.permissions.has(PermissionFlagsBits.Administrator)) amount = 10;

    if (amount < 5) amount = 5;

    const balBottom = await bottomAmount(message.guild, amount);

    const filtered = balBottom.filter(function (el) {
        return el != null;
    });

    if (filtered.length == 0) {
        return await message.channel.send({
            embeds: [new CustomEmbed(message.member, "no members to show")],
        });
    }

    const embed = new CustomEmbed(message.member).setHeader("bottom " + filtered.length).setDescription(filtered.join("\n"));

    message.channel.send({ embeds: [embed] });
}

cmd.setRun(run);

module.exports = cmd;
