import Sequelize, { Model } from "sequelize";

export class User extends Model{

    public static defaultUserName: string = "admin";
    // Projectname crypted via bcryptjs
    public static defaulUserPasswordHash: string = "$2a$13$hr45rwl1kyIISTXmirx6PuvuvyKHIw1Mmd9xcgBHGi7LFuxj05/FK";
    
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

    public static initialize(sequelize: any): void {
        this.init({
            id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                autoIncrement: true,
                primaryKey: true
            },
            name: {
                type: Sequelize.STRING,
                allowNull: false
            },
            passwordHash: {
                type: Sequelize.STRING,
                allowNull: false
            },
        }, {
            sequelize,
            tableName: 'users'
        });
    }
}