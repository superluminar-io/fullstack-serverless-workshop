# What’s next?

In the labs, we created a RESTful HTTP API, persisted our data in a DynamoDB table and even deployed a frontend app. That's cool, but we are hungry for more...
This section is just an inspiration of things you could do.

First this workshop is based on [another workshop](https://workshop.superluminar.io/#/) where you get further insights on testing and do a mini game day.

If you want to expand your backend skills further, you could try to implement the following features:

- API Gateway
  - Implement a route to get a note by id
  - Implement a route to delete a note by id
  - Implement a route to update a note by id
  - Implement pagination for the list of notes
  - Input validation: Right now we support every content for notes. We could limit the notes, check for inappropriate content or whatever you come up with. Bonus: Write unit tests for valid and invalid cases.
- DynamoDB
  - Implement [TTL](https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/TTL.html) so the notes get deleted at some point (see also [AWS CDK documentation](https://docs.aws.amazon.com/cdk/api/v2/docs/aws-cdk-lib.aws_dynamodb.Table.html#timetoliveattribute))
  - [EventBridge](https://docs.aws.amazon.com/cdk/api/v2/docs/aws-cdk-lib.aws_events_targets-readme.html#invoke-a-lambda-function): Create a [Cron Job](https://docs.aws.amazon.com/cdk/api/v2/docs/aws-cdk-lib.aws_events-readme.html#scheduling), that invokes an AWS Lambda function to do something (e.g. store a note, manipulate data or whatever you come up with)
- Monitoring, Logging & Tracing
  - Create a [CloudWatch Alarm for the REST API](https://docs.aws.amazon.com/cdk/api/v2/docs/aws-apigatewayv2-alpha-readme.html#metrics)
  - Enable [X-Ray for the AWS lambda functions](https://docs.aws.amazon.com/cdk/api/v2/docs/aws-cdk-lib.aws_lambda-readme.html#lambda-with-x-ray-tracing) and get familiar with tracing
  - Create a [metric based on an AWS Lambda log output](https://docs.aws.amazon.com/cdk/api/v2/docs/aws-cdk-lib.aws_logs-readme.html#metric-filters)
- Continuous Delivery (Advanced)
  - Create a deployment pipeline with [CDK Pipelines](https://docs.aws.amazon.com/cdk/api/latest/docs/pipelines-readme.html)
- Security (Advanced)
  - Implement [authentication/authorization for the API with Cognito](https://docs.aws.amazon.com/cdk/api/v2/docs/aws-apigatewayv2-authorizers-alpha-readme.html)
  - Enable [AWS WAF for the CloudFront distribution](https://docs.aws.amazon.com/waf/latest/developerguide/waf-chapter.html) to block IP addresses
