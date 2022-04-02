import express, {Express} from "express";
import path from "path";
import {Database} from "./database/Database";
import {User} from "./database/User";
import {TaskListRouter} from "./router/TasklistRouter";
import {TaskRouter} from "./router/TaskRouter";
import {Logger} from "./utils/Logger";
import process from "process";
import cors from "cors";

/**
 * The server class.
 */
export class Server {
    /**
     * Starts the server.
     */
    public static startServer(): void {
        if (this.instance === undefined) {
            Server.instance = new Server(4200);
            Server.instance.registerRoutes();
            const db = Database.getInstance();
            this.startDatabaseConnection(db)
                .then(async () => {
                    await Server.createDefaultUserIfThereIsNoUser();
                    Server.instance.app.listen(Server.instance.port, () => {
                        Logger.getLogger().info(`Server listening on port: ${Server.instance.port}`);
                    });
                })
                .catch((err) => {
                    Logger.getLogger().error("Error while not startDatabaseConnection:", err);
                    process.exit(1);
                });
        }
    }

    /**
     * Create the default user.
     */
    public static async createDefaultUserIfThereIsNoUser(): Promise<void> {
        const users = await User.findAll();
        if (users.length === 0) {
            await User.create({
                name: User.defaultUserName,
                passwordHash: User.defaulUserPasswordHash,
            });
        }
    }

    private static instance: Server;

    /**
     * Start the database connection.
     * @param database The database to connect to.
     */
    private static async startDatabaseConnection(database: Database): Promise<void> {
        let couldConnect = false;
        while (!couldConnect) {
            try {
                await database.dbInstance.authenticate();
                await database.dbInstance.sync({force: false, alter: true});
                couldConnect = true;
            } catch (err) {
                Logger.getLogger().error("Could not start database connection:", err);
                await new Promise<void>((resolve) => {
                    setTimeout(() => {
                        resolve();
                    }, 10000);
                });
            }
        }
    }

    private port: number;
    private app: Express;

    /**
     * TODO: add comment.
     * @param port
     */
    constructor(port: number) {
        this.port = port;
        this.app = express();
        this.app.use(express.json());
        Logger.getLogger().info("Start server for", process.env.NODE_ENV);
        if (process.env.NODE_ENV === "development") {
            this.app.use(cors());
        } else {
            //serve frontend only in prod mode
            this.app.use(express.static(path.join(__dirname, "../frontend")));
        }
    }

    private registerRoutes(): void {
        TaskListRouter.registerRoutes(this.app);
        TaskRouter.registerRoutes(this.app);
    }
}
Server.startServer();
