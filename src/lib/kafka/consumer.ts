import { kafka } from '@/lib/kafka'
import { Log } from '@/models/log/log.model'
import { User } from '@/models/user/user.model'
import Logger from '../log/logger'

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
      const kafka = {
        topic,
        user,
        partition,
        offset: Number(message.offset),
      }
      const logDb = await Log.create({
        toJSON: kafka,
      })

      await logDb.save()

      await userDb.save().catch(async (error) => {
        if (error) {
          const logSaved = await Log.create({
            toJSON: error,
          })

          await logSaved.save()
        }

        Logger.info('Record saved.')
      })

      console.log({
        topic,
        partition,
        value: user,
        offset: Number(message.offset),
      })
    },
  })
}
