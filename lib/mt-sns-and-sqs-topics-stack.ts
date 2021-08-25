import * as cdk from '@aws-cdk/core';
import { Key } from '@aws-cdk/aws-kms';
import { ITopic, Topic } from '@aws-cdk/aws-sns';
import { IQueue, Queue, DeadLetterQueue, QueueEncryption } from '@aws-cdk/aws-sqs';
import { Tags } from '@aws-cdk/core';
import { IMtSnsAndSqsTopicsStackProps } from '../bin/stack-environment-types';

class MtSnsAndSqsTopicsStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props: IMtSnsAndSqsTopicsStackProps) {
    super(scope, id, props);

    /**
     * Creates AWS KMS encryption key.
     */
    const encrytionKey = new Key(this, 'mt-kms-key', {
      description: 'MyTradables key used for encrypting',
      alias: 'alias/mt-kms-key',
      enableKeyRotation: true,
    });

    /**
     * Creates a sns topic with kms encryption for each entry in snsTopics array.
     */
    props.snsTopics.forEach(snsTopic => {
      // Creates AWS SNS topic.
      const topic: ITopic = new Topic(this, snsTopic.name, {
        topicName: snsTopic.name,
        masterKey: encrytionKey,
      });
      // Add tagging.
      Tags.of(topic).add(snsTopic.tagKey, snsTopic.tagValue);
    });

    /**
     * Creates a sqs topic with kms encryption for each entry in sqsTopics array.
     */
    props.sqsQueue.forEach(sqsQueue => {
      // Creates AQS SQS deadletterqueue.
      const dlQueue: DeadLetterQueue = {
        queue: new Queue(this, sqsQueue.dlqName, {
          queueName: sqsQueue.dlqName,
          encryption: QueueEncryption.KMS_MANAGED,
          encryptionMasterKey: encrytionKey,
        }),
        maxReceiveCount: 3,
      };
      // Add tagging.
      Tags.of(dlQueue.queue).add(sqsQueue.dlqTagKey, sqsQueue.dlqTagValue);

      // Creates AWS SQS queue.
      const queue: IQueue = new Queue(this, sqsQueue.queueName, {
        queueName: sqsQueue.queueName,
        encryption: QueueEncryption.KMS_MANAGED,
        encryptionMasterKey: encrytionKey,
        deadLetterQueue: dlQueue,
      });
      // Add tagging.
      Tags.of(queue).add(sqsQueue.queueTagKey, sqsQueue.queueTagValue);
    });
  }
}

export default MtSnsAndSqsTopicsStack;
