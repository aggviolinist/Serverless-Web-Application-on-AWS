# Serverless-Web-App-on-AWS-
Creating a serverless web application on AWS 

## Tools
### Lambda
### DynamoDB
### IAM

## DynamoDB
- Create a dynamDB table with Partition key as coffeeID (String)
- Add some items to the table

## IAM
- Add a role `praco-barista-coffee` that
  - Sends lambda logs to cloudwatch
  - A custom inline policy with PutItem,DeleteItem,GetItem,Scan,UpdateItem
- Link this IAM to Lambda

## Lambda
Create a lambda file (nodejs)
- On the index.mjs
  - Add the table name and the partition key
- Initialize the folder for node js
```sh
npm init
``` 
- Install all the client packages needed for nodejs to work with dynamoDB
```sh
npm i @aws-sdk/client-dynamodb
```
- Zip the file so that it is ready for upload to lambda
```sh
zip -r get.zip ./*
```
## The output 
Once we run the lambda this is the output
> ![Alt text](images/lambda.png?raw=true "The lambda queries dynamodb data")
