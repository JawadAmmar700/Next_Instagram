import Head from "next/head"
import Body from "../components/Body"
import Header from "../components/Header"

export default function Home() {
  return (
    <div className="bg-gray-200 min-h-screen">
      <Head>
        <title>Instagram</title>
        <link rel="icon" href="/images/instagram.png" />
      </Head>

      <Header />
      <Body />
    </div>
  )
}
