import React, { useState, useEffect } from "react"
import { collection, onSnapshot, query, orderBy } from "firebase/firestore"
import { db } from "../firebase"

const useGetComments = id => {
  const [comments, setComments] = useState([])

  useEffect(() => {
    let unSubscribed
    const getAllPosts = async () => {
      const postsCollection = collection(db, `posts/${id}/comments`)

      unSubscribed = onSnapshot(
        query(postsCollection, orderBy("commentTime", "desc")),
        snapshot => {
          setComments([])
          snapshot.docs.map(doc => {
            const comment = {
              id: doc.id,
              data: doc.data(),
            }
            setComments(posts => [...posts, comment])
          })
        }
      )
    }
    getAllPosts()
    return () => unSubscribed()
  }, [])

  return comments
}

export default useGetComments
