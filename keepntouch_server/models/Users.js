module.exports = (sequelize, DataTypes) => {
    const Users = sequelize.define("Users", {
        username: {
            type: DataTypes.STRING,
            allowNull: false, 
            unique: true,
            validate: {
                isAlphanumeric: true, // will only allow alphanumeric characters,
                notNull: true, // won't allow null
                notEmpty: true, // don't allow empty strings
                len: [5, 16], // only allow values with length between a and b
            }
        },
        firstName: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isAlpha: true, // will only allow letters
                notNull: true, // won't allow null
                notEmpty: true, // don't allow empty strings
                len: [2, 35], // only allow values with length between a and b
            }
        },
        lastName: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isAlpha: true, // will only allow letters
                notNull: true, // won't allow null
                notEmpty: true, // don't allow empty strings
                len: [2, 35], // only allow values with length between a and b
            }
        },
        eMail: {
            type: DataTypes.STRING,
            allowNull: false, 
            unique: true,
            validate: {
                isEmail: true, // checks for email format (foo@bar.com)
                notNull: true, // won't allow null
                notEmpty: true, // don't allow empty strings
                len: [5, 255], // only allow values with length between a and b
            }
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notNull: true, // won't allow null
                notEmpty: true, // don't allow empty strings
            }
        }    
    })

    return Users;
};