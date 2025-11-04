const express = require('express');
const app = express();
const db = require('./models');
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Sinkronisasi database dan memulai server
db.sequelize.sync()
    .then(() => {
        console.log('Database terhubung dan disinkronkan.');
        app.listen(PORT, () => {
            console.log(`Server berjalan di http://localhost:${PORT}`);
        });
    })
    .catch(err => {
        console.error('Gagal menyinkronkan database:', err);
});

