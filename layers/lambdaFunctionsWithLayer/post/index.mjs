import { docClient,PutCommand,createResponse } from '/opt/nodejs/utils.mjs'; // Import from Layer

const tableName = process.env.tableName || "praco";

export const createCoffee = async (event) => {
    const { body } = event;
    const { coffeeID, name, Price, availability } = JSON.parse(body || "{}");

    console.log("values", coffeeID, name, Price, availability);


    if (!coffeeID || !name || !Price || availability === undefined) {
        return createResponse(409, { error: "Missing required attributes for the item: coffeeID, name, Price, or availability." });
    }

    const command = new PutCommand({
        TableName: tableName,
        Item: {
            coffeeID,
            name,
            Price,
            availability
        },
        ConditionExpression: "attribute_not_exists(coffeeID)",
    });

    try {
        const response = await docClient.send(command);
        return createResponse(201, { message: "Item Created Successfully!", response });
    }
    catch (err) {
        if (err.message === "The conditional request failed")
            return createResponse(409, { error: "Item already exists!" });
        else
            return createResponse(500, {
                error: "Internal Server Error!",
                message: err.message,
            });
    }

}