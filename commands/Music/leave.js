module.exports = {

    name: 'leave',
    aliases: ['stop', 'dc'],
    category: 'music',
    description: 'Leaves The User\'s VC',
    usage: ' ',
    accessableby: 'everyone',
run: async (bot, message, args, ops) => {
    const { channel } = message.member.voice;
    const serverQueue = ops.queue.get(message.guild.id);
try {
    if (!channel) return message.channel.send(' Você precisa estar conectado em um canal de voz ');
    if (!channel.permissionsFor(bot.user).has(['CONNECT', 'SPEAK', 'VIEW_CHANNEL'])) {
        return message.channel.send(" Não possuo permissões para falar em um canal de voz :weary:");
    };
    if (!message.guild.me.voice.channel) return message.channel.send('❌  Não estou conectado em um canal de voz! ');

    if (serverQueue || serverQueue.playing) {
      serverQueue.connection.dispatcher.end();
      await channel.leave();
      return message.channel.send(" ✅ Saindo do call... ");
    } else {
    await channel.leave();
    return message.channel.send(" ✅ Saindo da call... ");
    }
  } catch {
      serverQueue.connection.dispatcher.end();
      await channel.leave();
      return message.channel.send(" Algo deu errado, tente novamente! ");
  }
}
}