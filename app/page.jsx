"use client"
import Link from "next/link"
import { useState, useEffect } from "react"
import Post from "./components/Post"

export default function Home() {
  const [posts, setPosts] = useState([])

  const fetchPosts = () => {
    fetch('/api/posts')
      .then(res => res.json())
      .then(data => setPosts(data))
      .catch(err => console.error('Error fetching posts:', err))
  }

  useEffect(() => {
    fetchPosts()
  }, [])

  return (
    <main className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Task Manager</h1>
          <Link 
            href="/add-post" 
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-200"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
            </svg>
            Add New Task
          </Link>
        </div>
        
        <div className="space-y-4">
          {posts.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500">No tasks yet. Create your first task!</p>
            </div>
          ) : (
            posts.map((post) => (
              <Post
                key={post.id}
                {...post}
                onPostUpdated={fetchPosts}
              />
            ))
          )}
        </div>
      </div>
    </main>
  )
}
