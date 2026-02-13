const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');
const User = require('./models/User'); 
const Character = require('./models/Character');

const app = express();
const PORT = 3000;

// --- KẾT NỐI MONGODB ---
// Thêm option timeout để nếu không kết nối được nó sẽ báo lỗi ngay chứ không treo
mongoose.connect('mongodb://127.0.0.1:27017/soulknightDB', {
    serverSelectionTimeoutMS: 5000 
})
    .then(() => console.log('✅ Đã kết nối MongoDB thành công!'))
    .catch(err => console.error('❌ Lỗi kết nối MongoDB (Kiểm tra xem đã bật app MongoDB chưa?):', err));

app.use(bodyParser.json());
app.use(express.static(__dirname));

// --- API ĐĂNG KÝ ---
app.post('/api/register', async (req, res) => {
    try {
        const { username, password } = req.body;
        console.log("📝 Đang thử đăng ký:", username); // Log kiểm tra

        if (!username || !password) {
            return res.json({ success: false, message: 'Thiếu tên hoặc mật khẩu!' });
        }

        const newUser = new User({ username, password });
        await newUser.save();
        
        console.log("🎉 Đăng ký thành công!");
        res.json({ success: true, message: 'Đăng ký thành công! Hãy đăng nhập ngay.' });

    } catch (error) {
        console.error("⚠️ LỖI CHI TIẾT:", error); // <--- QUAN TRỌNG: In lỗi ra Terminal

        // Mã lỗi 11000 trong MongoDB nghĩa là bị trùng dữ liệu (trùng tên đăng nhập)
        if (error.code === 11000) {
            return res.json({ success: false, message: 'Tên đăng nhập này đã tồn tại!' });
        }
        
        // Else, thì là lỗi hệ thống (ví dụ chưa bật MongoDB)
        res.status(500).json({ success: false, message: 'Lỗi hệ thống: ' + error.message });
    }
});

// --- API ĐĂNG NHẬP ---
app.post('/api/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        console.log("🔑 Đang thử đăng nhập:", username);

        const user = await User.findOne({ username, password });

        if (user) {
            res.json({ success: true, username: user.username });
        } else {
            res.json({ success: false, message: 'Sai tên đăng nhập hoặc mật khẩu!' });
        }
    } catch (error) {
        console.error("⚠️ Lỗi Đăng Nhập:", error);
        res.status(500).json({ success: false, message: 'Lỗi hệ thống: ' + error.message });
    }
});

// --- API XỬ LÝ NHÂN VẬT (CRUD) ---

// 1. CHỨC NĂNG THÊM NHÂN VẬT (Requirement #5)
app.post('/api/characters', async (req, res) => {
    try {
        const newChar = new Character(req.body); // Lấy dữ liệu từ Frontend
        await newChar.save(); // Lưu vào MongoDB
        res.json({ success: true, message: "Thêm nhân vật thành công!" });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// 2. CHỨC NĂNG SỬA NHÂN VẬT (Requirement #6)
app.put('/api/characters/:id', async (req, res) => {
    try {
        const { id } = req.params; // Lấy ID từ trên link
        const updateData = req.body; // Lấy dữ liệu mới cần sửa

        // Tìm và sửa luôn
        await Character.findByIdAndUpdate(id, updateData);
        
        res.json({ success: true, message: "Đã cập nhật thông tin!" });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// 3. LẤY DANH SÁCH (Để tí nữa kiểm tra xem thêm được chưa)
app.get('/api/characters', async (req, res) => {
    const chars = await Character.find();
    res.json(chars);
});

app.listen(PORT, () => {
    console.log(`📢 Server đang chạy tại: http://localhost:${PORT}`);
    console.log('📢 Trang admin đang chạy tại: http://localhost:3000/admin.html');
});