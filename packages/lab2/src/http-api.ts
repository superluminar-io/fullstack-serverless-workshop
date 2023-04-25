import * as apigwv2 from '@aws-cdk/aws-apigatewayv2-alpha';
import { HttpLambdaIntegration } from '@aws-cdk/aws-apigatewayv2-integrations-alpha';
import {
  aws_dynamodb as dynamodb,
  aws_lambda_nodejs as lambdaNodeJs,
} from 'aws-cdk-lib';
import { Construct } from 'constructs';

export class HttpApi extends Construct {
  public notesTable: dynamodb.Table;

  constructor(scope: Construct, id: string) {
    super(scope, id);

    this.notesTable = new dynamodb.Table(this, 'notes-table', {
      partitionKey: { name: 'id', type: dynamodb.AttributeType.STRING },
      stream: dynamodb.StreamViewType.NEW_IMAGE,
    });

    const putNote = new lambdaNodeJs.NodejsFunction(this, 'put-note', {
      environment: {
        TABLE_NAME: this.notesTable.tableName,
      },
    });

    const listNotes = new lambdaNodeJs.NodejsFunction(this, 'list-notes', {
      environment: {
        TABLE_NAME: this.notesTable.tableName,
      },
    });

    this.notesTable.grant(putNote, 'dynamodb:PutItem');
    this.notesTable.grant(listNotes, 'dynamodb:Scan');

    const api = new apigwv2.HttpApi(this, 'api', {
      corsPreflight: {
        allowHeaders: [
          'Content-Type',
        ],
        allowMethods: [
          apigwv2.CorsHttpMethod.GET,
          apigwv2.CorsHttpMethod.OPTIONS,
          apigwv2.CorsHttpMethod.POST,
        ],
        allowOrigins: ['*'],
      },
    });

    const listNotesIntegration = new HttpLambdaIntegration(
      'ListNotesIntegration',
      listNotes,
    );
    const putNotesIntegration = new HttpLambdaIntegration(
      'putNotesIntegration',
      putNote,
    );

    api.addRoutes({
      path: '/notes',
      methods: [apigwv2.HttpMethod.GET],
      integration: listNotesIntegration,
    });

    api.addRoutes({
      path: '/notes',
      methods: [apigwv2.HttpMethod.POST],
      integration: putNotesIntegration,
    });
  }
}
