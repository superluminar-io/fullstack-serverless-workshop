import { awscdk, javascript } from "projen";
const project = new awscdk.AwsCdkTypeScriptApp({
  cdkVersion: "2.1.0",
  defaultReleaseBranch: "main",
  github: false,
  name: "notes-api",
  packageManager: javascript.NodePackageManager.NPM,
  projenrcTs: true,
  deps: [
    "@aws-sdk/client-dynamodb",
    "@aws-sdk/lib-dynamodb",
    "@aws-cdk/aws-apigatewayv2-alpha",
    "@aws-cdk/aws-apigatewayv2-integrations-alpha",
    "aws-sdk",
    "fs-extra",
  ],
  devDeps: ["@types/fs-extra", "@types/aws-lambda"],
});

project.synth();

