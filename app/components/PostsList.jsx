'use client'
import { useState } from "react"
import Post from "./Post"

const PostsList = ({ initialPosts }) => {
  const [posts, setPosts] = useState(initialPosts)

  const fetchPosts = () => {
    fetch('/api/posts')
      .then(response => response.json())
      .then(data => setPosts(data))
      .catch(error => console.error('Error fetching posts:', error))
  }

  return (
    <div className="space-y-4">
      {posts.map((post) => (
        <Post
          key={post.id}
          {...post}
          onPostUpdated={fetchPosts}
        />
      ))}
    </div>
  )
}

export default PostsList 