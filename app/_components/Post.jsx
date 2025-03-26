'use client'
import React, { useState } from 'react'

const Post = ({title, content, author, id, onPostUpdated}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(title);
  const [editContent, setEditContent] = useState(content);

  const handleDelete = async () => {
    try {
      const response = await fetch(`/api/posts/${id}`, {
        method: 'DELETE',
      });
      
      if (response.ok) {
        // Refresh the posts list
        if (onPostUpdated) onPostUpdated();
      } else {
        console.error('Failed to delete post');
      }
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  };

  const handleUpdate = async () => {
    try {
      const response = await fetch(`/api/posts/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: editTitle,
          content: editContent,
        }),
      });

      if (response.ok) {
        setIsEditing(false);
        if (onPostUpdated) onPostUpdated();
      } else {
        console.error('Failed to update post');
      }
    } catch (error) {
      console.error('Error updating post:', error);
    }
  };

  if (isEditing) {
    return (
      <div className='flex flex-col justify-center border rounded-md p-7'>
        <input
          type="text"
          value={editTitle}
          onChange={(e) => setEditTitle(e.target.value)}
          className="mb-2 p-2 border rounded text-black"
        />
        <textarea
          value={editContent}
          onChange={(e) => setEditContent(e.target.value)}
          className="mb-2 p-2 border rounded text-black"
        />
        <div className="flex gap-2">
          <button
            onClick={handleUpdate}
            className="bg-green-500 text-white px-4 py-2 rounded"
          >
            Save
          </button>
          <button
            onClick={() => setIsEditing(false)}
            className="bg-gray-500 text-white px-4 py-2 rounded"
          >
            Cancel
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className='flex flex-col justify-center border rounded-md p-7'>
      <h4 className='text-center font-semibold'></h4>
      <h4>Title - {title}</h4>
      <p>Description - {content}</p>
      <div className="flex gap-2 mt-4">
        <button
          onClick={() => setIsEditing(true)}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Edit
        </button>
        <button
          onClick={handleDelete}
          className="bg-red-500 text-white px-4 py-2 rounded"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default Post;