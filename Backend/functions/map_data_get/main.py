import boto3
import json
from boto3.dynamodb.conditions import Key, Attr

dynamodb_resource = boto3.resource('dynamodb', region_name="ca-central-1")
table = dynamodb_resource.Table('CLEAN_TO_GREEN_LOCATION_INFO')

def lambda_handler(event, context):
    try:
        res = table.scan(ProjectionExpression="#loc, Garbage_sum, Input_num", ExpressionAttributeNames={"#loc": "Location"})['Items']

        transformed_data = []

        for item in res:
            # Convert values to numbers
            garbage_sum = float(item['Garbage_sum'])
            input_num = float(item['Input_num'])

            # Calculate Garbage_val
            if input_num == 0:
                garbage_val=0
            else:
                garbage_val = (garbage_sum / input_num)/10

            # Create a new dictionary with the desired structure
            transformed_item = {
                'Location': item['Location'],
                'Garbage_val': garbage_val
            }

            # Append the transformed item to the list
            transformed_data.append(transformed_item)
        print(transformed_data)

        response = {
            "statusCode": 200,
            "body": json.dumps({
                'message': "Success",
                'data': transformed_data
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