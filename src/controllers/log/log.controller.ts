import { Log } from '@/models/log/log.model'
import { Request, Response } from 'express'

export default class LogController {
  public async find(_req: Request, res: Response) {
    const logs = await Log.find({}).exec()
    const logsMap = logs.map((log) => ({
      _id: log._id,
      toJSON: log.toJSON,
    }))
    const count = await Log.count()
    return res.status(200).json({
      data: logsMap,
      count,
    })
  }
}
