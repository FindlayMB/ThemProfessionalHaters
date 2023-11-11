import boto3
import json
from urllib import parse, request

dynamodb_resource = boto3.resource('dynamodb')
table = dynamodb_resource.Table('Scheduling-Simple')


def lambda_handler(event, context):

    body = json.loads(event['body'])
    print(body);
    try:
        table.put_item(
            Item=body
        )
        return {
            'statusCode': 201,
            'body': "success"
        }

    except Exception as e:
        return {
            'statusCode': 500,
            'body': json.dumps({
                "message": str(e)
            })
        }
