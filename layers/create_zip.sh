echo "Create zip for layer"
zip -r layer.zip nodejs

echo "Create zip for GET function"
cd lambdaFunctionsWithLayer/get
zip -r get.zip index.mjs
mv get.zip ../../
cd ../../

echo "Create zip for POST function"
cd lambdaFunctionsWithLayer/post
zip -r post.zip index.mjs
mv post.zip ../../
cd ../../

echo "Create zip for DELETE function"
cd lambdaFunctionsWithLayer/delete
zip -r delete.zip index.mjs
mv delete.zip ../../
cd ../../

echo "Create zip for UPDATE function"
cd lambdaFunctionsWithLayer/update
zip -r update.zip index.mjs
mv update.zip ../../
cd ../../

echo "Success!!!"