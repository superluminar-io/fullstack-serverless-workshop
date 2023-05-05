import { awscdk, javascript } from "projen";
const project = new awscdk.AwsCdkTypeScriptApp({
  cdkVersion: "2.1.0",
  defaultReleaseBranch: "main",
  github: false,
  name: "notes-api",
  packageManager: javascript.NodePackageManager.NPM,
  projenrcTs: true,
  deps: ["aws-sdk", "fs-extra"],
  devDeps: ["@types/fs-extra"],
});

project.synth();