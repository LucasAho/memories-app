const mongoose = require('mongoose');
const PostMessage = require('../models/postMessage');
const { post } = require('../routes/posts');

module.exports = {

    getPosts: function (req, res) {
        PostMessage
            .find({})
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err));
    },
    findById: function (req, res) {
        PostMessage
            .findById(req.params.id)
            .sort({ created_at: -1 })
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err));
    },
    createPost: function (req, res) {
        const post = req.body;
        PostMessage
            .create(post)
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err));
    },
    updatePost: function (req, res) {
        const { id: _id } = req.params;
        const post = req.body;
        if (!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('No post with that ID');

        PostMessage
            .findByIdAndUpdate(_id, post, { new: true })
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err));
    },
    likePost: function (req, res) {
        const { id } = req.params;
        if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No post with that ID');
        let incrementLikes = req.body.likeCount + 1;
        PostMessage
            .updateOne({ _id: id }, {
                $set: {
                    likeCount: incrementLikes
                }
            })
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err));
    },
    deletePost: function (req, res) {
        const { id } = req.params;
        if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No post with that ID');

        PostMessage
            .findByIdAndRemove(id)
            .then(dbModel => res.json({ message: "Post deleted successfully" }))
            .catch(err => res.status(422).json(err));
    }

}