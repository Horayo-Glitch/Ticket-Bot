const { MessageEmbed, Client } = require("discord.js");
const colors = require("colors");
const color = require("./colors.json");
const { TOKEN, PREFIX } = require("./config.js");
const client = new Client();

client.on("ready", () => {
   console.log("Ticket Bot connected succefuly!".green);
  
  client.user.setPresence({
     statut: "online",
    activity: {
      name: "Ticket Bot created by horayo!",
      type: "STREAMING",
    }
  })
});

client.on("message", async message => {
  if (!message.content.startsWith(PREFIX)) return;
  if (message.author.bot) return;
  const cmd = message.content.split(" ")[0];
    cmd = cmd.slice(PREFIX.length);
  
    if (cmd === "ping") {
        message.channel.send(`Pong! ${client.ws.ping} ms`)
      }
  
  if (cmd === "ticket-setup" || "ticket") {
      if (!message.member.hasPermission("ADMINISTRATOR")) return message.reply("you need the permission `ADMINISTRATOR` to use this command!");
  
        const channel = message.mentions.channels.first()
        if(!channel) return message.reply("❌ | you have to mention a channel!");
  
        const text = args.join(" ")[2]
        if (!text) return message.reply("❌ | specify a text for this ticket manager!");
  
             message.channel.send("✅ | ticket manager has been setuped!")
  
               let sent = await channel.send(new MessageEmbed()
            .setAuthor("**__" + text + "__**")
            .setTitle("🎟️ TICKET MANAGER 🎟️")
            .setDescription(`🎟️ | The ticket manager has been setup in this channel.\n🎟️ | If you want to create a ticket you just have to react the reaction.`)
            .setFooter("```Ticket Manager```", client.user.displayAvatarURL())
            .setTimestamp()                    
            )
       sent.react("🎟️")
  
  client.on("messageReactionAdd", (reaction, user) => {
    if (reaction.emoji.name === "🎟️" && user.id !== client.user.id) {
      
      message.guild.channels.create(`${user.username}-ticket`, "text").then(c => {
         c.send(new MessageEmbed()
                        .setAuthor("**__" + user.tag + "__**")
                        .setDescription("✅ | Your ticket has been created!\nIf you want to close this ticket you just have to react with ❌")
                        .setFooter("Ticket Manager", client.user.displayAvatarURL())
                        .setTimestamp()  
                                ).then(msg =>{
           msg.react("❌")
         })
        
        c.overwritePermissions([
          {
            id: user.id,
            allow: ["VIEW_CHANNEL", "SEND_MESSAGES", "ADD_REACTIONS", "READ_MESSAGE_HISTORY", "ATTACH_FILES"]
          },
          {
            id: message.guild.roles.everyone,
            deny: ["VIEW_CHANNEL"]
          }
        ])
             
        if (reaction.emoji.name === "❌" && user.id !== client.user.id) {
          if (!c.includes("ticket")) {
            return message.reply("❌ | I can't delete this channel!")
                    } else {
                      c.delete()
                      user.send("🎟️ | Your ticket has been deleted!")
                    }
          
        }
      })
    }
  })
     }
  
});
client.login(TOKEN)
