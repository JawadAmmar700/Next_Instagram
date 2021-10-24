import React from "react"
import faker from "faker"

const useFaker = () => {
  const [data, setData] = React.useState<Array<Object>>()
  const [loading, setLoading] = React.useState<Boolean>(true)

  React.useEffect(() => {
    setLoading(true)
    //create a list of users with avatar using faker
    const users = Array.from({ length: 10 }, () => ({
      avatar: faker.image.avatar(),
      name: faker.name.findName(),
      works: faker.company.companyName(),
    }))
    setData(users)
    setLoading(false)
  }, [])

  return { data, loading }
}

export default useFaker
