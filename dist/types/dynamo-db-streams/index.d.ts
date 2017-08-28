import { Callback } from 'aws-lambda';
import { Handler } from '../_base';
export interface DynamoDBStreamsHandler extends Handler<DynamoDBStreamsEvent, Callback | undefined> {
}
export interface DynamoDBStreamsEvent {
    Records: DynamoDBStreamsRecord[];
}
/**
 * @see {@link http://docs.aws.amazon.com/ja_jp/lambda/latest/dg/with-dynamodb-create-function.html}
 */
export interface DynamoDBStreamsRecord {
    eventID: string;
    eventName: string;
    eventVersion: string;
    eventSource: string;
    awsRegion: string;
    dynamodb: {
        Keys: {
            [key: string]: any;
        };
        NewImage?: {
            [key: string]: any;
        };
        OldImage?: {
            [key: string]: any;
        };
        SequenceNumber: string;
        SizeBytes: number;
        StreamViewType: string;
    };
    eventSourceARN: string;
}
