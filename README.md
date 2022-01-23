# EisenhowerMatrix
This project was created because I could not find any Eisenhower Matrix that persists its data to a database. I wanted to be able to clear my browser data without deleting my app data. 

I am plannig to add multi-user functionallity to this application, so I can provide it as a service. (Let's see when I'll be having the time for this :D)

The project extends the Einsenhower Matrix by a Done and Backlog column. The underlying idea of these columns is: 
- Collect new tasks while you are working in the backlog column
- At the beginning of your workday: move the tasks from the backlog column, to Now, Own,...
- If you have a daily (Scrum) or something similar, you can just read your done list

![](./ReadmeGif.gif)

# Installation Windows

Be sure that Node.js (https://nodejs.org/en/) is installed on your Host. You will need to install Postgres (https://www.postgresql.org/) as well. After installing both, please donwload this repo as a zip file (and unzip it). Now, you have to configure the service to use the correct postgres db. Edit/Add the following entries in the file ./backend/env.json:
| Entry | Description | Default |
| --- | --- | --- |
| postgresHost | DNS name or IP adress of the host, where you installed the postgres DB. | localhost |
| postgresPort | Postgres DB port | 5432 |
| postgresDatabase | Name of the DB that should be used/created by the service | postgres |
| postgresUser | Username to login to the postgres DB | postgres |
| postgresPassword | Password to login to the postgres DB | postgres |

After setting the variables, you can execute the ./install/install_windows.bat, which will install the service as a windows service.

# Installation Linux

Download and configure Node, Postgres and this Repo as explained in "Installation Windows". After you have set the env variables, please run the following commands:

    npm ci
    npm run build

After running these commands, you can register a Node.js service which executes the "./dist/index.js" file as a deamon service. (Systemd example here: https://nodesource.com/blog/running-your-node-js-app-with-systemd-part-1/).
