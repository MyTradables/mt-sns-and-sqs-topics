import { IQueueMt } from "../stack-environment-types";

export const proxyQueue: IQueueMt = {
  dlqName: 'proxyDlQueue',
  dlqTagKey: 'proxyTagkey',
  dlqTagValue: 'proxyTagValue',
  queueName: 'proxyQueue',
  queueTagKey: 'proxyTagkey',
  queueTagValue: 'proxyTagValue',
}