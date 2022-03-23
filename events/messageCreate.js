const client = require("..");
var config = require("../settings/config.json");
const { MessageEmbed } = require("discord.js");

client.on('messageCreate', async message => {
    let prefix = config.prefix
    if (!message.guild) return;
    if (message.author.bot) return;
    if (message.channel.partial) await message.channel.fetch();
    if (message.partial) await message.fetch();
    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const cmd = args.shift().toLowerCase();


    if (cmd.length === 0) {
        if (message.mentions.has(client.user)) {
            message.channel.send({
                embeds: [new MessageEmbed()
                    .setColor("#5865F2")
                    .setAuthor(`Hey`)
                ]
            });

        }
    }

    const command = client.commands.get(cmd.toLowerCase()) || client.commands.find((cmds) => cmds.aliases && cmds.aliases.includes(cmd));
    if (!command) return;
    if (command) {

        if (!message.member.permissions.has(command.permissions || [])) {
            return message.reply({
                embeds: [
                    new MessageEmbed()
                        .setColor("#5865F2")
                        .setDescription(`** ❌ You don't Have ${command.permissions} To Run Command.. **`)
                ]
            })
        }
        command.run(client, message, args, prefix)
    }
})


