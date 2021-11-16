import Bunyan from "bunyan";
import fs from "fs";
import path from "path";
// .d.ts file missing
// eslint-disable-next-line @typescript-eslint/no-var-requires
const bunyanDebugStream = require("bunyan-debug-stream");

/**
 * Abstract Logger, each service should have his own logger.
 */
export class Logger {
    /**
     * Getter for the logger.
     */
    public static getLogger(): Bunyan {
        if (Logger.instance === undefined) {
            Logger.instance = new Logger("EisenhowerMatrix");
        }
        return Logger.instance.bunyanLogger;
    }

    protected readonly bunyanLogger: Bunyan;

    private static instance: Logger;

    protected constructor(name: string) {
        const logFilePath = path.join(process.cwd(), "logs", name + ".log");
        if (!fs.existsSync(path.join(process.cwd(), "logs"))) {
            fs.mkdirSync(path.join(process.cwd(), "logs"));
        }
        fs.appendFileSync(logFilePath, "");
        this.bunyanLogger = new Bunyan({
            name,
            streams: [
                {
                    level: process.env.NODE_ENV === "production" ? "info" : "debug",
                    stream: bunyanDebugStream({
                        basepath: process.cwd(),
                        forceColor: true,
                    }),
                },
                {
                    name: "file",
                    path: logFilePath,
                },
            ],
            serializers: bunyanDebugStream.serializers,
            level: process.env.NODE_ENV === "production" ? "info" : "debug",
        });
    }
}
