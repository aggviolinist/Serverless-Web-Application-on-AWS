import { DynamoDBDocumentClient, PutCommand } from "@aws-sdk/lib-dynamodb";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";

const client = new DynamoDBClient({});
const docClient = DynamoDBDocumentClient.from(client);

const tableName = process.env.tableName || "praco";

const createResponse = (statusCode, body) => {
    const responseBody = JSON.stringify(body);
    return {
        statusCode,
        headers: { "Content-Type": "application/json" },
        body: responseBody,
    };
};

export const createCoffee = async (event) => {
    const { body } = event;
    const { coffeeId, name, price, available } = JSON.parse(body || "{}");

    console.log("values", coffeeId, name, price, available);


    if (!coffeeId || !name || !price || available === undefined) {
        return createResponse(409, { error: "Missing required attributes for the item: coffeeId, name, price, or available." });
    }

    const command = new PutCommand({
        TableName: tableName,
        Item: {
            coffeeId,
            name,
            price,
            available
        },
        ConditionExpression: "attribute_does_not_exist(coffeeId)",
    });

    try {
        const response = await docClient.send(command);
        return createResponse(201, { message: "Item Created Successfully!", response });
    }
    catch (err) {
        if (err.message === "The conditional request failed")
            return createResponse(409, { error: "Item already exists!" });
        elsew
            return createResponse(500, {
                error: "Internal Server Error!",
                message: err.message,
            });
    }

}