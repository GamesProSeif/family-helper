# Family Helper

## Table of Contents

1. [Description](#description)
1. [Packages](#packages)
1. [Frameworks](#frameworks)
1. [Installation](#installation)
1. [To Do List](#to-do-list)

## Description

A simple [Node.js](https://nodejs.org/en/) [Express](https://www.npmjs.com/package/express) web server project for helping a family in everyday tasks.

First developed feature is sharing files locally across a network. Add some SSH functionality to this, and you will have your own storage system accessible from everywhere.

Feel free to mess around with the files, explore, and change the some names as you wish.

Please pull request any feature you want to add/fix/remove. Highly appreciated.

---

## Packages

- Dependencies

  - [express](https://www.npmjs.com/package/express) - For the main web server application.
  - [express-formidable](https://www.npmjs.com/package/express-formidable) - Handling file uploads.
  - [ejs](https://www.npmjs.com/package/ejs) - For EJS support (injecting data into client side).

- DevDependencies
  - [@types/\*](https://www.npmjs.com/~types) - For typescript type checking
  - [nodemon](https://www.npmjs.com/package/nodemon) - For resetting the server automatically during development.
  - [prettier](https://www.npmjs.com/package/prettier) - A beautifier
  - [typescript](https://www.npmjs.com/package/typescript) - The builder for typescript files
  - [tslint](https://www.npmjs.com/package/tslint) - The linter for the project
  - [tslint-config-prettier](https://www.npmjs.com/package/tslint-config-prettier) - Linking prettier with the linter

---

## Frameworks

- [Bootstrap](https://getbootstrap.com/) - For the styling/responsiveness of the website.
- [Popper.js](https://popper.js.org/) - A Bootstrap dependency needed for closing some alerts.
- [jQuery](https://jquery.com/) - For navigation bar responsiveness and other styling purposes.

---

## Installation

Must have [Node.js](https://nodejs.org/en/), download it first then follow the steps.

1. Download/clone the repository

- If you have [Git](https://git-scm.com/) installed, simple go to a folder and type `git clone https://github.com/GamesProSeif/family-helper.git` in the terminal.
- Else download the repository as a zip and unzip it.

2. Open the file `setup.bat` to install the packages and start building the files.
3. Open the file `start.bat` to run the server. A link will be logged to the console to connect to the web server. If it fails to do so, type `ipconfig` in the terminal, and use your IPv4 address following the port number. EG `192.168.x.x:PORT`.

> Default port is `80` which is a known port for web servers, that lets you connect to the server by just mentioning the ip (192.168.x.xx).

&nbsp;

---

## To Do List

- General
  - User authentication
  - Night mode feature (dark screen)

* Sharing feature
  - Mutli-file upload support
  - Configuration file (for name, port, etc...)
  - Timestamp to file upload
  - Log file of uploaders/downloaders
  - Fix overflow when uploaded file name is long
  - Private Share
  - Size limiting

- Todo list feature

  - Add Todo list feature

- Messaging feature
  - Add Messaging feature

---

Copyright (c) 2019 GamesProSeif All Rights Reserved.
