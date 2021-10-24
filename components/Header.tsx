import React, { useEffect, useState } from "react"
import Image from "next/image"
import {
  PaperAirplaneIcon,
  PlusCircleIcon,
  UserGroupIcon,
  HeartIcon,
  SearchIcon,
} from "@heroicons/react/outline"
import { HomeIcon } from "@heroicons/react/solid"
import ModalScreen from "./Modal"
import { useRecoilState } from "recoil"
import { isOpenState, UserState } from "../recoil"
import Button from "@material-tailwind/react/Button"
import { useSession, signIn, signOut } from "next-auth/client"
import useGetPosts from "../Hooks/useGetPosts"

const Header = () => {
  const [showModal, setShowModal] = useRecoilState(isOpenState)
  const [session] = useSession()
  const [user, setUser] = useRecoilState(UserState)
  const posts = useGetPosts()

  useEffect(() => {
    if (session) {
      setUser(session)
    }
  }, [session])

  return (
    <div className="w-full sticky top-0 z-50  h-[70px] bg-gray-100 shadow-md flex items-center justify-center">
      <div className="w-full lg:w-[70%] flex items-center justify-between px-2">
        {/* Header Logo */}
        <div className="w-[40px] h-[40px] relative lg:hidden cursor-pointer">
          <Image
            src="/images/instagram.png"
            width={40}
            height={40}
            alt="instagram logo"
            className="absolute"
          />
        </div>
        <div className="w-[100px] h-[40px] relative hidden lg:block cursor-pointer">
          <Image
            src="/images/instagram-text.png"
            width={70}
            height={40}
            alt="instagram logo"
            className="absolute "
          />
        </div>

        {/* Header Search Input */}
        {session && (
          <div className="hidden lg:flex items-center w-[250px] px-2 space-x-1 rounded border-2 border-gray-200 group hover:border-blue-700">
            <SearchIcon className="w-6 h-6" />
            <input
              className="flex-grow h-[40px] bg-transparent  border border-transparent outline-none"
              type="text"
              placeholder="Search"
            />
          </div>
        )}

        {/* Header menu icons */}
        <div className="flex items-center space-x-2">
          {session ? (
            <>
              <HomeIcon className="icon-class" />
              <div className="relative">
                <PaperAirplaneIcon className="icon-class rotate-45" />
                {posts.length > 0 && (
                  <p className="w-4 h-4 rounded-full bg-red-500 absolute -top-2 -right-1 flex items-center justify-center animate-pulse text-white p-2">
                    {posts?.length}
                  </p>
                )}
              </div>
              <Button
                buttonType="link"
                size="regular"
                rounded={false}
                block={false}
                iconOnly={true}
                ripple="dark"
                className="text-black"
                onClick={() => setShowModal(true)}
              >
                <PlusCircleIcon className="icon-class " />
              </Button>

              <UserGroupIcon className="icon-class" />
              <HeartIcon className="icon-class" />
              <div>
                <Image
                  src={session?.user.image}
                  width={40}
                  height={40}
                  alt="profile image"
                  className="rounded cursor-pointer  "
                  onClick={() => signOut()}
                />
              </div>
            </>
          ) : (
            <>
              <HomeIcon className="icon-class" />
              <button onClick={() => signIn()}>Sign in</button>
            </>
          )}
        </div>
      </div>
      <ModalScreen />
    </div>
  )
}

export default Header
