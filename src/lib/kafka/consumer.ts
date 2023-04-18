import { kafka } from '@/lib/kafka'
import { User } from '@/models/user/user.model'

const topic = process.env.TOPIC
const app = process.env.APP_NAME

export const consumer = async (): Promise<void> => {
  const consumer = kafka.consumer({ groupId: `${app}` })

  await consumer.connect()
  await consumer.subscribe({ topic, fromBeginning: true })

  await consumer.run({
    eachMessage: async ({ topic, message, partition }) => {
      const user = JSON.parse(message.value?.toString())
      const userDb = await User.create(user)

      await userDb.save()

      console.log({
        topic,
        partition,
        value: user,
        offset: Number(message.offset),
      })
    },
  })
}
