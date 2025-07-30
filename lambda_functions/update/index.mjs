import { DynamoDBDocumentClient, UpdateCommand } from "@aws-sdk/lib-dynamodb";
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

export const updateCoffee = async (event) => {
    const { pathParameters, body } = event;

    const coffeeID = pathParameters?.id;
    if (!coffeeID)
        return createResponse(400, { error: "Missing coffeeID" });

    const { Name, Price, availability } = JSON.parse(body || "{}");
    if (!Name && !Price && availability === undefined)
        return createResponse(400, { error: "Nothing to update!" })

    let updateExpression = `SET  ${Name ? "#Name = :Name, " : ""}${Price ? "Price = :Price, " : ""}${availability ? "availability = :availability, " : ""}`.slice(0, -2);

    try {

        const command = new UpdateCommand({
            TableName: tableName,
            Key: {
                coffeeID,
            },
            UpdateExpression: updateExpression,
            ...(Name && {
                ExpressionAttributeNames: {
                    "#Name": "Name", // name is a reserved keyword in DynamoDB
                },
            }),
            ExpressionAttributeValues: {
                ...(Name && { ":Name": Name }),
                ...(Price && { ":Price": Price }),
                ...(availability && { ":availability": availability }),
            },
            ReturnValues: "ALL_NEW", // returns updated value as response
            ConditionExpression: "attribute_exists(coffeeID)", // ensures the item exists before updating
        });

        const response = await docClient.send(command);
        console.log(response);
        return response;

    }
    catch (err) {
        if (err.message === "The conditional request failed")
            return createResponse(404, { error: "Item does not exists!" });
        return createResponse(500, {
            error: "Internal Server Error!",
            message: err.message,
        });
    }
}