import { docClient,UpdateCommand,createResponse } from '/opt/nodejs/utils.mjs'; // Import from Layer

const tableName = process.env.tableName || "praco";

export const updateCoffee = async (event) => {
    const { pathParameters, body } = event;

    const coffeeID = pathParameters?.id;
    if (!coffeeID)
        return createResponse(400, { error: "Missing coffeeID" });

    const { name, Price, availability } = JSON.parse(body || "{}");
    if (!name && !Price && availability === undefined)
        return createResponse(400, { error: "Nothing to update!" })

    let updateExpression = `SET  ${name ? "#name = :name, " : ""}${Price ? "Price = :Price, " : ""}${availability ? "availability = :availability, " : ""}`.slice(0, -2);

    try {
        const command = new UpdateCommand({
            TableName: tableName,
            Key: {
                coffeeID,
            },
            UpdateExpression: updateExpression,
            ...(name && {
                ExpressionAttributeNames: {
                    "#name": "name", // name is a reserved keyword in DynamoDB
                },
            }),
            ExpressionAttributeValues: {
                ...(name && { ":name": name }),
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