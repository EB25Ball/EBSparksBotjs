//const { bashCompletionSpecFromOptions } = require('dashdash');
const Sequelize = require('sequelize');

const sequelize = new Sequelize('database', 'username', 'password', {
	host: 'localhost',
	dialect: 'sqlite',
	logging: false,
	storage: 'database.sqlite',
});

const CurrencyShop = require('./models/CurrencyShop.js')(sequelize, Sequelize.DataTypes);
require('./models/Users.js')(sequelize, Sequelize.DataTypes);
require('./models/UserItems.js')(sequelize, Sequelize.DataTypes);

const force = process.argv.includes('--force') || process.argv.includes('-f'); 
sequelize.sync({ force }).then(async () => {
	const shop = [
		CurrencyShop.upsert({ name: "XP Drink", cost: 420 }),
		CurrencyShop.upsert({ name: "Pizza", cost: 69 }),
		CurrencyShop.upsert({ name: "Mystrey Box", cost: 10000 }),
		CurrencyShop.upsert({ name: "BankNote", cost: 35000 }),
	];
	await Promise.all(shop);
	console.log('Database synced');

	sequelize.close();
}).catch(console.error);