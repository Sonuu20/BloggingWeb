import React,  {useState, useEffect} from 'react'
import { PostForm, Container } from '../compoents'
import service from '../appwrite/conf'
import { useNavigate, useParams } from 'react-router-dom'

function EditPost() {
  
  const [post, setPost] = useState(null)
  const {slug} = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    if(slug){
      service.getPost(slug).then((post) => {
        if(post) {
          setPost(post)
        }
      })
    }else{
      navigate('/')
    }
  },[slug, navigate])

  // agr error h toh post kr dena
  return post ?(
    <div className='py-8'>
      <div><h1 className='text-[2rem] md:text-[2.5rem] text-center font-semibold'>Edit Post</h1></div>
      <Container>
        <PostForm post={post}/> 
      </Container>
    </div>
  ) : null
}

export default EditPost