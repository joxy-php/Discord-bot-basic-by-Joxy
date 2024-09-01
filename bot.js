const { Client, GatewayIntentBits } = require('discord.js');
const fs = require('fs');

// Dynamically import chalk
const loadChalk = async () => {
  const chalk = await import('chalk');
  return chalk.default;
};

const main = async () => {
  const chalk = await loadChalk();
  const banner = `
    ${chalk.redBright.bold('JOXY')} ${chalk.blueBright('v1.0')}
    ${chalk.yellow('Developer: JOXY')}
    --------------------------------
  `;

  console.log(banner);

  const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] });

  client.once('ready', () => {
      console.log(chalk.green(`Logged in as ${client.user.tag}!`));
  });

  client.on('messageCreate', message => {
      if (message.author.bot) return; // Ignore bot messages

      if (message.content.startsWith('/say')) {
          const response = message.content.replace('/say', '').trim();
          message.channel.send(response || 'You need to provide a message!');
      } else if (message.content.startsWith('/copy')) {
          const templateContent = 'This is a sample server template.';
          const fileName = 'server_template.txt';
          fs.writeFileSync(fileName, templateContent);

          message.channel.send({ content: `Template saved as ${fileName}`, files: [fileName] });
      } else {
          console.log(chalk.red(`Unknown command: ${message.content}`));
      }
  });

  client.login('your discord bot token');
};

main();
