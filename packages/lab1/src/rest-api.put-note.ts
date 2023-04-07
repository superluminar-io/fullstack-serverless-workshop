import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocument } from '@aws-sdk/lib-dynamodb';

export const handler = async (event: AWSLambda.APIGatewayProxyEvent) => {
  const DB = DynamoDBDocument.from(new DynamoDBClient({}));

  const body = JSON.parse(event.body || '{}');

  const corsHeader = {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true,
    }
  }

  if (!body.title || !body.content) {
    return {
      ...corsHeader,
      statusCode: 400,
    };
  }

  await DB.put({
    Item: {
      id: new Date().toISOString(),
      title: body.title,
      content: body.content,
    },
    TableName: process.env.TABLE_NAME!,
  });

  return {
    ...corsHeader,
    statusCode: 201,
  };
};
