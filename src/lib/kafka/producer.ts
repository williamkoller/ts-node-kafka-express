import { Partitioners } from 'kafkajs'
import { kafka } from '.'
import Logger from '@/lib/log/logger'

export const run = async () => {
  const producer = kafka.producer({
    createPartitioner: Partitioners.LegacyPartitioner,
  })

  await producer.connect()
}

run().catch(Logger.error)
