# Project 2: Quiz-app

The application provides a list of topics and allows creating multiple-choice
questions into those topics that are then answered by self and others. You can
track some statistics of the topics and answers. Application is available at
[link](https://deno-quiz-application.herokuapp.com/).

## Project structure

The application follows three-tier architecture: client, web server and
database. Application uses layered architecture with views, controllers,
services and database.

## Functionality

Main page is shown every user and it shows some statistics. To get to creating
topics and to answer questions and create them you need to register to the
website. Any authenticated user can delete and create questions and answers.
There is also api at GET /api/questions/random that creates random question from
the database. You can also check if the answer for the some question is right at
POST /api/questions/answer.

**Guidelines to run the application locally**

You can run application locally by opening this zip-file in vscode and open
terminal in the folder that contains 'docker-compose.yml' and typing "docker
compose up" on terminal. That starts the application on the port '7777'. You can
stop the application with command 'ctrl+C'.
