import { Context } from 'aws-lambda';
export interface Handler<Event, Callback> extends Function {
    (event: Event, context: Context, callback: Callback): void;
}
