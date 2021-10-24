import React, { useState, useEffect } from "react"
import { collection, onSnapshot } from "firebase/firestore"
import { db } from "../firebase"

const useGetPosts = id => {
  const [likes, setLikes] = useState([])

  useEffect(() => {
    let unSubscribed
    const getAllPosts = async () => {
      const postsCollection = collection(db, `posts/${id}/likes`)

      unSubscribed = onSnapshot(postsCollection, snapshot => {
        setLikes([])
        snapshot.docs.map(doc => {
          const likes = doc.id
          setLikes(posts => [...posts, likes])
        })
      })
    }
    getAllPosts()
    return () => unSubscribed()
  }, [])

  return likes
}

export default useGetPosts
