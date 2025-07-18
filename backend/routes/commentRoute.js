const express=require('express');
const Post=require('../models/Post');
const router=express.Router();
// create new Comment
router.post('/',async(req,res)=>{
    try{
            const post=await Post.findById(req.body.postId);
            const commentRes=await Comment.create(req.body);
            post.comments.push(commentRes._id);
            post.save();
            res.status(201).json(commentRes); 
        }
        catch(error){
            res.status(500).json({message:error.message})
        }
})

// DELETE route to delete a comment by its ID
router.delete("/:commentId", async (req, res) => {
    try {
      const commentId = req.params.commentId;
      const commentDeleteResp = await Comment.findByIdAndDelete({_id:commentId});
  
      if (!commentDeleteResp) {
        return res.status(404).json({ message: "Comment not found" });
      }
  
      res.status(200).json({ message: "Comment deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
module.exports=router;