import { faker } from '@faker-js/faker'

faker.seed(12345)

export const users = Array.from({ length: 56 }, () => ({
  id: faker.string.uuid(),
  name: faker.person.fullName(),
  email: faker.internet.email(),
  job: faker.person.jobTitle(),
  status: faker.datatype.boolean(),
}))