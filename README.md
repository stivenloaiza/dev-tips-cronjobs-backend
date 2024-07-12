# Cron Jobs API - v1
Cron Jobs API is a backend application developed in Node.js with the Nest.js framework, designed to manage scheduled tasks (cron jobs) and their integration with email services and messaging bots. This API allows users to create, update, delete, and restore cron jobs, as well as manage their execution and status.

## Features
- **Cron Jobs Management**: CRUD for scheduled tasks with options for restoration and permanent deletion.
- **Integration with External Services**: Sending emails and messages to messaging bots.
- **API Documentation**: Swagger for complete API documentation.

## Technologies Used
- **Nest.js**: A progressive Node.js framework for building efficient and scalable server-side applications.
- **Mongoose**: ODM for MongoDB, used for data persistence.
- **Swagger**: For API documentation.
- **Gitflow**: Branch management strategy that keeps development organized and efficient.

## Dependencies
This project uses the following libraries and frameworks:

- Nest.js: `@nestjs/common`, `@nestjs/core`, `@nestjs/config`, `@nestjs/platform-express`
- Documentación de la API: `@nestjs/swagger`
- ORM y Bases de Datos: `@nestjs/mongoose`, `mongoose`
- Validación de Datos: `class-validator`, `class-transformer`
- Email: `@nestjs-modules/mailer`, `nodemailer`
- Bots: `telegraf`, `discord.js`

## Local Setup
To run the project locally, clone the repository and configure the necessary environment variables for the database and JWT.

1. **Clone el repository**:
```bash
git clone https://github.com/stivenloaiza/dev-tips-cronjobs-backend/tree/dev/src
```

2. Install dependencies
```bash
npm install
```

3. Copy the .env.example file to a new .env file and configure the necessary environment variables:`
```bash
cp .env.example .env
```
- Edit the .env file with the following values and you can find at the following link `
https://samuelquisol.atlassian.net/wiki/x/XIB_/
```bash
URI_DB = 
MAILGUN_API_KEY = 
MAILGUN_DOMAIN = 
X_API_KEY = 
END_POINT_USERS =
END_POINT_TIPS =
```
These steps ensure that you have all the necessary configuration to run the project locally, adjusting the environment variables according to your development environment needs.

## Development Commands
To start the server in development mode, use:
```bash
npm run start:dev
```

## Project Folder Structure

The organization of the source code within the `src` folder includes:



- **/cron**: Module responsible for the daily or weekly automation of scheduled tasks to send tips to users.
  - **/controllers**: Controllers that handle CRUD operations related to cron jobs.
  - **/services**: Services that contain the business logic for scheduling and executing cron jobs.
  - `cron-jobs.module.ts`: Module that encapsulates all components of the cron jobs domain.

- **/queries**:  Module that classifies and prepares the data (emails and bots) and tips that will be used by the cron jobs.
  - **/controllers**: Controllers to handle requests related to data classification.
  - **/services**: Services that contain the logic to classify emails and bot messages by day and week.
  - **/dto**: Data Transfer Objects that define the structure of the data used in queries.
  - **/repositories**: Interacts with the database to perform the necessary read and write operations.
  - `queries.module.ts`:  Module that groups all components of the queries domain.

- **/mail**: Module responsible for managing the sending of emails to subscribed users.
  - **/controllers**:  Controllers that handle operations related to sending emails.
  - **/services**: Services that contain the business logic for sending emails.
  - **/dto**:  Data Transfer Objects for email data manipulation.
  - **/repositories**: Manages the interaction with the database to store and retrieve data related to emails.
  - `emails.module.ts`: Module that encapsulates all components of the emails domain.

- **/bots**:  Module responsible for integration with messaging bots like Discord and Telegram.
  - **/controllers**:  Controllers that handle operations related to sending messages to bots.
  - **/services**: Services that contain the business logic for communication with bots.
  - **/dto**: Data Transfer Objects for handling bot information.
  - **/repositories**: Interacts with the database to perform the necessary read and write operations.
  - `bots.module.ts`: Module that groups all components of the bots domain.

- **/persistence**: Handles data persistence using MongoDB.
  - **/mongodb**: Submodule specific to MongoDB integration.
    - **/models**:Defines data schemas and models.
    - **/repositories**: Manages interaction with the database.
    - `mongodb.module.ts`: Module that groups all components related to MongoDB.

- `app.controller.ts`: Main controller of the application.
- `app.module.ts`: Main module that imports and organizes all application modules.
- `main.ts`: Entry point of the application that starts the NestJS server.
... (24 líneas restantes)
Contraer
README.md
7 KB
Quedo atenta
﻿
# Cron Jobs API - v1
Cron Jobs API is a backend application developed in Node.js with the Nest.js framework, designed to manage scheduled tasks (cron jobs) and their integration with email services and messaging bots. This API allows users to create, update, delete, and restore cron jobs, as well as manage their execution and status.

## Features
- **Cron Jobs Management**: CRUD for scheduled tasks with options for restoration and permanent deletion.
- **Integration with External Services**: Sending emails and messages to messaging bots.
- **API Documentation**: Swagger for complete API documentation.

