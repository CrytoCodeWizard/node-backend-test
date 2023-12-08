const { Model, DataTypes } =  require("sequelize");

class User extends Model {
    static init(sequelize) {
        super.init(
            {   
              id: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true,
              },
              name: {
                type: DataTypes.STRING,
                allowNull: false,
              },
              email: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true,
                validate: {
                  isEmail: true,
                },
              },
              password: {
                type: DataTypes.STRING,
                allowNull: false,
              },
            },
            {
              sequelize,
              modelName: 'User',
            }
          );
    }
}

module.exports = User;