import boto3
import json
from boto3.dynamodb.conditions import Key

dynamodb_resource = boto3.resource("dynamodb")
table = dynamodb_resource.Table('CLEAN_TO_GREEN_USER_LOGIN_INFO')

def lambda_handler(event, context):
    # Receive and decode data
    parts = event

    # Initialize variables with decoded data sent from frontend
    User_email = parts['User_email']
    User_pass = parts['User_pass']

    # Look for email and password in DB
    response = table.query(
    KeyConditionExpression=Key('User_email').eq(User_email) & Key('User_pass').eq(User_pass),
    ProjectionExpression='#n, #l, #p',  # Using placeholders for attribute names
    ExpressionAttributeNames={
        '#n': 'User_name',
        '#l': 'Location',
        '#p': 'User_phone'
    }
)

    # Check if the user is found in the database
    if response['Count'] != 0:
        # Assuming there is only one item matching the email and password
        user_data = response['Items'][0]  # Extracting the first (and only) result

        return {
            "statusCode": 200,
            "body": json.dumps({
                "User_name": user_data['User_name'],
                # "Location": user_data['Location'],
                # "User_phone": user_data['User_phone']
            })
        }

    # If user not found, return appropriate message
    else:
            "statusCode": 200,
            "body": json.dumps({
                "User_name": user_data['User_name'],
                # "Location": user_data['Location'],
                # "User_phone": user_data['User_phone']
            })
        }

    # If user not found, return appropriate message
    else:
        return {
            "statusCode": 200,
            "body": json.dumps({"message": "0"})
            "statusCode": 200,
            "body": json.dumps({"message": "0"})
        }