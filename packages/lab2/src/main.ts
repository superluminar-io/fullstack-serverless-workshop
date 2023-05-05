import { App, Stack, StackProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { StaticHosting } from "./static-hosting";
import { HttpApi } from "./http-api";

export class MyStack extends Stack {
  constructor(scope: Construct, id: string, props: StackProps = {}) {
    super(scope, id, props);

    new StaticHosting(this, "static-hosting");

    new HttpApi(this, "http-api");
  }
}

// for development, use account/region from cdk cli
const devEnv = {
  account: process.env.CDK_DEFAULT_ACCOUNT,
  region: process.env.CDK_DEFAULT_REGION,
};

const app = new App();

new MyStack(app, 'notes-api-dev-lab2', { env: devEnv });
// new MyStack(app, 'notes-api-prod', { env: prodEnv });

app.synth();
