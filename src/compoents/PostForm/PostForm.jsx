import React, { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import service from "../../appwrite/conf";
import { Button, Input, Select, RTE, Loader } from "../index.js";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const PostForm = React.memo(({ post }) => {
  const navigate = useNavigate();
  const userDetails = useSelector((state) => state.auth.userData);
  const [loading, setLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);

  // Ensure userDetails is populated before proceeding
  if (!userDetails || !userDetails.name) {
    return (
      <div className="text-white">
        <h1>Not Accessible!!</h1>
        <h2>Please return to the home page or refresh the page.</h2>
      </div>
    );
  }

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    control,
    getValues,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: post?.title || "",
      slug: post?.$id || "",
      content: post?.content || "",
      status: post?.status || "active",
      authorName: post?.authorName || userDetails.name,
    },
  });

  // Slug Transformation Function
  const slugTransform = useCallback((value) => {
    if (value && typeof value === "string")
      return value
        .trim()
        .toLowerCase()
        .replace(/[^a-zA-Z\d\s]+/g, "-")
        .replace(/\s/g, "-");

    return "";
  }, []);

  // Handle Image Change (Preview before upload)
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const submit = async (data) => {
    setLoading(true);
    try {
      if (post) {
        const file = data.image[0]
          ? await service.uploadFile(data.image[0])
          : null;
        if (file) {
          await service.deleteFile(post.image);
        }
        const dbPost = await service.updatePost(post.$id, {
          ...data,
          image: file ? file.$id : undefined,
        });
        if (dbPost) {
          navigate(`/post/${dbPost.$id}`);
        }
      } else {
        const file = await service.uploadFile(data.image[0]);
        if (file) {
          const fileId = file.$id;
          data.image = fileId;
          const dbPost = await service.createPost({
            ...data,
            userid: userDetails.$id,
            authorName: userDetails.name,
          });
          if (dbPost) {
            navigate(`/post/${dbPost.$id}`);
          }
        }
      }
    } catch (error) {
      console.error("Error submitting post:", error);
    } finally {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      setLoading(false);
    }
  };

  // Watch for title changes and auto-generate slug
  useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name === "title") {
        setValue("slug", slugTransform(value.title), { shouldValidate: true });
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [slugTransform, setValue, watch]);

  return (
    <form onSubmit={handleSubmit(submit)} className="flex flex-wrap -mx-2">
      <div className="w-full lg:w-2/3 px-2 mb-4">
        {/* Title */}
        <Input
          label="Title:"
          placeholder="Title"
          aria-label="Post Title"
          className="mb-4"
          {...register("title", { required: "Title is required" })}
        />
        {errors.title && <p className="text-red-500">{errors.title.message}</p>}

        {/* Slug */}
        <div className="flex items-center mb-4">
          <Input
            label="Slug:"
            placeholder="Slug"
            className="mr-4 flex-grow"
            readOnly
            {...register("slug", { required: "Slug is required" })}
            onInput={(e) => {
              setValue("slug", slugTransform(e.currentTarget.value), {
                shouldValidate: true,
              });
            }}
          />
        </div>
        {errors.slug && <p className="text-red-500">{errors.slug.message}</p>}

        {/* Content */}
        <RTE
          label="Content:"
          name="content"
          control={control}
          defaultValue={getValues("content")}
        />
      </div>

      <div className="w-full lg:w-1/3 px-2 mb-4">
        {/* Image */}
        <Input
          label="Featured Image*:"
          type="file"
          accept="image/png, image/jpg, image/jpeg, image/gif"
          className="mb-4"
          {...register("image", { required: !post && "Image is required" })}
          onChange={handleImageChange}
        />
        {imagePreview && (
          <img src={imagePreview} alt="Preview" className="rounded-lg mb-4" />
        )}
        {post && post.image && !imagePreview && (
          <img
            src={service.getFilePreview(post.image)}
            alt={post.title}
            className="rounded-lg mb-4"
          />
        )}
        {errors.image && <p className="text-red-500">{errors.image.message}</p>}

        {/* Status */}
        <Select
          options={["active", "inactive"]}
          label="Status"
          className="mb-4 w-full"
          {...register("status", { required: "Status is required" })}
        />
        {errors.status && (
          <p className="text-red-500">{errors.status.message}</p>
        )}

        {/* Author Name */}
        <Input
          label={post ? "Updating as" : "Posting as"}
          value={userDetails.name}
          placeholder="Author Name"
          readOnly
          className="text-left mb-4"
          {...register("authorName", { required: true })}
        />

        {/* Submit Button */}
        <Button
          type="submit"
          disabled={loading}
          className={`hover:cursor-pointer ${
            loading ? "opacity-50" : "opacity-100"
          } w-full`}
        >
          {loading ? <Loader /> : post ? "Update" : "Submit"}
        </Button>
      </div>
    </form>
  );
});

export default PostForm;
