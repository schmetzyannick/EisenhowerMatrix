import Sequelize, {Model, Sequelize as SequelizeDatabase} from "sequelize";
import {TaskList} from "./TaskList";

/**
 * The task databse model.
 */
export class Task extends Model {
    /**
     * Creates the task table in the provided Sequelize instance.
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
                description: {
                    type: Sequelize.STRING,
                    allowNull: false,
                },
                status: {
                    type: Sequelize.BOOLEAN,
                    allowNull: false,
                },
                priorityInList: {
                    type: Sequelize.INTEGER,
                    allowNull: false,
                    defaultValue: -1,
                },
                taskListId: {
                    type: Sequelize.INTEGER,
                    references: {
                        model: TaskList,
                        key: "id",
                    },
                },
            },
            {
                sequelize,
                tableName: "tasks",
            },
        );
    }

    /**
     * Counter in the database.
     */
    public id!: number;
    /**
     * Frountend Id.
     */
    public name!: string;
    /**
     * Text set by user.
     */
    public description!: string;
    /**
     * Done or not.
     */
    public status!: boolean;
    /**
     * Done or not.
     */
    public priorityInList!: number;
    /**
     * List id.
     */
    public taskListId!: number;
    /**
     * First save timestamp.
     */
    public createdAt!: Date;
    /**
     * Last save timestamp.
     */
    public updatedAt!: Date;
}
