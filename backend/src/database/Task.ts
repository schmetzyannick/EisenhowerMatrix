import Sequelize, { Model } from "sequelize";

export class Task extends Model{
    public id!: number;
    public name!: string;
    public description!: string;
    public status!: string;
    public createdAt!: Date;
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
            description: {
                type: Sequelize.STRING,
                allowNull: false
            },
            status: {
                type: Sequelize.STRING,
                allowNull: false
            }
        }, {
            sequelize,
            tableName: 'tasks'
        });
    }
}