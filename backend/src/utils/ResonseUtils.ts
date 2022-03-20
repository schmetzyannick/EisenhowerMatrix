import {Response} from "express";
import {Logger} from "./Logger";
/**
 * Respond to the client requests.
 */
export class ResponseUtils {
    /**
     * Respond okay to the client.
     * @param res The express response object.
     * @param status Response status code.
     * @param data Data to send to the client.
     */
    public static sendResponseOk(res: Response, data: Record<string, unknown>): void {
        res.status(200).send(data);
    }

    /**
     * Respond 404 to the client.
     * @param res The express response object.
     * @param status Response status code.
     * @param error Error message.
     */
    public static sendResponseUserError(res: Response, error: string): void {
        Logger.getLogger().error(error);
        res.status(404).send({error: error});
    }

    /**
     * Respond 500 to the client.
     * @param res The express response object.
     * @param status Response status code.
     * @param error Error message.
     */
    public static sendResponseServerError(res: Response, error: unknown): void {
        Logger.getLogger().error(error);
        res.status(500).send(error);
    }
}
