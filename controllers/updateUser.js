const User = require('../models/user');

const updateUserProfile = async (req, res) => {
    const user = await User.findById(req.user._id)

        if (user) {
            user.name = req.body.name || user.name;
            user.email = req.body.email || user.email;
            user.pic = req.body.email || user.pic;
        }         
        if (req.body.password) {
            user.password = req.body.password;
        }
        const updateUserProfile = await user.save();

        res.json({
            _id: updateUserProfile._id,
            name: updateUserProfile.name,
            email: updateUserProfile.email,
            pic: updateUserProfile.pic,
            token
        });

    }
 