  const mongoose = require('mongoose')

const goalSchema = mongoose.Schema(
    {
    // TODO: For login
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },

    // Text field in goal
    text: {
        type: String,
        required: [true, 'please add a text value'],
    },
},
{
    timestamps: true,
}
)

module.exports = mongoose.model('Goal', goalSchema)
