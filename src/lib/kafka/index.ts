import 'dotenv/config'
import { Kafka } from 'kafkajs'

export const kafka = new Kafka({
  clientId: process.env.APP_NAME,
  brokers: [`${process.env.BOOTSTRAP_SERVER}`],
})
