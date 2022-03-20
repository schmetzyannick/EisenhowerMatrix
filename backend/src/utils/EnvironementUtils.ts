import nconf from "nconf";
import path from "path";
import {Logger} from "./Logger";
import base64 from "base-64";

/**
 * Singeton class to get the current environment.
 */
export class EnvironementUtils {
    /**
     * Instance getter.
     */
    public static getInstance(): EnvironementUtils {
        if (!EnvironementUtils.instance) {
            EnvironementUtils.instance = new EnvironementUtils();
        }
        return EnvironementUtils.instance;
    }

    private static instance: EnvironementUtils;

    protected constructor() {
        nconf.file({file: path.join(__dirname, "env.json")});
    }

    /**
     * Get postgres host.
     */
    public getPostgresHost(): string {
        const host = nconf.get("postgresHost") || "localhost";
        Logger.getLogger().info("Postgres host", host);
        return host;
    }

    /**
     * Get postgres port.
     */
    public getPostgresPort(): number {
        const port = nconf.get("postgresPort") || 5432;
        Logger.getLogger().info("Postgres port", port);
        return port;
    }

    /**
     * Get postgres database.
     */
    public getPostgresDatabase(): string {
        const database = nconf.get("postgresDatabase") || "postgres";
        Logger.getLogger().info("Postgres database", database);
        return database;
    }

    /**
     * Get postgres user.
     */
    public getPostgresUser(): string {
        const user = nconf.get("postgresUser") || "postgres";
        Logger.getLogger().info("Postgres user", user);
        return user;
    }

    /**
     * Get postgres password.
     */
    public getPostgresPassword(): string {
        const password = nconf.get("postgresPassword") || "postgres";
        if (password === "postgres") {
            return password;
        } else {
            return base64.decode(password);
        }
    }
}
