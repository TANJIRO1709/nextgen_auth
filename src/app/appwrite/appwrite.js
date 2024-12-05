import { Client, Account, ID } from 'appwrite';

const projectId = process.env.PROJECT_ID;

if (!projectId) {
  throw new Error('PROJECT_ID environment variable is not defined');
}

export const client = new Client();

client
    .setEndpoint('https://cloud.appwrite.io/v1')
    .setProject(projectId);

export const account = new Account(client);
export { ID };
