module.exports = (sequelize, DataTypes) => {
    const Data_Kandang = sequelize.define('Data_Kandang', {
        id_kandang: {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            Nama_hewan: {
                type: DataTypes.STRING,
                allowNull: false
            },
            Nama_petugas: {
                type: DataTypes.STRING,
                allowNull: false
            },
            Usia_hewan: {
                type: DataTypes.INTEGER,
                allowNull: false
            },
            Jenis_hewan: {
                type: DataTypes.STRING,
                allowNull: false
            },
            Tahun_lahir: {
                type: DataTypes.INTEGER,
                allowNull: false
            }
        }
    }, {
        tableName: 'data_kandang',
        timestamps: false,
        freezeTableName: true
    });
    return Data_Kandang;
};