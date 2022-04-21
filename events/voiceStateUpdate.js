const { PermissionOverwrites } = require('discord.js');

module.exports = {
    name: 'voiceStateUpdate',
    /**
     * @param {import('discord.js').Client} client
     * @param {import('discord.js').VoiceState} oldState
     * @param {import('discord.js').VoiceState} newState
     */
    execute(oldState, newState) {

        let joinToCreate = '941422962056265748';
        let joinToCreateParent = '941422858607931442';

        // If VoiceStateUpdate Event is a JOIN
        if (oldState.channelId == null) {
            // Create new VoiceChannel and TextChannel - TextChannel with the topic of the ID from VoiceChannel and return
            if (newState.channelId === joinToCreate) {

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
                            allow: ['VIEW_CHANNEL', 'SPEAK', 'CONNECT', 'ATTACH_FILES', 'EMBED_LINKS']
                        },
                    ],
                })
                    .then(newChannel => {
                        newState.setChannel(newChannel)
                        newState.guild.channels.create(newState.member.user.username, {
                            type: 'GUILD_TEXT',
                            topic: newChannel.id,
                            parent: '941422858607931442',
                            position: 30000,
                            permissionOverwrites: [
                                {
                                    id: newState.member.guild.id,
                                    deny: ['VIEW_CHANNEL', 'SEND_MESSAGES', 'READ_MESSAGE_HISTORY']
                                },
                                {
                                    id: newState.member.user.id,
                                    allow: ['VIEW_CHANNEL', 'SEND_MESSAGES', 'READ_MESSAGE_HISTORY']
                                }
                            ]
                        })
                    })
                return;
            }
            // If User is joined, give him right to send Messages into TextChannel
            if (newState.channel.parentId === joinToCreateParent && newState.channelId !== joinToCreate && newState.channel.members.size !== 0) {
                giveTextPermission(newState);
                return;
            }
        } // If VoiceStateUpdate Event is a LEAVE 
        else if (newState.channelId == null) {
            // If leaved Channel is "Create a Channel" -> Do nothing and return
            if (oldState.channelId === joinToCreate) return;
            // If User has leaved, remove rights to send Messages into TextChannel
            if (oldState.channel.parentId === joinToCreateParent && oldState.channelId !== joinToCreate && oldState.channel.members.size !== 0) {
                let meinKanal = getChannelByTopic(oldState);
                meinKanal.permissionOverwrites.edit(oldState.member.id, { VIEW_CHANNEL: false, SEND_MESSAGES: false, READ_MESSAGE_HISTORY: false, EMBED_LINKS: false, ATTACH_FILES: false });
                return;
            }
            // If last User leaved, Delete the VoiceChannel and TextChannel and return
            if (oldState.channel.parentId === joinToCreateParent && oldState.channel.members.size === 0 && oldState.channelId !== joinToCreate) {

                const textChannel = getChannelByTopic(oldState);
                textChannel.delete();

                oldState.channel.delete();
                return;
            }
        }
        // If VoiceStateUpdate is a User who switched Channels
        else {
            // If User switched from a normal Channel to Temp Channel
            if (oldState.channel.parentId !== joinToCreateParent && newState.channel.parentId === joinToCreateParent && newState.channelId !== joinToCreate) {
                giveTextPermission(newState);
                return;
            }
        }
    }
}

function getChannelByTopic(channelState) {
    const kategorieChannel = channelState.guild.channels.cache.filter(kanal => kanal.id === '941422858607931442');
    let catKanal;
    let textKanale;
    let textKanalMap;

    // Weird Stuff for getting ID by topic, idk dont ask me im trash coding
    // I am too lazy to code the shit in JSONs or Databases

    kategorieChannel.forEach(kanal => {
        catKanal = kanal.children;
    })
    textKanale = catKanal.filter(kanal => kanal.type === 'GUILD_TEXT')
    textKanalMap = textKanale.filter(kanal => kanal.topic === channelState.channelId)
    const [firstValue] = textKanalMap.values();

    const kanal = channelState.guild.channels.cache.find(c => c.id === firstValue.id);
    return kanal;
}
function giveTextPermission(channelState) {
    let meinKanal = getChannelByTopic(channelState);
    meinKanal.permissionOverwrites.edit(channelState.member.id, { VIEW_CHANNEL: true, SEND_MESSAGES: true, READ_MESSAGE_HISTORY: true, EMBED_LINKS: true, ATTACH_FILES: true });
}