import { docClient,GetCommand,ScanCommand,createResponse } from '/opt/nodejs/utils.mjs'; // Import from Layer

const tableName = process.env.tableName || "praco";

export const getCoffee = async (event) => {
    const { pathParameters } = event;
    const { id } = pathParameters || {};

    try {
        let command;
        if (id) {
            command = new GetCommand({
                TableName: tableName,
                Key: {
                    "coffeeID": id,
                },
            });
        }
        else {
            command = new ScanCommand({
                TableName: tableName,
            });
        }
        const response = await docClient.send(command);
        return createResponse(200, response);
    }
    catch (err) {
        console.error("Error fetching data from DynamoDB:", err);
        return createResponse(500, { error: err.message });
    }

}

// export const coffeeID = async (event) => {
//   const command = new GetCommand({
//     TableName: "praco",
//     Key: {
//       coffeeID: "c1-TEMS",
//     },
//   });

//   const response = await docClient.send(command);
//   console.log(response);
//   return response;
// };

