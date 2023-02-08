const mongoose = require("mongoose");

const otherUserprofile = mongoose.Schema({
    members: {
        type:Array
    },

}, 
      { timestamps: true }
)