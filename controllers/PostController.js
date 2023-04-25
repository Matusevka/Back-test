import Post from '../models/Post.js';
import PostModel from '../models/Post.js';

export const getAll = async(req, res) => {
    try{
        const posts = await PostModel.find().populate('user').exec();

        res.json(posts)
    } catch (err) {
        res.status(500).json({
            message: 'Не удалось получить статьи'
        })
    }
}

export const getOne = async (req, res) => {
    try{
        const postId = req.params.id;

        const post = await PostModel.findById(postId)

        if (!post){
            return res.status(404).json({
                message: 'Пост не найден'
            })
        }

        res.json(post)
       /* PostModel.findById({
            _id: postId,
        },
            (err, doc) => {
                if (err) {
                    return res.status(500).json({
                    message: 'Не удалось венуть статью'
                    })
                }
                if (!doc) {
                    return res.status(404).json({
                        message: 'Статья не найдена'
                    })
                }

                res.json(doc);
            })*/
    } catch (err) {
        console.log(err)
        res.status(500).json({
            message: 'Не удалось получить статьи'
        })
    }
}

export const remove = async (req, res) => {
    try{
        const postId = req.params.id;

        await PostModel.deleteOne({
            _id: postId,
        })
        res.json({
            success: true,
        });
        
    } catch (err) {
        console.log(err)
        res.status(500).json({
            message: 'Не удалось удалить статью'
        })
    }
}

export const create = async(req, res) => {
    try {
        const doc = new PostModel({
            title: req.body.title,
            text: req.body.text,
            imageUrl: req.body.imageUrl,
            tags: req.body.tags,
            user: req.userId,
        })

        const post = await doc.save();

        res.json(post);
    } catch (err) {
        console.log(err)
        res.status(500).json({
            message: 'Не удалось создать статью',
        })
    }
}

export const update = async (req, res) => {
    try{
        const postId = req.body.id;

        await PostModel.updateOne({
            _id: postId,
        }, {
            title: req.body.title,
            text: req.body.text,
            imageUrl: req.body.imageUrl,
            user: req.userId,
            tags: req.body.tags,
        })

        res.json({
            success: true,
        })
    } catch(err){
        console.log(err)
        res.status(500).json({
            message: 'Не удалось обновить статью'
        })
    }
}