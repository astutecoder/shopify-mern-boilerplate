import { IUserReqBody } from '../interfaces/user.interface';
import { HOST } from '../utils/constants/global';
import { fetchGql } from './fetch-gql';

export const registerWebhook = async (
  user: IUserReqBody,
  topic: string,
  endpoint: string
) => {
  const query = `mutation webhookSubscriptionCreate($topic: WebhookSubscriptionTopic!, $webhookSubscription: WebhookSubscriptionInput!) {
      webhookSubscriptionCreate(topic: $topic, webhookSubscription: $webhookSubscription) {
        userErrors {
          field
          message
        }
        webhookSubscription {
          id
          topic
        }
      }
    }`;

  const variables = {
    topic,
    webhookSubscription: {
      callbackUrl: `${HOST}/webhooks/${endpoint.replace(/^\//, '')}`,
      format: 'JSON',
    },
  };

  try {
    fetchGql(user, query, variables);
  } catch (error) {
    throw new Error(error.message);
  }
};
