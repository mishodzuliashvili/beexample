// components/dashboard/PostCard.tsx
"use client";
import React, { useState } from "react";
import { formatDistanceToNow } from "date-fns";
import { Heart, Award, Flame, MessageCircle, User as UserIcon } from "lucide-react";
import { User, Post, Group, PostType } from "@prisma/client";
import { createReaction } from "@/actions/post";

// Updated interface to match the structure returned from Prisma
interface PostWithAuthorAndGroup extends Post {
  author: {
    id: string;
    name: string;
    image: string;
  };
  group: {
    id: string;
    name: string;
    image: string;
  };
  _count: {
    reactions: number;
  };
}

interface PostCardProps {
  post: PostWithAuthorAndGroup;
  currentUser: User;
}

const PostCard = ({ post, currentUser }: PostCardProps) => {
  const [reactionCount, setReactionCount] = useState(post._count.reactions);
  const [hasReacted, setHasReacted] = useState(false);
  
  const handleReaction = async () => {
    if (hasReacted) return;
    
    try {
      await createReaction({
        postId: post.id,
        type: "LIKE"
      });
      
      setReactionCount(prev => prev + 1);
      setHasReacted(true);
    } catch (error) {
      console.error("Error creating reaction:", error);
    }
  };
  
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden">
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            {post.author.image ? (
              <img 
                src={post.author.image} 
                alt={post.author.name} 
                className="h-10 w-10 rounded-full object-cover"
              />
            ) : (
              <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                <UserIcon className="h-6 w-6 text-blue-600" />
              </div>
            )}
            <div>
              <h3 className="font-medium text-gray-900">{post.author.name}</h3>
              <div className="flex items-center text-sm text-gray-500">
                <span>{formatDistanceToNow(new Date(post.createdAt), { addSuffix: true })}</span>
                <span className="mx-1">•</span>
                <span className="flex items-center gap-1">
                  {post.type === PostType.MOTIVATIONAL ? (
                    <Flame className="h-3 w-3 text-orange-500" />
                  ) : (
                    <Award className="h-3 w-3 text-purple-500" />
                  )}
                  {post.type === PostType.MOTIVATIONAL ? "Motivational" : "Achievement"}
                </span>
              </div>
            </div>
          </div>
          
          <div className="flex items-center px-3 py-1 rounded-full bg-blue-50 text-blue-600">
            <span className="text-sm font-medium">{post.group.name}</span>
          </div>
        </div>
        
        <p className="text-gray-700 mb-4">{post.content}</p>
        
        {post.image && (
          <div className="mb-4 rounded-lg overflow-hidden">
            <img 
              src={post.image} 
              alt="Post image" 
              className="w-full h-auto object-cover"
            />
          </div>
        )}
        
        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          <button 
            onClick={handleReaction}
            className={`flex items-center gap-1 px-3 py-2 rounded-lg transition-colors duration-200 ${
              hasReacted 
                ? "text-red-600 bg-red-50" 
                : "text-gray-700 hover:bg-gray-100"
            }`}
          >
            <Heart className={`h-5 w-5 ${hasReacted ? "fill-red-600" : ""}`} />
            <span>{reactionCount}</span>
          </button>
          
          <div className="flex items-center gap-1 text-gray-500">
            <MessageCircle className="h-5 w-5" />
            <span>Share</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostCard;