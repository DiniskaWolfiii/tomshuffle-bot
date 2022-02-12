module.exports = {
    name: 'messageCreate',
    /**
     * @param {import('discord.js').Message} message
     */
    async execute(message) {
        const {ownerId} = require('./../botconfig.json');
        if(!message.content.startsWith('wolfiii!eval')) return;
        if(message.author.id !== ownerId) return;
        const args = message.content.split(" ").slice(1);

        try {
            // Evaluate (execute) our input
            const evaled = eval(args.join(" "));
      
            // Put our eval result through the function
            // we defined above
            const cleaned = await clean(evaled);
      
            // Reply in the channel with our result
            message.channel.send(`\`\`\`js\n${cleaned}\n\`\`\``);
          } catch (err) {
            // Reply in the channel with our error
            message.channel.send(`\`ERROR\` \`\`\`xl\n${cleaned}\n\`\`\``);
          }

    }
}
// This function cleans up and prepares the
// result of our eval command input for sending
// to the channel
const clean = async (text) => {
    // If our input is a promise, await it before continuing
    if (text && text.constructor.name == "Promise")
      text = await text;
    
    // If the response isn't a string, `util.inspect()`
    // is used to 'stringify' the code in a safe way that
    // won't error out on objects with circular references
    // (like Collections, for example)
    if (typeof text !== "string")
      text = require("util").inspect(text, { depth: 1 });
    
    // Replace symbols with character code alternatives
    text = text
      .replace(/`/g, "`" + String.fromCharCode(8203))
      .replace(/@/g, "@" + String.fromCharCode(8203));
    
    // Send off the cleaned up result
    return text;
    }