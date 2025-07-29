import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, GetCommand, ScanCommand } from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({});
const docClient = DynamoDBDocumentClient.from(client);

export const coffeeID = async (event) => {
  const command = new GetCommand({
    TableName: "praco",
    Key: {
      coffeeID: "c1-TEMS",
    },
  });

  const response = await docClient.send(command);
  console.log(response);
  return response;
};

