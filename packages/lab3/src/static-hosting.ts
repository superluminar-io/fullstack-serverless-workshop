import { execSync } from "child_process";
import * as path from "path";
import { CfnOutput, DockerImage, RemovalPolicy } from "aws-cdk-lib";
import * as cloudfront from "aws-cdk-lib/aws-cloudfront";
import * as origins from "aws-cdk-lib/aws-cloudfront-origins";
import * as s3 from "aws-cdk-lib/aws-s3";
import * as s3deploy from "aws-cdk-lib/aws-s3-deployment";
import { Construct } from "constructs";
import * as fs from "fs-extra";

export class StaticHosting extends Construct {
  constructor(scope: Construct, id: string) {
    super(scope, id);

    const bucket = new s3.Bucket(this, "frontend", {
      removalPolicy: RemovalPolicy.DESTROY,
      autoDeleteObjects: true,
    });

    const distribution = new cloudfront.Distribution(
      this,
      "frontend-distribution",
      {
        defaultBehavior: { origin: new origins.S3Origin(bucket) },
        defaultRootObject: "index.html",
      }
    );

    new s3deploy.BucketDeployment(this, "frontend-deployment", {
      sources: [
        s3deploy.Source.asset(path.join(__dirname, "../frontend"), {
          bundling: {
            local: {
              tryBundle(outputDir) {
                try {
                  execSync("npm --version");
                } catch {
                  return false;
                }

                execSync(`
                    npm --prefix ./frontend i &&
                    npm --prefix ./frontend run build
                  `);

                fs.copySync(
                  path.join(__dirname, "../frontend", "build"),
                  outputDir
                );

                return true;
              },
            },
            image: DockerImage.fromRegistry("node:lts"),
            command: [],
          },
        }),
      ],
      destinationBucket: bucket,
      distribution,
      distributionPaths: ["/*"],
    });

    new CfnOutput(this, "FrontendURL", {
      value: `https://${distribution.distributionDomainName}`,
    });
  }
}
