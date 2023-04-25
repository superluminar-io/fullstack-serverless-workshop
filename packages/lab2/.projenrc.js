const { awscdk, javascript } = require('projen');
const project = new awscdk.AwsCdkTypeScriptApp({
  cdkVersion: '2.35.0',
  defaultReleaseBranch: 'main',
  name: 'lab2',
  github: false,
  packageManager: javascript.NodePackageManager.NPM,
  deps: [
    '@aws-sdk/client-dynamodb',
    '@aws-sdk/lib-dynamodb',
    '@aws-cdk/aws-apigatewayv2-alpha',
    '@aws-cdk/aws-apigatewayv2-integrations-alpha',
    'fs-extra',
  ],
  devDeps: [
    '@types/aws-lambda',
    '@types/fs-extra',
  ],
});

// Windows users might need this
project.synth();
