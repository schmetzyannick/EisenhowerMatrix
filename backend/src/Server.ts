import express, {Express} from "express";
import path from "path";
import {Database} from "./database/Database";
import { User } from "./database/User";
import { TaskListRouter } from "./router/TasklistRouter";
import {Logger} from "./utils/Logger";

export class Server {
    public static startServer(): void {
        if (this.instance === undefined) {
            Server.instance = new Server(4200);
            Server.instance.registerRoutes();
            const db = Database.getInstance();
            db.dbInstance
                .authenticate()
                .then(() => {
                    db.dbInstance
                        .sync({force: false, alter: true})
                        .then(async () => {
                            Server.instance.app.listen(Server.instance.port, () => {
                                Logger.getLogger().info(`Server listening on port: ${Server.instance.port}`);
                            });
                            const users = await User.findAll();
                            if(users.length === 0) {
                                await User.create({
                                    name: User.defaultUserName,
                                    passwordHash: User.defaulUserPasswordHash,
                                });
                            }
                        })
                        .catch((err) => {
                            Logger.getLogger().error("Could not start server:", err);
                        });
                })
                .catch((err) => {
                    Logger.getLogger().error("Could not start server:", err);
                });
        }
    }

    private static instance: Server;

    private port: number;
    private app: Express;

    constructor(port: number) {
        this.port = port;
        this.app = express();
        this.app.use(express.json());
        this.app.use(express.static(path.join(__dirname, "../frontend")));
    }

    private registerRoutes(): void {
        this.app.get("/", (req, res) => {
            res.sendFile("../frontend/index.html", {root: __dirname});
        });
        TaskListRouter.registerRoutes(this.app);
    }
}
Server.startServer();
