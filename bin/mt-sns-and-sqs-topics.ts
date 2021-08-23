#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';
import MtSnsAndSqsTopicsStack from '../lib/mt-sns-and-sqs-topics-stack';

// importing configuration based on environment
import environmentConfig from './stack-config';

const app = new cdk.App();

// injecting configurations into stack based on environment.
new MtSnsAndSqsTopicsStack(app, 'mt-sns-and-sqs-topics', environmentConfig);
