import React, { useEffect, useState } from "react";
import { formatDistanceToNow } from "date-fns";
import postService from "../services/postService";
import authService from "../services/authService";
import LoadingSpinner from "../components/LoadingSpinner";
import { FiHeart, FiMessageCircle, FiRepeat, FiShare2, FiMoreHorizontal } from "react-icons/fi";

const ShareYourThought = () => {
    const [content, setContent] = useState("");
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [replyingTo, setReplyingTo] = useState(null);
    const [replyContent, setReplyContent] = useState("");
    const user = authService.getCurrentUser();

    const fetchPosts = async () => {
        try {
            setLoading(true);
            const res = await postService.getAllPosts();
            if (res.success) {
                setPosts(res.data.reverse());
            } else {
                setError(res.message || "Failed to fetch posts");
            }
        } catch (err) {
            setError(err.message || "An error occurred");
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);

        if (!content.trim()) {
            setError("Post content cannot be empty");
            return;
        }

        try {
            const newPost = {
                content,
                userId: user?.email || "Anonymous",
                username: user?.name || "Anonymous",
                likes: [],
                replies: []
            };

            const res = await postService.createPost(newPost);
            if (res.success) {
                setContent("");
                fetchPosts();
            } else {
                setError(res.message || "Failed to create post");
            }
        } catch (err) {
            setError(err.message || "An error occurred");
        }
    };

    const handleReplySubmit = async (postId) => {
        if (!replyContent.trim()) {
            setError("Reply cannot be empty");
            return;
        }

        try {
            const reply = {
                content: replyContent,
                userId: user?.email || "Anonymous",
                username: user?.name || "Anonymous",
                timestamp: new Date().toISOString()
            };

            const res = await postService.addReply(postId, reply);
            if (res.success) {
                setReplyContent("");
                setReplyingTo(null);
                fetchPosts();
            } else {
                setError(res.message || "Failed to add reply");
            }
        } catch (err) {
            setError(err.message || "An error occurred");
        }
    };

    const handleLike = async (postId) => {
        if (!user) {
            setError("You need to login to like posts");
            return;
        }

        try {
            const res = await postService.toggleLike(postId, user.email);
            if (res.success) {
                fetchPosts();
            } else {
                setError(res.message || "Failed to like post");
            }
        } catch (err) {
            setError(err.message || "An error occurred");
        }
    };

    useEffect(() => {
        fetchPosts();
    }, []);

    return (
        <div className="max-w-2xl mx-auto border-x border-gray-200 min-h-screen">
            {/* Header */}
            <div className="sticky top-0 z-10 bg-white bg-opacity-90 backdrop-blur-sm p-4 border-b border-gray-200">
                <h1 className="text-xl font-bold">Home</h1>
            </div>

            {/* Post composer */}
            <div className="border-b border-gray-200 p-4">
                <form onSubmit={handleSubmit} className="space-y-2">
                    <textarea
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        placeholder="What's happening?"
                        className="w-full p-3 text-lg focus:outline-none resize-none"
                        rows={3}
                        maxLength={280}
                    />
                    <div className="flex justify-between items-center">
                        <div className="text-sm text-gray-500">
                            {content.length}/280
                        </div>
                        <button
                            type="submit"
                            disabled={!content.trim()}
                            className={`px-4 py-2 bg-blue-500 text-white rounded-full font-bold ${
                                !content.trim() ? "opacity-50" : "hover:bg-blue-600"
                            }`}
                        >
                            Post
                        </button>
                    </div>
                </form>
                {error && <div className="text-red-500 text-sm mt-2">{error}</div>}
            </div>

            {/* Posts feed */}
            {loading ? (
                <LoadingSpinner />
            ) : error ? (
                <div className="p-4 text-red-500">{error}</div>
            ) : (
                <div>
                    {posts.map((post) => (
                        <div key={post._id} className="border-b border-gray-200 p-4 hover:bg-gray-50">
                            <div className="flex space-x-3">
                                <div className="flex-shrink-0">
                                    <div className="h-10 w-10 rounded-full bg-blue-500 flex items-center justify-center text-white">
                                        {post.username?.charAt(0).toUpperCase() || "A"}
                                    </div>
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center space-x-1">
                                        <span className="font-bold">{post.username || "Anonymous"}</span>
                                        <span className="text-gray-500">@{post.userId?.split('@')[0] || "anonymous"}</span>
                                        <span className="text-gray-500">·</span>
                                        <span className="text-gray-500">
                                            {formatDistanceToNow(new Date(post.createdAt || new Date()), { addSuffix: true })}
                                        </span>
                                        <button className="ml-auto text-gray-500 hover:text-blue-500">
                                            <FiMoreHorizontal />
                                        </button>
                                    </div>
                                    <p className="mt-1 text-gray-900">{post.content}</p>
                                    
                                    <div className="mt-3 flex justify-between max-w-md">
                                        <button 
                                            className="flex items-center space-x-1 text-gray-500 hover:text-blue-500"
                                            onClick={() => setReplyingTo(replyingTo === post._id ? null : post._id)}
                                        >
                                            <FiMessageCircle />
                                            <span>{post.replies?.length || 0}</span>
                                        </button>
                                        <button className="flex items-center space-x-1 text-gray-500 hover:text-green-500">
                                            <FiRepeat />
                                            <span>0</span>
                                        </button>
                                        <button 
                                            className="flex items-center space-x-1 text-gray-500 hover:text-red-500"
                                            onClick={() => handleLike(post._id)}
                                        >
                                            <FiHeart fill={post.likes?.includes(user?.email) ? "currentColor" : "none"} />
                                            <span>{post.likes?.length || 0}</span>
                                        </button>
                                        <button className="flex items-center space-x-1 text-gray-500 hover:text-blue-500">
                                            <FiShare2 />
                                        </button>
                                    </div>

                                    {/* Reply form */}
                                    {replyingTo === post._id && (
                                        <div className="mt-3 pl-2 border-l-2 border-blue-200">
                                            <textarea
                                                value={replyContent}
                                                onChange={(e) => setReplyContent(e.target.value)}
                                                placeholder="Write your reply..."
                                                className="w-full p-2 border rounded focus:outline-none resize-none"
                                                rows={2}
                                            />
                                            <div className="flex justify-end space-x-2 mt-2">
                                                <button 
                                                    onClick={() => setReplyingTo(null)}
                                                    className="px-3 py-1 text-sm border rounded-full"
                                                >
                                                    Cancel
                                                </button>
                                                <button 
                                                    onClick={() => handleReplySubmit(post._id)}
                                                    disabled={!replyContent.trim()}
                                                    className={`px-3 py-1 text-sm bg-blue-500 text-white rounded-full ${
                                                        !replyContent.trim() ? "opacity-50" : "hover:bg-blue-600"
                                                    }`}
                                                >
                                                    Reply
                                                </button>
                                            </div>
                                        </div>
                                    )}

                                    {/* Replies */}
                                    {post.replies?.length > 0 && (
                                        <div className="mt-3 space-y-3">
                                            {post.replies.map((reply, index) => (
                                                <div key={index} className="pl-2 border-l-2 border-gray-200">
                                                    <div className="flex items-center space-x-1">
                                                        <span className="font-bold text-sm">{reply.username || "Anonymous"}</span>
                                                        <span className="text-gray-500 text-sm">@{reply.userId?.split('@')[0] || "anonymous"}</span>
                                                        <span className="text-gray-500 text-sm">·</span>
                                                        <span className="text-gray-500 text-sm">
                                                            {formatDistanceToNow(new Date(reply.timestamp || new Date()), { addSuffix: true })}
                                                        </span>
                                                    </div>
                                                    <p className="text-sm text-gray-800">{reply.content}</p>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default ShareYourThought;
