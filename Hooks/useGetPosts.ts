import React, { useState, useEffect } from "react"
import { collection, onSnapshot, orderBy, query } from "firebase/firestore"
import { db } from "../firebase"

const useGetPosts = () => {
  const [posts, setPosts] = useState([])

  useEffect(() => {
    let unSubscribed
    const getAllPosts = async () => {
      const postsCollection = collection(db, "posts")

      unSubscribed = onSnapshot(
        query(postsCollection, orderBy("time", "desc")),
        snapshot => {
          setPosts([])
          snapshot.docs.map(doc => {
            const post = { data: doc.data(), id: doc.id }
            setPosts(posts => [...posts, post])
          })
        }
      )
    }
    getAllPosts()
    return () => unSubscribed()
  }, [])

  return posts
}

export default useGetPosts