## Technologies Used
- **Nest.js**: A progressive Node.js framework for building efficient and scalable server-side applications.
- **Mongoose**: ODM for MongoDB, used for data persistence.
- **Swagger**: For API documentation.
- **Gitflow**: Branch management strategy that keeps development organized and efficient.

## Dependencies
This project uses the following libraries and frameworks:

- Nest.js: `@nestjs/common`, `@nestjs/core`, `@nestjs/config`, `@nestjs/platform-express`
- Documentación de la API: `@nestjs/swagger`
- ORM y Bases de Datos: `@nestjs/mongoose`, `mongoose`
- Validación de Datos: `class-validator`, `class-transformer`
- Email: `@nestjs-modules/mailer`, `nodemailer`
- Bots: `telegraf`, `discord.js`

## Local Setup
To run the project locally, clone the repository and configure the necessary environment variables for the database and JWT.

1. **Clone el repository**:
```bash
git clone https://github.com/stivenloaiza/dev-tips-cronjobs-backend/tree/dev/src
```

2. Install dependencies
```bash
npm install
```

3. Copy the .env.example file to a new .env file and configure the necessary environment variables:`
```bash
cp .env.example .env
```
- Edit the .env file with the following values and you can find at the following link `
https://samuelquisol.atlassian.net/wiki/x/XIB_/
```bash
URI_DB = 
MAILGUN_API_KEY = 
MAILGUN_DOMAIN = 
X_API_KEY = 
END_POINT_USERS =
END_POINT_TIPS =
```
These steps ensure that you have all the necessary configuration to run the project locally, adjusting the environment variables according to your development environment needs.

## Development Commands
To start the server in development mode, use:
```bash
npm run start:dev
```

## Project Folder Structure

The organization of the source code within the `src` folder includes:



- **/cron**: Module responsible for the daily or weekly automation of scheduled tasks to send tips to users.
  - **/controllers**: Controllers that handle CRUD operations related to cron jobs.
  - **/services**: Services that contain the business logic for scheduling and executing cron jobs.
  - `cron-jobs.module.ts`: Module that encapsulates all components of the cron jobs domain.

- **/queries**:  Module that classifies and prepares the data (emails and bots) and tips that will be used by the cron jobs.
  - **/controllers**: Controllers to handle requests related to data classification.
  - **/services**: Services that contain the logic to classify emails and bot messages by day and week.
  - **/dto**: Data Transfer Objects that define the structure of the data used in queries.
  - **/repositories**: Interacts with the database to perform the necessary read and write operations.
  - `queries.module.ts`:  Module that groups all components of the queries domain.

- **/mail**: Module responsible for managing the sending of emails to subscribed users.
  - **/controllers**:  Controllers that handle operations related to sending emails.
  - **/services**: Services that contain the business logic for sending emails.
  - **/dto**:  Data Transfer Objects for email data manipulation.
  - **/repositories**: Manages the interaction with the database to store and retrieve data related to emails.
  - `emails.module.ts`: Module that encapsulates all components of the emails domain.

- **/bots**:  Module responsible for integration with messaging bots like Discord and Telegram.
  - **/controllers**:  Controllers that handle operations related to sending messages to bots.
  - **/services**: Services that contain the business logic for communication with bots.
  - **/dto**: Data Transfer Objects for handling bot information.
  - **/repositories**: Interacts with the database to perform the necessary read and write operations.
  - `bots.module.ts`: Module that groups all components of the bots domain.

- **/persistence**: Handles data persistence using MongoDB.
  - **/mongodb**: Submodule specific to MongoDB integration.
    - **/models**:Defines data schemas and models.
    - **/repositories**: Manages interaction with the database.
    - `mongodb.module.ts`: Module that groups all components related to MongoDB.

- `app.controller.ts`: Main controller of the application.
- `app.module.ts`: Main module that imports and organizes all application modules.
- `main.ts`: Entry point of the application that starts the NestJS server.

This folder structure is designed to keep the project organized and modular, making the code easier to maintain and scale.

## Branching Strategy with Gitflow
This project implements the Gitflow branching strategy, which is a scalable and robust model for managing software development. Here is a brief description of how branches are organized and their purpose within the project's workflow:

- main: The main branch that contains the production code, where the code reaches the most stable state after being tested in other branches.
- dev: The development branch where all features, fixes, and improvements are merged before being deployed to production. This branch contains the latest state of the next release.
- feat/x: Feature branches where new functionalities are developed. Each feature has its own branch.

Work is merged into dev for integration testing. Once dev is stable and ready for a release, it is merged into main.

To contribute to the project, create a branch from dev following the corresponding prefix (feat/ or fix/) depending on the type of work. After completing the work and tests, create a Pull Request to dev.

Adopting Gitflow allows for organized version management, providing clarity and an established process for collaboration and software deployment.

CronJobs Team:

- Samuel Quintero
- Ana Sofia Castrillón
- Andrés Gomez
- Jhon Noreña
- Felipe Forero
