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
    User_name = parts['User_name']
    Location = ','.join(parts['Location'])
    User_phone = parts["User_phone"]

    # Look for email in DB
    response = table.query(KeyConditionExpression=Key('User_email').eq(User_email))

    # email is found in the database (Hypothetically)
    if response['Count'] != 0:
        return {
            "statusCode": 200,
            "body": json.dumps({"message": "0"})
        }

    # email is not found in the database
    else:
        # Try to put info from frontend into db, on except send error
        try:
            table.put_item(Item=
                            {
                                "User_email": User_email,
                                "User_pass": User_pass,
                                "User_name": User_name,
                                "Location": Location,
                                "User_phone": User_phone
                            })

            # Return info user just submitted
            return {
                "statusCode": 200,
                "body": json.dumps({"message": "1"})
            }
        except Exception as exception:
            return {
                "statusCode": 500,
                "body": json.dumps({"message": str(exception)})
            }