const User = require('../models/user');
const Counter = require('../models/counter');
const argon2 = require("argon2");


async function createAdminAccount() {
    try {
        const existingAdmin = await User.findOne({ email: 'admin@test.com' });

        if (!existingAdmin) {
            const newAdmin = new User({
                email: 'admin@test.com',
                name: 'Admin',
                password: await argon2.hash('admin2345'),
                role: 'admin'
            });

            await newAdmin.save();
            console.log("Admin account created successfully");
        } else {
            console.log('Admin already exists');
        }
    } catch (error) {
        console.error("Error creating admin account:", error.message);
    }
}
async function createUserAccount() {
    try {
        const existingUser = await User.findOne({ email: 'user@test.com' });

        if (!existingUser) {
            const newUser= new User({
                email: 'user@test.com',
                name: 'User',
                password: await argon2.hash('user2345'),
                role: 'user'
            });

            await newUser.save();
            console.log("User account created successfully");
        } else {
            console.log('User already exists');
        }
    } catch (error) {
        console.error("Error creating admin account:", error.message);
    }
}


// let orderIndex = 1;  // Start with 001, you can reset this as needed

// const generateCustomRefId = () => {
//   const paddedIndex = String(orderIndex).padStart(5, '0'); // Ensure index is 3 digits

//   // Create the reference ID
//   const referenceId = `${paddedIndex}`;

//   // Increment the index for the next order (you can reset periodically)
//   orderIndex += 1;

//   return referenceId;
// };

// Generate Reference ID
const generateCustomRefId = async () => {
    const counter = await Counter.findByIdAndUpdate(
      { _id: 'orderIndex' },
      { $inc: { seq: 1 } },
      { new: true, upsert: true } // Create if it doesn't exist
    );
  
    const paddedIndex = String(counter.seq).padStart(5, '0'); // Ensure index is 5 digits
    return `${paddedIndex}`;
  };


module.exports ={ 
    createAdminAccount,
    createUserAccount,
    generateCustomRefId
}
