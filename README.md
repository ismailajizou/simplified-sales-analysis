# E-commerce Analytics Dashboard

This Project is a dashboard that displays the products and sales analytics of an e-commerce website.

## Table of Contents

1. [Setup](#setup)
2. [Technologies](#technologies)
3. [Build the project](#build-the-project)

## Setup

### Backend

To run this project, clone the repository and run the following commands:

- Setup the backend

```bash
$ cd api
$ yarn
```

- Create a .env file in the api folder and copy the contents of the .env.example file into it. Fill in the necessary details.

- run the migrations to fill the database

```bash
$ yarn migrate
```

- Start the backend server (runs on port 3000)

```bash
$ yarn start
```

### Frontend

- Run the following commands to setup the frontend

```bash
$ cd front
$ yarn
```

- Copy the contents of the .env.example file in the front folder into a .env file in the front folder and fill in the necessary details.

- Start the frontend server

```bash
$ yarn dev
```

## Technologies

- Vue.js
- Node.js
- Nest.js
- MongoDB
- Mongoose
- Shadcn-vue
- Vue query

## Build the project

- To build the project, run the following commands:

```bash
$ cd front
$ yarn build
```

- The build files will be in the dist folder in the front folder

- To build the backend, run the following commands:

```bash
$ cd api
$ yarn build
```

- The build files will be in the dist folder in the api folder

- To run the built project, run the following commands:

```bash
$ cd api
$ yarn start:prod
```

- The project will be running on port 3000

- To run the frontend, run the following commands:

```bash
$ cd front
$ yarn preview
```

- The project will be running on port 3000
