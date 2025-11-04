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

// Route

// POST
app.post('/kandang', async (req, res) => {
    const data = req.body;
    try {
        const newKandang = await db.Data_Kandang.create(data);
        res.send(newKandang);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
});

// GET
app.get('/kandang', async (req, res) => {
    try {
        const kandang = await db.Data_Kandang.findAll();
        res.send(kandang);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }   
});

// PUT
app.put('/kandang/:id', async (req, res) => {
    const id = req.params.id;
    const data = req.body;
    try {
        const updateKandang = await db.Data_Kandang.findByPk(id);
        if (!updateKandang) {
            return res.status(404).send({ message: 'Data tidak ditemukan' });
        }
        await updateKandang.update(data);
        res.send({ message: 'Data berhasil diupdate', updateKandang });
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
});

// DELETE
app.delete('/kandang/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const deleteKandang = await db.Data_Kandang.findByPk(id);
        if (!deleteKandang) {
            return res.status(404).send({ message: 'Data tidak ditemukan' });
        }
        await deleteKandang.destroy();
        res.send({ message: 'Data berhasil dihapus' });
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
});