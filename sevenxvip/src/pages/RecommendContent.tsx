import React, { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { Send, MessageSquare, Lightbulb, CheckCircle, AlertCircle, Upload, X } from "lucide-react";

const RecommendContent: React.FC = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState<"success" | "error" | "">("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const token = localStorage.getItem("Token");
  const email = localStorage.getItem("email");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title || !description) {
      setMessage("Please fill in all fields.");
      setMessageType("error");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/recommendations`,
        {
          title,
          description,
          email,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setMessage(response.data.message);
      setMessageType("success");
      setTitle("");
      setDescription("");

      setTimeout(() => {
        setMessage("");
        setMessageType("");
      }, 5000);
    } catch (error) {
      console.error("Error submitting recommendation:", error);
      setMessage("There was an error submitting your recommendation.");
      setMessageType("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="dreamy-page">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <motion.div
            className="w-20 h-20 bg-gradient-to-br from-red-500 to-red-600 rounded-full flex items-center justify-center mx-auto mb-6"
            animate={{ rotate: [0, 5, -5, 0] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            <Lightbulb className="w-10 h-10 text-white" />
          </motion.div>
          
          <h1 className="text-5xl font-black text-gray-900 mb-6">
            Recommend Content
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Have an idea for content you'd like to see? Share your recommendations with us and help shape our community!
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="dreamy-form"
        >
          {message && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className={messageType === "success" ? "dreamy-alert-success" : "dreamy-alert-error"}
            >
              <div className="flex items-center gap-3">
                {messageType === "success" ? (
                  <CheckCircle className="w-5 h-5" />
                ) : (
                  <AlertCircle className="w-5 h-5" />
                )}
                <span className="font-medium">{message}</span>
              </div>
            </motion.div>
          )}

          <form onSubmit={handleSubmit} className="space-y-8">
            <div>
              <label htmlFor="title" className="block text-lg font-bold text-gray-900 mb-3">
                Content Title
              </label>
              <div className="relative">
                <MessageSquare className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="dreamy-input w-full pl-12 pr-4 text-gray-900 placeholder-gray-500"
                  placeholder="Enter a descriptive title for your content recommendation"
                  required
                />
              </div>
            </div>

            <div>
              <label htmlFor="description" className="block text-lg font-bold text-gray-900 mb-3">
                Detailed Description
              </label>
              <textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={8}
                className="dreamy-input w-full p-4 text-gray-900 placeholder-gray-500 resize-none"
                placeholder="Provide a detailed description of the content you'd like to recommend. Include any specific details, sources, or reasons why this content would be valuable to our community..."
                required
              />
              <div className="mt-2 text-sm text-gray-500">
                {description.length}/500 characters
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={isSubmitting}
              className={`dreamy-button w-full py-4 text-lg flex items-center justify-center gap-3 ${
                isSubmitting ? 'opacity-75 cursor-not-allowed' : ''
              }`}
            >
              {isSubmitting ? (
                <>
                  <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Submitting Recommendation...</span>
                </>
              ) : (
                <>
                  <Send className="w-5 h-5" />
                  <span>Submit Recommendation</span>
                </>
              )}
            </motion.button>
          </form>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-8 p-6 bg-gradient-to-r from-red-50 to-red-100 rounded-2xl border border-red-200"
          >
            <h3 className="text-lg font-bold text-red-900 mb-2">
              💡 Tips for Great Recommendations
            </h3>
            <ul className="text-red-800 space-y-2 text-sm">
              <li>• Be specific about what type of content you're recommending</li>
              <li>• Include any relevant sources or references if available</li>
              <li>• Explain why this content would be valuable to our community</li>
              <li>• Check if similar content already exists before submitting</li>
            </ul>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default RecommendContent;