import nconf from "nconf";
import path from "path";
/**
 * Singeton class to get the current environment.
 */
export class EnvironementUtils {
    private static instance: EnvironementUtils;
    /**
     * Instance getter.
     */
    public static getInstance(): EnvironementUtils {
        if (!EnvironementUtils.instance) {
            EnvironementUtils.instance = new EnvironementUtils();
        }
        return EnvironementUtils.instance;
    }

    /**
     * Get postgres host.
     */
    public getPostgresHost(): string {
        return nconf.get("postgresHost") || "localhost";
    }

    /**
     * Get postgres port.
     */
    public getPostgresPort(): number {
        return nconf.get("postgresPort") || 5432;
    }

    protected constructor() {
        nconf.file({file: path.join(__dirname, "env.json")});
    }
}
