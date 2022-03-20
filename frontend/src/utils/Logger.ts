/**
 * Logger class. Only here console logs are allowed.
 */
export class Logger {
    /**
     * Wraps consloe.log.
     * @param obj Object to log.
     */
    public static log(obj: unknown): void {
        //eslint-disable-next-line no-console
        console.log(obj);
    }

    /**
     * Wraps consloe.warn.
     * @param obj Object to log.
     */
    public static warn(obj: unknown): void {
        //eslint-disable-next-line no-console
        console.warn(obj);
    }

    /**
     * Wraps consloe.error.
     * @param obj Object to log.
     */
    public static error(obj: unknown): void {
        //eslint-disable-next-line no-console
        console.error(obj);
    }
}
