module.exports = {
    name: 'voiceStateUpdate',
    /**
     * @param {import('discord.js').Client} client
     * @param {import('discord.js').VoiceState} oldState
     * @param {import('discord.js').VoiceState} newState
     */
    execute(oldState, newState) {

        let joinToCreate = '941422962056265748';

        if (newState.channelId === joinToCreate && newState.channel.members.size !== 0) {

            newState.guild.channels.create(newState.member.user.username + "'s Voice", {
                type: 'GUILD_VOICE',
                parent: '941422858607931442',
                position: 30000,
                userLimit: 5,
                permissionOverwrites: [
                    {
                        id: newState.member.user.id,
                        allow: ['MANAGE_CHANNELS', 'MOVE_MEMBERS', 'MANAGE_ROLES', 'MUTE_MEMBERS', 'DEAFEN_MEMBERS', 'PRIORITY_SPEAKER', 'CONNECT', 'VIEW_CHANNEL', 'SPEAK']
                    },
                    {
                        id: newState.member.guild.id,
                        allow: ['VIEW_CHANNEL', 'SPEAK', 'CONNECT']
                    },
                ],
            })
                .then(newChannel => newState.setChannel(newChannel));
            newState.guild.channels.create(newState.member.user.username, {
                type: 'GUILD_TEXT',
                parent: '941422858607931442',
                position: 30000,
                permissionOverwrites: [
                    {
                        id: newState.member.guild.id,
                        deny: ['VIEW_CHANNEL', 'SEND_MESSAGES', 'READ_MESSAGE_HISTORY']
                    }
                ]
            })
            return;
        }
        if (oldState.channelId === '941422962056265748') return;
        if (oldState.channel.parentId === '941422858607931442' && oldState.channel.members.size === 0) return oldState.channel.delete();
    }
}
