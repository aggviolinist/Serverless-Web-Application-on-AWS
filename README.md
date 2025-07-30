# Serverless-Web-App-on-AWS-
Creating a serverless web application on AWS 

## Tools
### Lambda
### DynamoDB
### IAM
### API Gateway
### Postman

## DynamoDB
 - Create a dynamDB table with Partition key as coffeeID (String)
 - Add some items to the table

## IAM
 - Add a role `praco-barista-coffee` that:
    - Sends lambda logs to cloudwatch
    - A custom inline policy with PutItem,DeleteItem,GetItem,Scan,UpdateItem
 - Link this IAM to Lambda

## Lambda
1. `Create a GET lambda file (nodejs)`
 - On the index.mjs
    - Add the table name and the partition key(primary id)
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
### The Lambda output 
Once we test the lambda this is the output
> ![Alt text](images/lambda.png?raw=true "The lambda queries dynamodb data")

2. `Create a POST lambda file (nodejs)`
 - On the index.mjs
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
zip -r post.zip ./*
```
3. `Create an update lambda file (nodejs)`
 - On the index.mjs
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
zip -r update.zip ./*
```
4. `Create a delete lambda file (nodejs)`
 - On the index.mjs
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
zip -r delete.zip ./*
```

## API Gateway
1. `Create our HTTP API gateway`
 - Create our Route and method `GET`
 - Under integrations, add the lambda function to connect to HTTP
> ![Alt text](images/api-gateway.png?raw=true "The lambda queries on our browser")

2. On the created HTTP API gateway:
 - Add a `POST` method and integrate the lambda function to HTTP

3. On the created HTTP API gateway:
 - Add an `UPDATE` method and integrate the lambda function to HTTP

4. On the created HTTP API gateway:
 - Add an `DELETE` method and integrate the lambda function to HTTP

## Postman
1. Test the HTTP `GET` method using Postman. 
> ![Alt text](images/get_pic.png?raw=true "Postman gets data to our dynamoDB database")
2. Test the HTTP `POST` method using Postman. 
> ![Alt text](images/post_pic.png?raw=true "Postman updates data to our dynamoDB database")
3. Test the HTTP `UPDATE` method using Postman. 
> ![Alt text](images/update.png?raw=true "Postman updates our table on the dynamoDB database")
4. Test the HTTP `DELETE` method using Postman. 
> ![Alt text](images/delete.png?raw=true "Postman deletes some content from our table in the dynamoDB database")

