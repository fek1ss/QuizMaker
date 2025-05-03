require('dotenv').config();
const app = require('./app');
const sequelize = require('./config/database');

// Импорт моделей ДО запуска сервера
require('./models/User');
require('./models/Test');
require('./models/Question')
require('./models/AnswerOption')


const PORT = process.env.PORT || 3000;

(async () => {
  try {
    await sequelize.authenticate();
    console.log('DB connected successfully');

    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
})();

