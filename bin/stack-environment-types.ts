import cdk = require('@aws-cdk/core');

export interface ITopicMt {
  name: string,
  tagKey: string,
  tagValue: string,
}

export interface IQueueMt {
  dlqName: string,
  dlqTagKey: string,
  dlqTagValue: string,
  queueName: string,
  queueTagKey: string,
  queueTagValue: string,
}

export interface IMtSnsAndSqsTopicsStackProps extends cdk.StackProps {
  // Add your configuration types here.
  snsTopics: ITopicMt[],
  sqsQueue: IQueueMt[],
}
