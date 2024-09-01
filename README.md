
Tutorial: How to Run Your Discord Bot
This tutorial will guide you through setting up and running the Discord bot you've created using Node.js.

1. Prerequisites
Before you begin, make sure you have the following:

Node.js and npm: You can download and install Node.js from nodejs.org. npm (Node Package Manager) is included with Node.js.
Discord Bot Token: You need to create a bot on Discord and obtain a bot token. If you don't have one, follow the steps below to create a bot and get the token.
2. Create a Discord Bot
Go to the Discord Developer Portal:

Open your web browser and navigate to Discord Developer Portal.
Create a New Application:

Click on the "New Application" button.
Give your application a name and click "Create".
Create a Bot:

In your application, go to the "Bot" section on the left menu.
Click "Add Bot" and confirm by clicking "Yes, do it!".
Get the Bot Token:

Under the "TOKEN" section, click "Copy" to copy your bot token.
Important: Keep your token safe and secure. Do not share it publicly.
Invite Your Bot to Your Server:

In the "OAuth2" section, click on "URL Generator".
Under "OAuth2 URL Generator," select bot and then choose the permissions your bot will need (e.g., "Send Messages").
Copy the generated URL and paste it into your browser to invite the bot to your server.
3. Set Up Your Project
Create a Project Directory:

Open your terminal or command prompt.
Navigate to the directory where you want to create your project.
Run the following commands to create a new directory and navigate into it:
bash
Copy code
mkdir joxy-discord-bot
cd joxy-discord-bot
Initialize Your Node.js Project:

Run the following command to initialize a new Node.js project:
bash
Copy code
npm init -y
This will create a package.json file.
Install Dependencies:

Install the required Node.js packages:
bash
Copy code
npm install discord.js chalk fs
4. Create the Bot Script
Create Your Bot Script:

In your project directory, create a new file named index.js.

Open index.js in a text editor and paste the bot code you provided:

javascript
Copy code
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
Replace the Placeholder Token:

Replace 'your discord bot token' with your actual bot token that you obtained from the Discord Developer Portal.
5. Run the Bot
Start the Bot:

In your terminal, ensure you're in the project directory and run the following command:
bash
Copy code
node index.js
You should see a banner indicating that your bot has started and is logged in.
Test the Bot:
CREDIT:JOXY

Go to your Discord server where the bot is added.
In any text channel, try using the bot commands:
Type /say Hello World! to make the bot send "Hello World!" in the channel.
Type /copy to make the bot create and send a server_template.txt file.
