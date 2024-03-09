import React, {useCallback, useEffect, useState} from 'react';
import { useForm } from 'react-hook-form';
import service from '../../appwrite/conf';
import {Button, Input, Select, RTE, Loader} from '../index';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

function PostForm({post}) {

  const navigate = useNavigate();
  const userDetails = useSelector((state) => state.auth.userData);
  const [loading, setLoading] = useState(false);
 
 

    const {register, handleSubmit, watch, setValue, control, getValues} = useForm({
        defaultValues: {
            title: post?.title || '',
            slug: post?.$id || '',
            content: post?.content || '',
            status: post?.status || 'active',
            authorName: post?.authorName || userDetails.name
        },
    });

   

    const handleAuthorName = (e) => {
      setAuthorName(e.target.value);
    }

    // through this submit the post is being created, if the user is modifying the post that is already present then
    // then the modified value will only be overwrite otherwise the new value will be updated
    const submit = async (data) => {
      setLoading(true)
      if (post) {
        const file = data.image[0] ? await service.uploadFile(data.image[0]) : null ;
  
        if (file) {
          await service.deleteFile(post.image);
        }
  
        const dbPost = await service.updatePost(post.$id, {
          ...data,
          image: file ? file.$id : undefined,
        });
  
        if (dbPost) {
          setLoading(false)
          navigate(`/post/${dbPost.$id}`);
        }
      } else{
        const file = await service.uploadFile(data.image[0]);
  
        if (file) {
          const fileId = file.$id;
          data.image = fileId;
          const dbPost = await service.createPost({
            ...data,
            userid: userDetails.$id,
            authorName: userDetails.name
          });
  
          if (dbPost) {
            navigate(`/post/${dbPost.$id}`);
          }
        }
      }
    };
    

    //slugTransform method
    const slugTransform = useCallback((value) => {
      if (value && typeof value === "string")
          return value
              .trim()
              .toLowerCase()
              .replace(/[^a-zA-Z\d\s]+/g, "-")
              .replace(/\s/g, "-");

      return "";
  }, []);

    useEffect(() => {
      const subscription = watch((value,{name}) => {
        if(name === 'title') {
          setValue('slug', slugTransform(value.title),
            {shouldValidate: true});
        }
      });

      return () => {
        subscription.unsubscribe();
      }
    },[slugTransform, setValue, watch]);

  return (
    <form onSubmit={handleSubmit(submit)} className='flex flex-wrap'>
      <div className=' w-full lg:w-2/3 px-2'>
        <Input 
        label="Title:"
        placeholder="Title"
        className="mb-4"
        {...register("title", { required: true})}
        />

        <Input 
        label="Slug:"
        placeholder="Slug"
        className="mb-4"
        {...register("slug", {required: true})}
        onInput={(e) => {
          setValue("slug",slugTransform(e.currentTarget.value),{
            shouldValidate: true });
        }}
        />

        <RTE 
        label="Content:"
        name="content"
        control={control}
        defaultValue={getValues("content")}        
        />
      </div>

      <div className='w-full lg:w-1/3 px-2'>
        <Input 
        label="Featured Image*:"
        type="file"
        className="mb-4"
        accept="image/png, image/jpg, iamge/jpeg, image/gif"
        {...register("image", {required: !post})}
        />

        {post && (
          <div className='w-full mb-4'>
            <img src={service.getFilePreview(post.image)} 
            alt={post.title} 
            className='rounded-lg' />
          </div>
        )}
        
        <Select 
        options={["active", "inactive"]}
        label="Status"
        className="mb-4 w-full"
        {...register("status", {required: true})}
        />

        <Input 
        label = {post ? 'Updating as' : 'Posting as'}
        value = {userDetails.name}
        placeholder = "authorName"
        readOnly
        className = 'text-left mb-4'
        {...register("authorName", {required: true})}
        
        />

        {loading ?
             <div className='w-full place-items-center'><Loader></Loader></div>
             :
             <Button 
         type='submit'
         bgColor={post ? "bg-green-500" : "undefined"}
         className= " hover:shadow-[#5ce1e6] cyan-button text-black shadow-sm hover:cursor-pointer duration-200 hover:drop-shadow-2xl rounded-lg w-full"
        >
          {post ? "Update": "Submit"}
        </Button>
        }

      </div>
    </form>
  );
}

export default PostForm