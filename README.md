# Serverless-Web-App-on-AWS-
Creating a serverless web application on AWS 

## Tools
### Lambda (nodejs)
### DynamoDB
### IAM
### API Gateway
### Postman
### React (front end)
### Cognito

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
----------------------------------------------------------------------------------------------------
----------------------------------------------------------------------------------------------------

### 5. Using layers using lambda
----------------------------------------------------------------------------------------------------
----------------------------------------------------------------------------------------------------

- Create the CRUD operations while removing the redundant code
- Add the redundant nodejs code to util.mjs
- Automate a zip operation using `bash`
- Test using `Postman`
----------------------------------------------------------------------------------------------------

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

## 6. Postman
1. Test the HTTP `GET` method using Postman. 
> ![Alt text](images/get_pic.png?raw=true "Postman gets data to our dynamoDB database")
2. Test the HTTP `POST` method using Postman. 
> ![Alt text](images/post_pic.png?raw=true "Postman updates data to our dynamoDB database")
3. Test the HTTP `UPDATE` method using Postman. 
> ![Alt text](images/update.png?raw=true "Postman updates our table on the dynamoDB database")
4. Test the HTTP `DELETE` method using Postman. 
> ![Alt text](images/delete_pic.png?raw=true "Postman deletes some content from our table in the dynamoDB database")

### React (front end)
Create a react app and select the javascript variant
```sh
npm create vite@latest .
npm install
npm install react-router-dom
npm run dev
```
On the `.env` file add:
 - the API gateway url
 - The gitpod server url

Update the CORS on API gateway to be able to route traffic 
 -  What allows your frontend (usually running in a browser) to communicate with your backend API even when they're hosted on different domains.
 -  Add;
   - Access-Control-Allow-Origin
   -  Access-Control-Allow-Headers
   -  Access-Control-Allow-Methods

> ![Alt text](images/coffee1.png?raw=true "Output on website")
> ![Alt text](images/coffee2.png?raw=true "Output on website")
> ![Alt text](images/coffee3.png?raw=true "Output on website")

## 7. Adding cognito to only allow authenticated users
### Cognito
- Create a single page User pool
- Add email as the athentication method and return URL (http://gitpod-id)
### API Gateway
- Create authorizer
- On API Gateway, add the Issuer URL as the ` Token signing key URL` and Audience as `Client ID` from cognito
- Add Authorizers for coffeeShop and authorize to each method `GET`,`POST`,`DELETE`,`UPDATE`
- Add `authorization` for Access-Control-Allow-Headers to be able to access the headers on our browser.
### On gitpod
- Install the oidc-client-ts  and react-oidc-context  libraries.
- Configure react-oidc-context with the OIDC properties of your user pool.
- On the Home.jsx add `http://gitpod-io` sign-in & sign-out url that initiates an authorization request with your user pool OIDC provider and initiate a logout request respectively.

> ![Alt text](images/cog1.png?raw=true "Output on website after the update")
> ![Alt text](images/cog2.png?raw=true "Output on website after the update")
> ![Alt text](images/cog3.png?raw=true "Output on website after the update")
> ![Alt text](images/cog4.png?raw=true "Output on website after the update")







