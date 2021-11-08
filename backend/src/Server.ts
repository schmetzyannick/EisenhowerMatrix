import express, {Express} from "express";
import path from "path";

export class Server {
    public static startServer(): void {
        if (this.instance === undefined) {
            Server.instance = new Server(4200);
            Server.instance.registerRoutes();
            Server.instance.app.listen(Server.instance.port, () => {
                console.log(`Server listening on port: ${Server.instance.port}`);
            });
        }
    }

    private static instance: Server;

    private port: number;
    private app: Express;

    constructor(port: number) {
        this.port = port;
        this.app = express();
        this.app.use(express.static(path.join(__dirname, "../frontend")));
    }

    private registerRoutes(): void {
        this.app.get("/", (req, res) => {
            res.sendFile("../frontend/index.html", {root: __dirname});
        });
    }
}
Server.startServer();
