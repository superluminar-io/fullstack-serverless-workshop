import { App, Stack, StackProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { StaticHosting } from "./static-hosting";

export class MyStack extends Stack {
  constructor(scope: Construct, id: string, props: StackProps = {}) {
    super(scope, id, props);

    new StaticHosting(this, "static-hosting");
  }
}

// for development, use account/region from cdk cli
const devEnv = {
  account: process.env.CDK_DEFAULT_ACCOUNT,
  region: process.env.CDK_DEFAULT_REGION,
};

const app = new App();

new MyStack(app, 'notes-api-dev-lab1', { env: devEnv });
// new MyStack(app, 'notes-api-prod', { env: prodEnv });

app.synth();
