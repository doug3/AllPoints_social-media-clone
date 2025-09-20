import React, { useState } from "react";
import { dummyUserData } from "../assets/assets";
import { assets } from "../assets/assets";
import { Image, X } from "lucide-react";
import { toast } from "react-hot-toast";

const CreatePost = () => {
  const [content, setContent] = useState("");
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);

  const user = dummyUserData;

  const handleSubmit = async () => {
    
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <div className="max-w-6xl mx-auto p-6">
        {/* Title */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2 text-slate-900">
            Create Post
          </h1>
          <p className="text-slate-600">
            Share your thoughts and experiences with the world.
          </p>
        </div>

        {/* Form */}
        <div className="max-w-xl bg-white p-4 sm:p-8 sm:pb-3 rounded-xl shadow-md space-y-4">
          <div className="flex items-start gap-3">
            {/* Header */}
            <div className="flex items-center gap-3">
              <img
                src={user.profile_picture}
                alt={user.full_name}
                className="w-12 h-12 rounded-full shadow"
              />
              <div>
                <h2 className="font-semibold">{user.full_name}</h2>
                <p className="text-sm text-gray-500">@{user.username}</p>
              </div>
            </div>
          </div>
          {/* Text Area */}
          {/* <form className="flex-" onSubmit={(e) => e.preventDefault()}> */}
          <textarea
            className="w-full max-h-20 mt-4 p-2 text-sm placeholder-gray-400 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-200 border border-gray-300"
            rows={4}
            placeholder="What's on your mind?"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            disabled={loading}
          />
          {/* Image Upload */}
          {images.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-4">
              {images.map((img, index) => (
                <div key={index} className="relative group">
                  <img
                    src={URL.createObjectURL(img)}
                    alt={`Preview ${index + 1}`}
                    className="h-20 rounded-lg"
                  />
                  <div
                    onClick={() =>
                      setImages(images.filter((_, i) => i !== index))
                    }
                    className="absolute hidden group-hover:flex justify-center items-center top-0 right-0 bottom-0 left-0 bg-black/40 rounded-md cursor-pointer"
                  >
                    <X className="w-6 h-6 text-white" />
                  </div>
                </div>
              ))}
            </div>
          )}
          {/* Bottom Bar */}
          <div className="flex items-center justify-between pt-3 border-t border-gray-300">
            <label htmlFor="images" className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-700 transition cursor-pointer">
              <Image className="size-6" />
            </label>
            <input type="file" id="images" accepts='image/*' hidden multiple onChange={(e) => setImages([...images, ...e.target.files])} />
            <button disabled={loading} onClick={() => toast.promise(handleSubmit(), {
              loading: 'Publishing...',
              success: 'Post published!',
              error: 'Failed to publish post.'
            })} className="text-sm bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 active:scale-95 text-white font-medium px-8 py-2 rounded-md cursor-pointer">
              Publish Post
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatePost;
