import { getProviders, signIn } from "next-auth/client"
import Button from "@material-tailwind/react/Button"
import Image from "next/image"
import { getSession } from "next-auth/client"

export async function getServerSideProps(context) {
  const providers = await getProviders()
  const { req } = context
  const session = await getSession({ req })

  if (session) {
    return {
      redirect: { destination: "/" },
    }
  }
  return {
    props: { providers },
  }
}
const SignIn = ({ providers }) => {
  return (
    <div className="w-full h-screen flex flex-col items-center justify-evenly">
      <div className="flex flex-col items-center justify-center">
        <Image
          src="/images/instagram-text.png"
          width={300}
          height={100}
          alt="Instagram logo signin"
        />
        <p className="italic">
          This is not REAL App, it's for demo purposes only.
        </p>
      </div>

      {Object.values(providers).map(provider => (
        <div key={provider.name}>
          <Button
            color="lightBlue"
            onClick={() => signIn(provider.id)}
            size="md"
            rounded={false}
            block={false}
            iconOnly={false}
            ripple="light"
          >
            Sign in with {provider.name}
          </Button>
        </div>
      ))}
    </div>
  )
}

export default SignIn
