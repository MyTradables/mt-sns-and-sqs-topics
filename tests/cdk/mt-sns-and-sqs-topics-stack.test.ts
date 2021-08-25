import { SynthUtils } from '@aws-cdk/assert';
import { App } from '@aws-cdk/core';
import environmentConfig from '../../bin/stack-config';
import MtSnsAndSqsTopicsStack from '../../lib/mt-sns-and-sqs-topics-stack';

const app = new App();

describe('Stack validation', () => {
  it('should have a correct stack configuration', () => {
    const stack = new MtSnsAndSqsTopicsStack(app, 'mt-sns-and-sqs-topics', environmentConfig);
    expect(SynthUtils.toCloudFormation(stack)).toMatchSnapshot();
  });
});