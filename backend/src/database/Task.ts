import Sequelize, {Model} from "sequelize";
import { TaskList } from "./TaskList";

export class Task extends Model {
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
    public taskListId!: number;
    /**
     * First save timestamp.
     */
    public createdAt!: Date;
    /**
     * Last save timestamp.
     */
    public updatedAt!: Date;

    public static initialize(sequelize: any): void {
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
                taskListId: {
                    type: Sequelize.INTEGER,
                    references: {
                        model: TaskList,
                        key: 'id',
                    }
                }
            },
            {
                sequelize,
                tableName: "tasks",
            },
        );
    }
}
