import React, { useEffect, useRef } from "react"
import Image from "next/image"
import {
  DotsHorizontalIcon,
  PaperAirplaneIcon,
  ChatIcon,
  BookmarkIcon,
  EmojiHappyIcon,
} from "@heroicons/react/outline"
import { HeartIcon } from "@heroicons/react/solid"
import { useRecoilValue } from "recoil"
import { UserState } from "../recoil"
import { db } from "../firebase"
import {
  doc,
  addDoc,
  setDoc,
  collection,
  deleteDoc,
  serverTimestamp,
} from "firebase/firestore"
import useGetLikes from "../Hooks/useGetLikes"
import useGetComments from "../Hooks/useGetComments"
import Moment from "react-moment"

const Posts = ({ post, id }) => {
  const [liked, setLiked] = React.useState(false)
  const session = useRecoilValue(UserState)
  const likes = useGetLikes(id)
  const comments = useGetComments(id)
  const commentRef = useRef(null)

  useEffect(() => {
    const checkLike = likes.findIndex(like =>
      like === session?.user.name ? true : false
    )
    setLiked(checkLike === -1 ? false : true)
  }, [likes])

  const addLike = async () => {
    if (!liked) {
      await setDoc(doc(db, `posts/${id}/likes`, session?.user.name), {
        likedUser: session?.user?.name,
      })
    } else {
      await deleteDoc(doc(db, `posts/${id}/likes/${session?.user.name}`))
    }
  }

  const addComment = async e => {
    e.preventDefault()
    const comment = commentRef.current.value
    await addDoc(collection(db, `posts/${id}/comments`), {
      comment,
      commentUser: session.user.name,
      userPhoto: session.user.image,
      commentTime: serverTimestamp(),
    })
    commentRef.current.value = ""
  }

  return (
    <div className="bg-white shadow-sm rounded mt-7 w-full">
      {/* Post Header */}
      <div className="flex items-center justify-between px-4 py-2">
        <div className="flex items-center justify-center space-x-3">
          <Image
            src={post?.userPhoto}
            width={40}
            height={40}
            alt="instagram"
            className="rounded"
          />
          <p className="font-semibold">{post.name}</p>
        </div>
        <DotsHorizontalIcon className="h-6 w-6" />
      </div>
      {/* Post Header End */}

      {/* post Image */}
      <div className="relative w-full h-[300px] mt-2">
        {post.image && (
          <Image
            src={post?.image}
            layout="fill"
            alt="post Image"
            className="absolute w-full h-[300px] "
          />
        )}
      </div>
      {/* post Image End*/}

      {/* Post Social icons */}
      {session && (
        <div className="flex items-center justify-between p-2">
          <div className="flex items-center justify-center space-x-2 ">
            <HeartIcon
              className={`icon-class ${liked && "text-red-500"}`}
              onClick={addLike}
            />
            <ChatIcon className="icon-class" />
            <PaperAirplaneIcon className="icon-class" />
          </div>
          <BookmarkIcon className="icon-class" />
        </div>
      )}
      {/* Post Social icons End */}

      {/* Post description */}
      <div className="px-2">
        {session && likes.length > 0 && (
          <p className="font-semibold">{likes?.length} likes</p>
        )}
        <p className={`${!session && "p-3"}`}>{post?.caption}</p>
      </div>
      {/* Post description End */}

      {/* Post comments */}
      {session && comments?.length > 0 && (
        <div className=" py-2 overflow-y-scroll h-[60px]">
          {comments?.map(({ id, data }) => (
            <div className="flex items-center justify-between mt-2" key={id}>
              <div className="flex items-center space-x-3 ml-16">
                <Image
                  src={data.userPhoto}
                  width={30}
                  height={30}
                  alt="instagram"
                  className="rounded"
                />
                <p className="font-semibold">{data.comment}</p>
              </div>
              <p className="font-semibold mr-4">
                <Moment fromNow>
                  {new Date(data?.commentTime?.seconds * 1000)}
                </Moment>
              </p>
            </div>
          ))}
        </div>
      )}
      {/* Post comments End */}

      {/* Post comments Input*/}
      {session && (
        <form
          onSubmit={addComment}
          className="flex items-center justify-between px-2"
        >
          <div className="flex items-center space-x-3 flex-grow">
            <EmojiHappyIcon className="h-6 w-6" />
            <input
              className="flex-grow h-[40px] bg-transparent  border border-transparent outline-none"
              type="text"
              placeholder="Add a comment..."
              ref={commentRef}
            />
          </div>
          <button className="font-semibold text-gray-300 hover:text-gray-500">
            Post
          </button>
        </form>
      )}
      {/* Post comments Input End*/}
    </div>
  )
}

export default Posts
