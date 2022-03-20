import Sequelize, {Model, Sequelize as SequelizeDatabase} from "sequelize";
import {TaskListEnum} from "../../../shared/types/TaskListEnum";
import {User} from "./User";

/**
 * The tasklist model.
 */
export class TaskList extends Model {
    /**
     * Creates the tasklist table in the provided Sequelize instance.
     * @param sequelize Sequelize instance to.
     */
    public static initialize(sequelize: SequelizeDatabase): void {
        this.init(
            {
                id: {
                    type: Sequelize.INTEGER,
                    allowNull: false,
                    autoIncrement: true,
                    primaryKey: true,
                },
                name: {
                    type: Sequelize.STRING,
                    allowNull: false,
                },
                userId: {
                    type: Sequelize.INTEGER,
                    references: {
                        model: User,
                        key: "id",
                    },
                },
            },
            {
                sequelize,
                tableName: "tsaklists",
            },
        );
    }

    /**
     * Counter in the database.
     */
    public id!: number;
    /**
     * ListName.
     */
    public name!: TaskListEnum;
    /**
     * Reference to the users table
     */
    public userId!: number;
    /**
     * First save timestamp.
     */
    public createdAt!: Date;
    /**
     * Last save timestamp.
     */
    public updatedAt!: Date;
}
