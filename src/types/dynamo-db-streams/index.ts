import { Callback } from 'aws-lambda'
import { Handler } from '../_base'

export interface DynamoDBStreamsHandler extends Handler<DynamoDBStreamsEvent, Callback | undefined> { }

export interface DynamoDBStreamsEvent {
  Records: DynamoDBStreamsRecord[]
}

/**
 * @see {@link http://docs.aws.amazon.com/ja_jp/lambda/latest/dg/with-dynamodb-create-function.html}
 */
export interface DynamoDBStreamsRecord {
  eventID: string
  eventName: string  // INSERT | MODIFY | REMOVE
  eventVersion: string
  eventSource: string
  awsRegion: string
  dynamodb: {
     Keys: { [key: string]: any }
     NewImage?:{ [key: string]: any }
     OldImage?: { [key: string]: any }
     SequenceNumber: string
     SizeBytes: number
     StreamViewType: string  // NEW_IMAGE | OLD_IMAGE | NEW_AND_OLD_IMAGES | KEYS_ONLY
  },
  eventSourceARN: string
}
