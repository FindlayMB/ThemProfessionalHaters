import boto3
import json
from decimal import Decimal
from boto3.dynamodb.conditions import Key

dynamodb_resource = boto3.resource('dynamodb')
location_table = dynamodb_resource.Table('CLEAN_TO_GREEN_LOCATION_INFO')
event_table = dynamodb_resource.Table('CLEAN_TO_GREEN_EVENT_INFO')


def lambda_handler(event, context):
    Location_code = event['Location_code']
    Garbage_val = event['Garbage_val']

    res = location_table.query(KeyConditionExpression=Key('Location_code').eq(Location_code))

    try:
        tempItem = res["Items"][0]
        tempItem["Input_num"] = int(tempItem["Input_num"]) + 1
        tempItem["Garbage_sum"] = Decimal(str(tempItem["Garbage_sum"])) + Decimal(str(Garbage_val))

        location_table.put_item(
            Item=tempItem
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