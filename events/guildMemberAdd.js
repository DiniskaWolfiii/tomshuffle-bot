module.exports = {
    name: 'guildMemberAdd',
    /**
     * @param {import('discord.js').GuildMember} newMember
     */
    execute(newMember) {
        if(!newMember.user.bot) newMember.roles.add(['941857831043358741', '941858319969189968', '943969798231056414', '943973469312413808'], "Auto Role Join")
    }
}
