
const fs = require('fs');
const path = require('path');

const dbPath = path.join(__dirname, '../../db.json');

module.exports = {
    createUser: async (userData) => {
        let users = [];
        try {
            const fileData = fs.readFileSync(dbPath, 'utf8');
            users = JSON.parse(fileData);
        } catch (err) {
            users = [];
        }

        users.push(userData);

        fs.writeFileSync(dbPath, JSON.stringify(users, null, 2));
        
        return userData;
    }
};