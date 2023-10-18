var express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
var app = express();

app.use(cors());

const pool = mysql.createPool({
  host: '103.200.23.80',
  user: 'herokuap_tudt',
  password: 'Agglbtpg123',
  database: 'herokuap_tudt',
  waitForConnections: true,
  connectionLimit: 50,
  queueLimit: 0
});

const connection = pool.promise();

app.use(bodyParser.json());

app.get('/api/users', (req, res) => {
  let { isActive } = req.query;
  isActive = isActive ? isActive : 1;
  const query = `SELECT * FROM users WHERE isActive = ${isActive} ORDER BY startDate ASC, endDate ASC`;

  connection.query(query)
    .then(([results, fields]) => {
      const processedResults = results.map(row => ({
        ...row,
        isActive: row.isActive === 1 ? true : false
      }));

      res.json(processedResults);
    })
    .catch((error) => {
      console.error('Lỗi truy vấn: ' + error.stack);
      res.status(500).json({ error: 'Lỗi truy vấn cơ sở dữ liệu' });
    });
});


app.get('/api/users/update', (req, res) => {
  const { id, isActive } = req.query;

  if (!id || !isActive) {
    return res.status(400).json({ error: 'Thiếu tham số id hoặc isActive' });
  }

  if (isActive !== '0' && isActive !== '1') {
    return res.status(400).json({ error: 'isActive phải là "0" hoặc "1"' });
  }

  const updateQuery = 'UPDATE users SET isActive = ? WHERE id = ?';

  connection.query(updateQuery, [isActive, id])
    .then(([results]) => {
      if (results.affectedRows === 1) {
        res.json({ success: 'Cập nhật thành công' });
      } else {
        res.status(404).json({ error: 'Không tìm thấy người dùng với id đã cho' });
      }
    })
    .catch((error) => {
      console.error('Lỗi cập nhật: ' + error.stack);
      res.status(500).json({ error: 'Lỗi cập nhật cơ sở dữ liệu' });
    });
});

app.get('/api/users/delete', (req, res) => {
  const { id } = req.query;

  if (!id) {
    return res.status(400).json({ error: 'Thiếu tham số id' });
  }

  const deleteQuery = 'DELETE FROM users WHERE id = ?';

  connection.query(deleteQuery, [id])
    .then(([results]) => {
      if (results.affectedRows === 1) {
        res.json({ success: 'Xoá thành công' });
      } else {
        res.status(404).json({ error: 'Không tìm thấy người dùng với id đã cho' });
      }
    })
    .catch((error) => {
      console.error('Lỗi xoá: ' + error.stack);
      res.status(500).json({ error: 'Lỗi xoá cơ sở dữ liệu' });
    });
});

app.use(express.static(path.join(__dirname, 'build')));

app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(5000, () => {
  console.log('Server is running on port 5000');
});

module.exports = app;
