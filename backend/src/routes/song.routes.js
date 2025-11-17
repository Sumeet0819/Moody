const express = require("express");
const multer = require("multer");
const router = express.Router();
const uploadFile = require("../service/storage.service")
const songModel = require("../model/song.model")

const upload = multer({ storage: multer.memoryStorage() });

router.post("/song",upload.single('audio'), async (req, res) => {
  console.log(req.body);
  const fileData = await uploadFile(req.file)
  console.log(fileData);
  
  const song = await songModel.create({
    title:req.body.title,
    artist:req.body.artist,
    audio:fileData.url,
    mood:req.body.mood
  })  
  res.status(201).json({
    message: "Song created successfully",
    song: song,
  });
});
router.get("/song",async (req,res)=>{
  const {mood} = req.query

  const songs = await songModel.find({
    mood:mood
  })

  res.status(200).json({
    message:"Songs fetched successfully",
    song:songs
  })
})

module.exports = router;

router.use(express.json());
