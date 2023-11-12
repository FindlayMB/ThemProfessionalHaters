import boto3
import json
from decimal import Decimal

dynamodb_resource = boto3.resource('dynamodb', region_name="ca-central-1")
table = dynamodb_resource.Table('CLEAN_TO_GREEN_EVENT_INFO')

def lambda_handler(event, context):
    try:
        # Perform the scan
        res = table.scan(
            ProjectionExpression="#loc, Garbage_amt, #dt",
            ExpressionAttributeNames={
                "#loc": "Location",
                "#dt": "Date"
            }
        )['Items']

        # Convert Decimal to float for JSON serialization
        for item in res:
            item['Garbage_amt'] = float(item['Garbage_amt'])

        print(res)

        response = {
            "statusCode": 200,
            "body": json.dumps({
                'message': "Success",
                'data': res
            })
        }
        return response

    except Exception as e:
        response = {
            "statusCode": 404,
            "body": json.dumps(
                {
                    'message': str(e)
                }
            )
        }
        return response