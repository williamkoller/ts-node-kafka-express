import 'dotenv/config'
import { kafka } from '@/lib/kafka'
import Logger from '@/lib/log/logger'

const topic = process.env.TOPIC
const app = process.env.APP_NAME

export const consumer = async () => {
  const consumer = kafka.consumer({ groupId: `${app}` })

  await consumer.connect()
}

consumer().catch(Logger.error)
