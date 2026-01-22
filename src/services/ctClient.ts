import { createApiBuilderFromCtpClient } from '@commercetools/platform-sdk';
import { ClientBuilder } from '@commercetools/sdk-client-v2';

export const createCtClient = () => {
  const ctpClient = new ClientBuilder()
    .withProjectKey(process.env.CT_PROJECT_KEY!)
    .withClientCredentialsFlow({
      host: process.env.CT_AUTH_URL!,
      projectKey: process.env.CT_PROJECT_KEY!,
      credentials: {
        clientId: process.env.CT_CLIENT_ID!,
        clientSecret: process.env.CT_CLIENT_SECRET!
      },
      scopes: [`manage_project:${process.env.CT_PROJECT_KEY}`]
    })
    .withHttpMiddleware({
      host: process.env.CT_API_URL!
    })
    .build();

  return createApiBuilderFromCtpClient(ctpClient)
    .withProjectKey({ projectKey: process.env.CT_PROJECT_KEY! });
};