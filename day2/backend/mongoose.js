const mongoose = require('mongoose');
const uri = 'mongodb://localhost:27017/trainer';

const userSchema = new mongoose.Schema({
    name: String,
    age: Number
});

const User = mongoose.model('User', userSchema);

async function main() {
    try {
        await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
        console.log('Connected to MongoDB');

        // First user
        const user = new User({ name: 'Alice', age: 24 });
        await user.save();
        console.log('User data saved:', user);

        const users = await User.find({});
        console.log('Found users:', users);

        // Second users
        const newUsers = [{ name: "Bunty", age: 55 }, { name: "Monty", age: 44 }];
        await User.insertMany(newUsers);
        console.log('User data 2 saved:', newUsers);

        const allUsers = await User.find({});
        console.log('Found all users:', allUsers);

    } finally {
        await mongoose.disconnect();
    }
}

main().catch(console.error);
