import React from "react"
import useFaker from "../Hooks/useFaker"
import Posts from "./Posts"
import Suggestions from "./Suggestions"
import { useRecoilValue } from "recoil"
import { UserState } from "../recoil"
import useGetPosts from "../Hooks/useGetPosts"

const Body = () => {
  const { data } = useFaker()
  const user = useRecoilValue(UserState)
  const posts = useGetPosts()

  return (
    <div className="w-full lg:w-[70%]   px-2 mx-auto flex space-x-2  justify-center lg:justify-evenly">
      <div className="w-full sm:w-[70%] md:w-[70%] lg:w-[60%]  flex flex-col items-center mb-8">
        {posts?.map((post, id) => (
          <Posts key={id} post={post.data} id={post.id} />
        ))}
      </div>

      {user && (
        <div>
          <Suggestions data={data} />
        </div>
      )}
    </div>
  )
}

export default Body
