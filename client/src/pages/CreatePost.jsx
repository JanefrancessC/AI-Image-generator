import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { preview } from "../assets";
import { getRandomPrompt } from "../utils";
import { FormField, Loader } from "../components";

const CreatePost = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    prompt: "",
    photo: "",
  });
  const [generateImg, setGenerateImg] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSurpriseMe = () => {
    const randomPrompt = getRandomPrompt(form.prompt);
    setForm({ ...form, prompt: randomPrompt });
  };

  const generateImage = async () => {
    if (form.prompt) {
      try {
        setGenerateImg(true)
        const response = await fetch('http://localhost:5000/api/v1/dalle', {
          method: 'POST',
          headers: { 
          'Content-Type': 'application/json',
           },
           body: JSON.stringify({ prompt: form.prompt }),
        })
      } catch (error) {
        
      }
    }
  };

  return (
    <section className="max-w-7x1 mx-auto">
      <div>
        <h1 className="text-[32px] font-extrabold">Create</h1>
        <p className="mt-2 text-[#666e75] text-[16px] max-w[500px]">
          Create stunning AI images through DALL-E AI and share them with others
        </p>
      </div>

      <form className="mt-16 max-w-3x1" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-5">
          <FormField
            labelName="Your name"
            type="text"
            name="name"
            placeholder="Enter your name"
            value={form.name}
            handleChange={handleChange}
          />
          <FormField
            labelName="Prompt"
            type="text"
            name="prompt"
            placeholder="A comic book cover of a superhero wearing headphones"
            value={form.prompt}
            handleChange={handleChange}
            isSurpriseMe
            handleSurpriseMe={handleSurpriseMe}
          />
          <div className="relative bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-64 p-3 h-64 flex justify-center items-center">
            {form.photo ? (
              <img
                src={form.photo}
                alt={form.prompt}
                className="w-full h-full object-contain"
              />
            ) : (
              <img
                src={preview}
                alt={preview}
                className="w-9/12 h-9/12 object-contain opacity-40"
              />
            )}

            {generateImg && (
              <div className="absolute inset-0 z-0 flex justify-center items-centwe bg-[rgba(0,0,0,0,0.5)] rounder-lg">
                <Loader />
              </div>
            )}
          </div>
        </div>
        <div className="mt-5 flex gap-5">
          <button
            type="button"
            onClick={generateImage}
            className="text-white bg-green-700 font-medium rounded-md text-sm w-full sm:w-auto px-5 py-2.5 text-center"
          >
            {generateImg ? "Generating..." : "Generate"}
          </button>
        </div>

        <div className="mt-10">
          <p className="mt-2 text-[#666e75] text-[14px]">
            Share your AI image with the community
          </p>
          <button classname="mt-3 text-white bg-[#6469ff] " type="submit">
            {loading ? "Sharing..." : "Share with community"}
          </button>
        </div>
      </form>
    </section>
  );
};

export default CreatePost;
