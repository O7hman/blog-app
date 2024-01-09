import { useState } from 'react'
import useUser from '../hooks/useUser.js'

const AddCommentForm = ({ articleName, onArticleUpdated }) => {
    const [name, setName] = useState('')
    const [commentText, setCommentText] = useState('')
    const { user } = useUser()

    const addComment = async () => {
        const token = user && await user.getIdToken()
        const headers = token ? {authtoken: token, 'Content-Type': 'application/json'} : {'Content-Type': 'application/json'}
        const response = await fetch(`/api/articles/${articleName}/comments`, {
            method: 'POST',
            headers,
            body: JSON.stringify({
                postedBy: name,
                text: commentText
            })
        })
        const updatedArticle = await response.json()
        onArticleUpdated({upvotes: updatedArticle.upvotes, comments: updatedArticle.comments})
        setName('')
        setCommentText('')
    }

    return (
        <div id='add-comment-form'>
            <h3>Add a Comment</h3>
            {user && <p>You are posting as {user.email}</p>}
            <textarea 
                value={commentText}
                onChange={e => setCommentText(e.target.value)}
                rows='4' 
                cols='50' />
            <button onClick={addComment}>Add Comment</button>
        </div>
    )
}

export default AddCommentForm