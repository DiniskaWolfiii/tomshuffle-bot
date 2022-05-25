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
                createVoiceAndTextChannel(newState);
                return;
            }
            // If User is joined, give him right to send Messages into TextChannel
            if (newState.channel.parentId === joinToCreateParent && newState.channelId !== joinToCreate && newState.channel.members.size !== 0) {
                giveTextPermission(newState);
                return;
            }
        } 
        // If VoiceStateUpdate Event is a LEAVE 
        else if (newState.channelId == null) {
            // If leaved Channel is "Create a Channel" -> Do nothing and return
            if (oldState.channelId === joinToCreate) return;
            // If User has leaved, remove rights to send Messages into TextChannel
            if (oldState.channel.parentId === joinToCreateParent && oldState.channelId !== joinToCreate && oldState.channel.members.size !== 0) {
                removeTextPermission(oldState);
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
        // If VoiceStateUpate is in the same channel
        else if (oldState.channelId === newState.channelId) {
            return;
        }
        // If VoiceStateUpdate is a User who switched Channels
        else {
            // If User switched from Join To Create Channel to Temp Channel
            if (oldState.channelId === joinToCreate) return;
            // If User switched from a normal Channel to Temp Channel
            else if (oldState.channel.parentId !== joinToCreateParent && newState.channel.parentId === joinToCreateParent && newState.channelId !== joinToCreate) {
                giveTextPermission(newState);
                return;
            }
            // If User switched from Temp Channel to Normal Channel
            else if (oldState.channel.parentId === joinToCreateParent && newState.channel.parentId !== joinToCreateParent) {
                // If User was last User, delete VoiceChannel and TextChannel
                if (oldState.channel.members.size === 0) {
                    const textChannel = getChannelByTopic(oldState);
                    textChannel.delete();
                    oldState.channel.delete();
                    return;
                }
                // If User was not the last User, remove rights in TextChannel
                else {
                    removeTextPermission(oldState);
                    return;
                }
            }
            // If User switched to Join To Create
            else if (newState.channelId === joinToCreate) {
                // If Old Channel is not in the Join To Create Category, Create Channel like normal
                if(oldState.channel.parentId !== joinToCreateParent) {
                    createVoiceAndTextChannel(newState);
                    return;
                }
                // If Old Channel is in the Join To Create Category, check old Temp Channel and create new one
                else {
                    if(oldState.channel.members.size === 0) {
                        const textChannel = getChannelByTopic(oldState);
                        textChannel.delete();
                        oldState.delete();
                    }
                    createVoiceAndTextChannel(newState);
                    return;
                }
            }
            // If User switched from Temp Channel to another Temp Channel
            else if(oldState.channel.parentId === joinToCreateParent && newState.channel.parentId === joinToCreateParent) {
                // If User was last User, Delete Channels
                if(oldState.channel.members.size === 0) {
                    const textChannel = getChannelByTopic(oldState);
                    textChannel.delete();
                    oldState.channel.delete();
                }
                // If User was not last User, just remove Permission from Text Channel
                else {
                    removeTextPermission(oldState);
                }
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
function removeTextPermission(channelState) {
    let meinKanal = getChannelByTopic(channelState);
    meinKanal.permissionOverwrites.edit(channelState.member.id, { VIEW_CHANNEL: false, SEND_MESSAGES: false, READ_MESSAGE_HISTORY: false, EMBED_LINKS: false, ATTACH_FILES: false });
}
function createVoiceAndTextChannel(channelState) {
    channelState.guild.channels.create(channelState.member.user.username + "'s Voice", {
        type: 'GUILD_VOICE',
        parent: '941422858607931442',
        position: 30000,
        userLimit: 5,
        permissionOverwrites: [
            {
                id: channelState.member.user.id,
                allow: ['MANAGE_CHANNELS', 'MOVE_MEMBERS', 'MANAGE_ROLES', 'MUTE_MEMBERS', 'DEAFEN_MEMBERS', 'PRIORITY_SPEAKER', 'CONNECT', 'VIEW_CHANNEL', 'SPEAK']
            },
            {
                id: channelState.member.guild.id,
                allow: ['VIEW_CHANNEL', 'SPEAK', 'CONNECT', 'ATTACH_FILES', 'EMBED_LINKS']
            },
        ],
    })
        .then(newChannel => {
            channelState.setChannel(newChannel)
            channelState.guild.channels.create(channelState.member.user.username, {
                type: 'GUILD_TEXT',
                topic: newChannel.id,
                parent: '941422858607931442',
                position: 30000,
                permissionOverwrites: [
                    {
                        id: channelState.member.guild.id,
                        deny: ['VIEW_CHANNEL', 'SEND_MESSAGES', 'READ_MESSAGE_HISTORY']
                    },
                    {
                        id: channelState.member.user.id,
                        allow: ['VIEW_CHANNEL', 'SEND_MESSAGES', 'READ_MESSAGE_HISTORY', 'ATTACH_FILES', 'EMBED_LINKS']
                    },
                    {
                        id: '297430394888912897',
                        allow: ['VIEW_CHANNEL', 'READ_MESSAGE_HISTORY', 'SEND_MESSAGES']
                    }
                ]
            })
        })
}