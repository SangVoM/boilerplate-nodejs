let Role;

const RolePermissions = {
    ADMIN: 'ADMIN',
    USER: 'USER'
};

const s = (builder, Sequelize) => {
    Role = builder.define(
        'role',
        {
            id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false
            },
            name: {
                type: Sequelize.STRING,
                allowNull: false
            },
            permissions: {
                type: Sequelize.INTEGER,
                enum: Object.values(RolePermissions)
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
    return Role;
};

export { Role, s, RolePermissions };
