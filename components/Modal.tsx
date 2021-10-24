import React, { useState, useRef } from "react"
import Modal from "@material-tailwind/react/Modal"
import ModalBody from "@material-tailwind/react/ModalBody"
import ModalFooter from "@material-tailwind/react/ModalFooter"
import Button from "@material-tailwind/react/Button"
import Input from "@material-tailwind/react/Input"
import { CameraIcon } from "@heroicons/react/outline"
import { useRecoilState, useRecoilValue } from "recoil"
import { isOpenState, UserState } from "../recoil"
import Image from "next/image"
import { db, storage } from "../firebase"
import {
  doc,
  setDoc,
  addDoc,
  collection,
  updateDoc,
  serverTimestamp,
} from "firebase/firestore"
import { getStorage, ref, getDownloadURL, uploadString } from "firebase/storage"
import { v4 as uuidv4 } from "uuid"

export default function ModalScreen() {
  const [showModal, setShowModal] = useRecoilState(isOpenState)
  const session = useRecoilValue(UserState)
  const [input, setInput] = useState("")
  const [image, setImage] = useState()
  const [loading, setLoading] = useState(false)

  const selectImage = () => {
    //choose image from device
    const input = document.createElement("input")
    input.type = "file"
    input.accept = "image/*"
    input.click()
    input.onchange = async e => {
      const file = e.target.files[0]
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = e => {
        setImage(e.target.result)
      }
    }
  }

  const upload = async () => {
    setLoading(true)

    const docRef = await addDoc(collection(db, "posts"), {
      name: session.user.name,
      caption: input,
      userPhoto: session.user.image,
      time: serverTimestamp(),
    })

    const imageRef = ref(storage, `posts/${docRef.id}/image`)
    await uploadString(imageRef, image, "data_url").then(async () => {
      const covertedURL = await getDownloadURL(imageRef)
      await updateDoc(doc(db, "posts", docRef.id), {
        image: covertedURL,
      })
    })

    setLoading(false)
    setShowModal(false)
  }

  return (
    <>
      <Modal
        size="sm"
        active={showModal}
        toggler={() => {
          setImage(null)
          setShowModal(false)
        }}
      >
        <ModalBody>
          <div className="flex flex-col space-y-3 items-center justify-center">
            {image ? (
              <div className="w-[300px] h-[200px] bg-red-700 relative">
                <Image
                  src={image}
                  alt="upload image"
                  width={300}
                  height={200}
                  layout="fill"
                  className="absolute top-0"
                />
              </div>
            ) : (
              <>
                <div
                  onClick={selectImage}
                  className="flex items-center justify-center rounded-full p-3 hover:bg-gray-100 cursor-pointer hover:text-red-500"
                >
                  <CameraIcon className="h-8 w-8" />
                </div>
                <p>Upload a photo</p>
              </>
            )}
            <Input
              onChange={e => setInput(e.target.value)}
              type="text"
              color="lightBlue"
              size="sm"
              outline={true}
              placeholder="Please enter a caption..."
            />
          </div>
        </ModalBody>
        <ModalFooter>
          <Button
            color="lightBlue"
            buttonType="filled"
            onClick={upload}
            size="lg"
            rounded={false}
            block={true}
            iconOnly={false}
            ripple="light"
          >
            {loading ? "Uploading..." : "Upload"}
          </Button>
        </ModalFooter>
      </Modal>
    </>
  )
}
