'use client'
import { useState } from 'react'

const Post = ({ id, title, content, completed = false, onPostUpdated }) => {
  const [isEditing, setIsEditing] = useState(false)
  const [editTitle, setEditTitle] = useState(title)
  const [editContent, setEditContent] = useState(content)
  const [isCompleted, setIsCompleted] = useState(completed)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleDelete = () => {
    fetch(`/api/posts/${id}`, {
      method: 'DELETE',
    })
      .then(res => {
        if (res.ok) {
          onPostUpdated()
        }
      })
      .catch(err => console.error('Error deleting post:', err))
  }

  const handleUpdate = (event) => {
    event.preventDefault();
    setIsSubmitting(true);

    if (!editTitle || !editContent) {
      alert("Title and content are required.");
      setIsSubmitting(false);
      return;
    }

    fetch(`/api/posts/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        title: editTitle,
        content: editContent,
        completed: isCompleted,
        published: true
      })
    })
      .then(res => res.json())
      .then(data => {
        if (data.error) {
          throw new Error(data.error);
        }
        setIsEditing(false);
        onPostUpdated();
      })
      .catch(error => {
        console.error('Error:', error);
        alert('Failed to update post. Please try again.');
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  const toggleComplete = () => {
    const newCompletedStatus = !isCompleted;
    fetch(`/api/posts/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title,
        content,
        completed: newCompletedStatus,
        published: true // Add this if needed based on your schema
      }),
    })
      .then(res => {
        if (res.ok) {
          setIsCompleted(newCompletedStatus)
          onPostUpdated()
        }
      })
      .catch(err => console.error('Error updating completion status:', err))
  }

  if (isEditing) {
    return (
      <div className='bg-white rounded-lg shadow-lg p-6 transition-all duration-300 hover:shadow-xl'>
        <form onSubmit={handleUpdate} className="space-y-4">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
              Title
            </label>
            <input
              type="text"
              id="title"
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-black"
              placeholder="Enter title"
              required
              disabled={isSubmitting}
            />
          </div>

          <div>
            <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              id="content"
              value={editContent}
              onChange={(e) => setEditContent(e.target.value)}
              rows="3"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-black"
              placeholder="Enter description"
              required
              disabled={isSubmitting}
            />
          </div>

          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id={`completed-${id}`}
              checked={isCompleted}
              onChange={(e) => setIsCompleted(e.target.checked)}
              className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              disabled={isSubmitting}
            />
            <label 
              htmlFor={`completed-${id}`}
              className="text-sm text-gray-700 cursor-pointer select-none"
            >
              Mark as completed
            </label>
          </div>

          <div className="flex gap-2 pt-4">
            <button
              type="submit"
              disabled={isSubmitting}
              className={`px-4 py-2 rounded-md transition-colors duration-200 flex items-center ${
                isSubmitting 
                  ? 'bg-blue-400 cursor-not-allowed' 
                  : 'bg-blue-600 hover:bg-blue-700'
              } text-white`}
            >
              {isSubmitting ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Saving...
                </>
              ) : (
                'Save Changes'
              )}
            </button>
            <button
              type="button"
              onClick={() => setIsEditing(false)}
              disabled={isSubmitting}
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors duration-200"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    )
  }

  return (
    <div className={`bg-white rounded-lg shadow-lg p-6 transition-all duration-300 hover:shadow-xl ${isCompleted ? 'border-l-4 border-green-500' : ''}`}>
      <div className="flex justify-between items-start mb-4">
        <div className="flex-1">
          <h4 className={`text-xl font-semibold ${isCompleted ? 'text-gray-500 line-through' : 'text-gray-800'}`}>
            {title}
          </h4>
          <p className={`mt-2 text-gray-600 ${isCompleted ? 'line-through' : ''}`}>
            {content}
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={toggleComplete}
            className={`p-2 rounded-full transition-colors duration-200 ${
              isCompleted 
                ? 'bg-green-100 text-green-600 hover:bg-green-200' 
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
      </div>
      
      <div className="flex gap-2 mt-4 justify-end">
        <button
          onClick={() => setIsEditing(true)}
          className="px-4 py-2 text-sm bg-blue-50 text-blue-600 rounded-md hover:bg-blue-100 transition-colors duration-200 flex items-center"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
            <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
          </svg>
          Edit
        </button>
        <button
          onClick={handleDelete}
          className="px-4 py-2 text-sm bg-red-50 text-red-600 rounded-md hover:bg-red-100 transition-colors duration-200 flex items-center"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
          Delete
        </button>
      </div>
    </div>
  )
}

export default Post 