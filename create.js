import { v1 as uuidv1 } from 'uuid';
import * as dynamoDbLib from "./libs/dynamodb-lib";
import { failure, success } from './libs/response-lib';


export async function main(event, context) {
    const data = JSON.parse(event.body);

    const params = {
        TableName: process.env.TABLE_NAME,
        Item: {
            userId: event.requestContext.identity.cognitoIdentityId,
            noteId: uuidv1(),
            content: data.content,
            attachment: data.attachment,
            createdAt: Date.now()
        }
    };

    try {
        await dynamoDbLib.call('put', params);
        return success(params.Item);
    } catch {
        return failure({ status: false });
    }
}