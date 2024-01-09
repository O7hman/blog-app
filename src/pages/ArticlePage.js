import {useParams} from 'react-router-dom'
import articles from './article-content'
import NotFoundPage from './NotFoundPage'
import { useState, useEffect } from 'react'
import CommentsList from '../components/CommentsList'
import AddCommentForm from './AddCommentForm'
import useUser from '../hooks/useUser'

const ArticlePage = () => {
    const{articleId} = useParams()    
    const [articleInfo, setArticleInfo] = useState({upvotes: 0, comments: [], canUpvote: false}) 
    const {canUpvote} = articleInfo

    const {user, isLoading} = useUser()

    useEffect(() => {
        const getData = async() =>{
        try{
            const token = user && await user.getIdToken()
            console.log(token)
            const headers = token ? {'authtoken': token} : {}
            const response = await fetch(`/api/articles/${articleId}`,{
                method: 'GET',
                headers
            })
            const data = await response.json()
            console.log(data)
            setArticleInfo(data)
        }catch(err) {
            console.log({message: err.message})
        }
        }
        if (!isLoading){
            getData()
        }
    },[isLoading, user])

    const article = articles.find(article => article.name === articleId) 

    const upvoteButton = async () => {
        const token = user && await user.getIdToken()
        const headers = token ? {'authtoken': token,} : {}
        try{
            const response = await fetch(`/api/articles/${article.name}/upvote`, {
                method: 'PUT',
                headers
            })
            const data = await response.json()
            console.log({data: data.comments})
            setArticleInfo({upvotes: data.upvotes, comments: data.comments})
        }catch(err){
            console.log({message: err.message})
        }
    }

    if(!article) return <NotFoundPage />

    return(
        <>
            <h1>{article.title}!</h1> 
            <div className='upvotes-section'>
                {user 
                    ? <button className='comments-section' onClick={upvoteButton}>{canUpvote ? 'Upvote' : 'Already Upvoted'}</button>
                    : <button className='comments-section'>Log in to upvote</button>}
                <p>This article has {articleInfo.upvotes} upvote(s)</p>
            </div>
            {article.content.map((paragaph, index)=> (
                <p key={index}>{paragaph}</p>
            ))}
            {user
                ? <AddCommentForm
                    articleName={articleId}
                    onArticleUpdated={updatedArticle => setArticleInfo(updatedArticle)} />
                : <button>Login to add a comment</button>}
            <CommentsList comments={articleInfo.comments} />
        </>
    )
}

export default ArticlePage 