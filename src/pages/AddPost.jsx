import React, { useEffect } from 'react'
import { Container, PostForm } from '../compoents'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

function AddPost() {
  const status = useSelector(state => state.auth.status);
  const navigate = useNavigate();

  useEffect(() => {
    if (!status) {
      navigate('/signup');
    }
  }, [status, navigate]);

  if (!status) {
    // Optionally return null or a loading indicator while the redirect is happening
    return null;
  }

  return (
    <div className='py-8'>
      <Container>
        <PostForm />
      </Container>
    </div>
  );
}

export default AddPost;
