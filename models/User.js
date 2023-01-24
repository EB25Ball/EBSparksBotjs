module.exports = (sequelize, DataTypes) => {
	return sequelize.define('users', {
		user_id: {
			type: DataTypes.STRING,
			primaryKey: true,
		},
		bank: {
			type: DataTypes.INTEGER,
			defaultValue: 0,
			allowNull: false,
		},
		mystocks: {
			type: DataTypes.INTEGER,
			defaultValue: 0,
			allowNull: false,
		},
		balance: {
			type: DataTypes.INTEGER,
			defaultValue: 0,
			allowNull: false,
		},
	}, {
		timestamps: false,
	});
};