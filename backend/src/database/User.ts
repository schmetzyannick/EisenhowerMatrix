import Sequelize, {Model, Sequelize as SequelizeDatabase} from "sequelize";

/**
 * Represents the user model.
 */
export class User extends Model {
    /**
     * The default user that is created when the application is started and there is no user.
     */
    public static defaultUserName: string = "admin";
    /**
     * Password hash for the default user.
     */
    public static defaulUserPasswordHash: string = "$2a$13$hr45rwl1kyIISTXmirx6PuvuvyKHIw1Mmd9xcgBHGi7LFuxj05/FK";

    /**
     * Creates the user table in the provided Sequelize instance.
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
                passwordHash: {
                    type: Sequelize.STRING,
                    allowNull: false,
                },
            },
            {
                sequelize,
                tableName: "users",
            },
        );
    }

    /**
     * Counter in the database.
     */
    public id!: number;
    /**
     * Username.
     */
    public name!: string;
    /**
     * Password.
     */
    public passwordHash!: string;
    /**
     * First save timestamp.
     */
    public createdAt!: Date;
    /**
     * Last save timestamp.
     */
    public updatedAt!: Date;
}
