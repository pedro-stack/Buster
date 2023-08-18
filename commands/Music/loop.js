module.exports = {
  
    name: 'loop',
    aliases: ["repeat"],
    category: "music",
    description: 'Repeats all songs in the queue',
    usage: " ",
    accessableby: "everyone",
run: async (bot, message, args, ops) => {
    const { channel } = message.member.voice;
    if (!channel) return message.channel.send('Desculpe, você precisa estar em um canal de voz para iniciar a repetição de música');
    const serverQueue = ops.queue.get(message.guild.id);
try {
    if (!serverQueue) return message.channel.send('Não há nada tocando.');
    if (message.guild.me.voice.channel !== message.member.voice.channel) {
        return message.channel.send(" Você precisa estar na mesma call que eu! ");
    }
    if (!serverQueue.loop) {
        serverQueue.loop = true;
        return message.channel.send('🔁 A repetição foi ativada.');
    } else {
        serverQueue.loop = false;
        return message.channel.send('🔁 A repetição foi desativada.');
    }
  } catch {
      serverQueue.connection.dispatcher.end();
      await channel.leave();
      return message.channel.send(" Algo deu errado, tente novamente! ");
  }
}
};