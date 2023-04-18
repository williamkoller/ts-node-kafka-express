import 'dotenv/config'
import { Kafka, logLevel } from 'kafkajs'

export const kafka = new Kafka({
  clientId: process.env.APP_NAME,
  brokers: [`${process.env.BOOTSTRAP_SERVER}`],
  logLevel: logLevel.WARN,
})
