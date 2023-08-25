const Chat = require("../models/ChatRoom");

const messageController = async (req, res) => {
  const { user1, user2 } = req.query;

  try {
    let chat = await Chat.findOne({
      participants: {
        $all: [user1, user2],
        $size: 2,
      },
    });

    if(!chat){
      chat = await Chat.create({
        participants:[user1 , user2],
        messages:[]
      })
    }
    console.log(chat)
    
    res.status(200).json(chat);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

module.exports = messageController;
