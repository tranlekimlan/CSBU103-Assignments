
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');

const userModel = require('./models/index'); 

app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, '../public')));

app.post('/register', async (req, res) => {
    const { username, password, confirmPassword } = req.body;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,}$/;

    if (!emailRegex.test(username) || !passwordRegex.test(password) || password !== confirmPassword) {
        return res.send("<h1>Đăng ký thất bại! Dữ liệu không hợp lệ.</h1>");
    }

    try {
        await userModel.createUser({ username, password });
        res.send("<h1>Đăng ký thành công! Hãy kiểm tra file db.json</h1>");
    } catch (error) {
        res.send("Lỗi: " + error.message);
    }
});

app.listen(3000, () => {
    console.log("Server đang chạy tại: http://localhost:3000");
});