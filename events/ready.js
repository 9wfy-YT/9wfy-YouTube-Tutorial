const client = require("..");

client.on('ready', () => {
    console.log(`${client.user.username} Is Online`);
    client.user.setStatus("idle");
    client.user.setActivity(`9wfy is here`,{type : "PLAYING"});
})