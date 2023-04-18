import { producer } from '@/lib/kafka/producer'
import { Request, Response } from 'express'
import { CompressionTypes } from 'kafkajs'
import { randomUUID } from 'node:crypto'

const topic = process.env.TOPIC

export default class UserController {
  public async create(req: Request, res: Response): Promise<Response> {
    const { name, surname, age } = req.body

    const dataBody = {
      id: randomUUID(),
      name,
      surname,
      age,
    }

    const prod = await producer()

    await prod.send({
      topic,
      compression: CompressionTypes.GZIP,
      messages: [
        {
          key: dataBody.id,
          value: JSON.stringify(dataBody),
        },
      ],
    })

    await prod.disconnect()

    return res.status(201).json(dataBody)
  }
}
