import { proxyQueue } from './queues/proxyQueue';
import { IMtSnsAndSqsTopicsStackProps } from './stack-environment-types';
import { proxyTopic } from './topics/proxyTopic';

const environmentConfig: IMtSnsAndSqsTopicsStackProps = {
  tags: {
    Developer: 'Faruk Ada',
    Application: 'MyTradables.com',
  },
  snsTopics: [
    proxyTopic,
  ],
  sqsQueue: [
    proxyQueue,
  ],
};
export default environmentConfig;
