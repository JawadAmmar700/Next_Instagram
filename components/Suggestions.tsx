import React from "react"
import Image from "next/image"
import { signOut } from "next-auth/client"
import { useRecoilValue } from "recoil"
import { UserState } from "../recoil"

const Suggestions = ({ data }) => {
  const users = data?.filter((_, id) => id < 3)
  const session = useRecoilValue(UserState)

  return (
    <div className="flex-grow h-[300px] hidden lg:block rounded sticky top-24 p-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <Image
            src={session?.user.image}
            width={40}
            height={40}
            alt="instagram"
            className="rounded"
          />
          <div className="flex flex-col">
            <p className="font-semibold">{session.user.name}</p>
            <p className="lg:text-sm">Welcome to instagram</p>
          </div>
        </div>
        <button
          className="-mt-5 lg:text-sm scale-100 hover:scale-110 hover:text-blue-400"
          onClick={() => signOut()}
        >
          Sign out
        </button>
      </div>
      <div className="flex items-center justify-between p-2">
        <p className="text-gray-500">Suggestions for you</p>
        <p className="text-gray-500">See All</p>
      </div>
      <div>
        {users?.map((user, id) => (
          <div className="flex items-center justify-between p-2" key={id}>
            <div className="flex space-x-2 items-center ">
              <Image
                src={user?.avatar}
                width={30}
                height={30}
                alt={`user-${id}`}
                className="rounded-full"
              />
              <div>
                <p className="font-semibold">{user?.name}</p>
                <p className="text-gray-500 text-sm">Works at {user?.works}</p>
              </div>
            </div>
            <p className="text-blue-400 cursor-pointer">follow</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Suggestions
