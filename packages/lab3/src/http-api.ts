import * as apigwv2 from "@aws-cdk/aws-apigatewayv2-alpha";
import { HttpLambdaIntegration } from "@aws-cdk/aws-apigatewayv2-integrations-alpha";
import { NodejsFunction } from "aws-cdk-lib/aws-lambda-nodejs";
import { CfnOutput } from "aws-cdk-lib";
import * as dynamodb from "aws-cdk-lib/aws-dynamodb";
import { Construct } from "constructs";

export class HttpApi extends Construct {
  public notesTable: dynamodb.Table;

  constructor(scope: Construct, id: string) {
    super(scope, id);

    this.notesTable = new dynamodb.Table(this, "notes-table", {
      partitionKey: { name: "id", type: dynamodb.AttributeType.STRING },
      stream: dynamodb.StreamViewType.NEW_IMAGE,
    });

    const putNote = new NodejsFunction(this, "put-note", {
      environment: {
        TABLE_NAME: this.notesTable.tableName,
      },
    });

    const listNotes = new NodejsFunction(this, "list-notes", {
      environment: {
        TABLE_NAME: this.notesTable.tableName,
      },
    });

    this.notesTable.grant(putNote, "dynamodb:PutItem");
    this.notesTable.grant(listNotes, "dynamodb:Scan");

    const api = new apigwv2.HttpApi(this, "api", {
      corsPreflight: {
        allowHeaders: ["Content-Type"],
        allowMethods: [
          apigwv2.CorsHttpMethod.GET,
          apigwv2.CorsHttpMethod.OPTIONS,
          apigwv2.CorsHttpMethod.POST,
        ],
        allowOrigins: ["*"],
      },
    });

    const putNotesIntegration = new HttpLambdaIntegration(
      "putNotesIntegration",
      putNote
    );

    const listNotesIntegration = new HttpLambdaIntegration(
      "listNotesIntegration",
      listNotes
    );

    api.addRoutes({
      path: "/notes",
      methods: [apigwv2.HttpMethod.POST],
      integration: putNotesIntegration,
    });

    api.addRoutes({
      path: "/notes",
      methods: [apigwv2.HttpMethod.GET],
      integration: listNotesIntegration,
    });

    new CfnOutput(this, "apiEndpoint", {
      value: api.url!,
    });
  }
}
