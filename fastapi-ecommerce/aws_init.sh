aws --endpoint-url=http://localhost:4566 s3 mb s3://meu-bucket

aws --endpoint-url=http://localhost:4566 s3api put-bucket-cors --bucket meu-bucket --cors-configuration '{
  "CORSRules": [
    {
      "AllowedHeaders": ["*"],
      "AllowedMethods": ["GET", "POST", "PUT", "DELETE", "HEAD"],
      "AllowedOrigins": ["*"],
      "ExposeHeaders": ["ETag"],
      "MaxAgeSeconds": 3000
    }
  ]
}'

aws lambda create-function \
  --function-name MyLambdaFunction \
  --runtime python3.9 \
  --zip-file fileb://function.zip \
  --handler app/lambda_function.lambda_handler \
  --role arn:aws:iam::000000000000:role/lambda-role \
  --timeout 60 \
  --endpoint-url=http://localhost:4566