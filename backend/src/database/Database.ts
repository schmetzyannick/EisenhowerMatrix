import {Sequelize} from "sequelize";
import {EnvironementUtils} from "../utils/EnvironementUtils";
import {Task} from "./Task";
import {TaskList} from "./TaskList";
import {User} from "./User";

/**
 * Represents the database.
 */
export class Database {
    /**
     * Return the singelton db instace.
     */
    public static getInstance(): Database {
        if (Database.instance === undefined) {
            Database.instance = new Database();
        }
        return Database.instance;
    }

    private static instance: Database;

    /**
     * The sequelize instance.
     */
    public dbInstance: Sequelize;

    private constructor() {
        const envUtils = EnvironementUtils.getInstance();
        this.dbInstance = new Sequelize(
            envUtils.getPostgresDatabase(),
            envUtils.getPostgresUser(),
            envUtils.getPostgresPassword(),
            {
                host: envUtils.getPostgresHost(),
                port: envUtils.getPostgresPort(),
                dialect: "postgres",
                logging: true,
            },
        );
        User.initialize(this.dbInstance);
        TaskList.initialize(this.dbInstance);
        Task.initialize(this.dbInstance);
    }
}
