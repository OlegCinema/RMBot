<img src="https://i.imgur.com/ohE0S5b.png" width="200" align="right"/>

# ReactionManagerBot

[![Codacy Badge](https://api.codacy.com/project/badge/Grade/78390bece2a4494988af05aa580b4e6d)](https://app.codacy.com/manual/OlegCinema/RMBot?utm_source=github.com&utm_medium=referral&utm_content=OlegCinema/RMBot&utm_campaign=Badge_Grade_Dashboard)
[![Maintainability](https://api.codeclimate.com/v1/badges/91be97d90112f3658ef3/maintainability)](https://codeclimate.com/github/OlegCinema/RMBot/maintainability)
[![BCH compliance](https://bettercodehub.com/edge/badge/OlegCinema/RMBot?branch=master)](https://bettercodehub.com/)
[![DeepScan grade](https://deepscan.io/api/teams/8564/projects/11409/branches/169439/badge/grade.svg)](https://deepscan.io/dashboard#view=project&tid=8564&pid=11409&bid=169439)

Discord bot, written in JS, is used for adding or deleting roles in guilds.

# Installation
You can install it using `git clone https://github.com/OlegCinema/RMBot.git` and then execute `npm install` to get all requirements.
After that, configure config.json (see comments) and run using `node bot.js`. Also, don't forget to create your bot app on Discord Dev Portal.

The bot uses **Redis Storage** for store data, so it's required.

# Using
See how to use it on Gist:

# Requirements
Requirement | Version | Comment
------------ | ------------- | ------------- 
Discord.js | [^12.2.0](https://github.com/discordjs/discord.js) |
keyv | [^4.0.1](https://github.com/lukechilds/keyv) | 
@keyv/sqlite | [^2.1.1](https://github.com/lukechilds/keyv-redis) |
eslint | [^7.0.0](https://github.com/eslint/eslint) | You can skip it.
