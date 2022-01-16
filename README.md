# EisenhowerMatrix
This project was created, because i could not find any Eisenhower Matrix that persists it's data to a database. I wanted to be able the clear my browser data, without deleting my app data. 

I am plannig to add multi user functionallity to this application, so I can provide it as a Service. (Let's see when I am getting time for this :D)

The project is not just an Einsenhower Matrix, becaus I have added a Done and Backlog column. The Idea behind this columns is: 
- Collect new tasks while you are working in the backlog column
- At the beginng of your workday, move the tasks from the backlog column, to Now, Self,...
- If you have a daily (Scrum) or something simular, you can just read your done list

![](./ReadmeGif.gif)

# Installation Windows

Be sure that Node.js (https://nodejs.org/en/) is installed on your Host. You also have to install Postgres (https://www.postgresql.org/). After installing both, please donwload this repo as a zip file (and unzip it). Now, you have to configure the service to use the correct postgres db. Edit/Add the following entries in the file ./backend/env.json:
| Entry | Description | Default |
| --- | --- | --- |
| postgresHost | DNS name or IP adress of the host, where you installed the postgres DB. | localhost |
| postgresPort | Postgres DB port | 5432 |
| postgresDatabase | Name of the DB that should be used/created by the service | postgres |
| postgresUser | Username to login to the postgres DB | postgres |
| postgresPassword | Password to login to the postgres DB | postgres |

After setting the variables, you can execute the ./install/install_windows.bat, which will install the service as a windows service.

# Installation Linux

Download and configure Node, Postgres and this Repo as explained in "Installation Windows". After you have set the env variables, pleas run the following commands:

    npm ci
    npm run build

After running these commands, you can register a Node.js service which executes the "./dist/index.js" file as a deamon service. (System example here: https://nodesource.com/blog/running-your-node-js-app-with-systemd-part-1/).
