import { docClient, DeleteCommand, createResponse } from '/opt/nodejs/utils.mjs'; // Import from Layer

const tableName = process.env.tableName || "praco";

export const deleteCoffee = async (event) => {
    const { pathParameters } = event;
    const coffeeID = pathParameters?.id;
    if (!coffeeID)
        return createResponse(400, { error: "Missing coffeeID" });

    try {
        const command = new DeleteCommand({
            TableName: tableName,
            Key: {
                coffeeID,
            },
            ReturnValues: "ALL_OLD", // returns deleted value as response
            ConditionExpression: "attribute_exists(coffeeID)", // ensures the item exists before deleting
        });

        const response = await docClient.send(command);
        return createResponse(200, { message: "Item Deleted Successfully!", response });
    }
    catch (err) {
        if (err.message === "The conditional request failed")
            return createResponse(404, { error: "Item does not exist!" });
        return createResponse(500, {
            error: "Internal Server Error!",
            message: err.message,
        });
    }
}