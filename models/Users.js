import bcrypt from 'bcrypt';

export default (sequelize, DataType) => {
    const User = sequelize.define('Users', {
        id: {
            type: DataType.INTERGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataType.STRING,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        email: {
            type: DataType.STRING,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        password: {
            type: DataType.STRING,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        }
    },
        {
            hooks: {
                beforeCreate: user => {
                    const salt = bcrypt.genSaltSync();
                    user.set('password', bcrypt.hashSync(user.password, salt));
                }
            },
            classMethods: {
                isPassword: (encodePassword, password) => bcrypt.compareSync(password, encodePassword)
            }
        }
    );

    return Users;

}