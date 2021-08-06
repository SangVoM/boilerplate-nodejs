let User;
const s = (builder, Sequelize) => {
    User = builder.define(
        'user',
        {
            id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false
            },
            username: {
                type: Sequelize.STRING
            },
            email: {
                type: Sequelize.STRING,
                allowNull: false
            },
            password: {
                type: Sequelize.STRING,
                allowNull: false
            },
            role_id: {
                type: Sequelize.INTEGER,
                allowNull: false
            },
            active: {
                type: Sequelize.BOOLEAN,
                allowNull: false
            },
            deleted: {
                type: Sequelize.BOOLEAN,
                allowNull: false
            },
            created_at: {
                type: Sequelize.DATE,
                allowNull: false
            },
            updated_at: {
                type: Sequelize.DATE,
                allowNull: false
            }
        },
        {
            timestamps: false
        }
    );
    User.associate = models => {
        User.belongsTo(models.role, { as: 'role', foreignKey: 'role_id' });
    };
    return User;
};

export { User, s };
