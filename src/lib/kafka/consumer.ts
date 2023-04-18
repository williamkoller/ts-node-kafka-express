import { kafka } from '@/lib/kafka'

const topic = process.env.TOPIC
const app = process.env.APP_NAME

console.log({ app })

export const consumer = async (): Promise<void> => {
  const consumer = kafka.consumer({ groupId: `${app}` })

  await consumer.connect()
  await consumer.subscribe({ topic, fromBeginning: true })

  await consumer.run({
    eachMessage: async ({ topic, message, partition }) => {
      console.log({
        topic,
        partition,
        value: JSON.parse(message.value?.toString()),
        offset: Number(message.offset),
      })
    },
  })
}
