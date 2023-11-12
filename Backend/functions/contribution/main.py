import boto3
import json
from decimal import Decimal
from boto3.dynamodb.conditions import Key
from datetime import date, datetime, timedelta

dynamodb_resource = boto3.resource('dynamodb')
location_table = dynamodb_resource.Table('CLEAN_TO_GREEN_LOCATION_INFO')
event_table = dynamodb_resource.Table('CLEAN_TO_GREEN_EVENT_INFO')


def lambda_handler(event, context):
    Location_code = event['Location_code']
    Garbage_val = event['Garbage_val']

    res = location_table.query(KeyConditionExpression=Key('Location_code').eq(Location_code))

    try:# update the inputnum by one and increase the grbage sum by the amount inputed
        tempItem = res["Items"][0]
        tempItem["Input_num"] = str(int(tempItem["Input_num"]) + 1)
        tempItem["Garbage_sum"] = Decimal(str(tempItem["Garbage_sum"])) + Decimal(str(Garbage_val))
        
        if tempItem["Input_num"] == 0:
            garbage_val=0
        else:
            garbage_val = (float(tempItem["Garbage_sum"]) / float(tempItem["Input_num"]))/10
        # if the grabage val is greater then 85%, start an event
        if(int(tempItem["Input_num"]) >= 20 and garbage_val > 0.85):
            d = datetime.now()
            increment = d.weekday()
            d += timedelta(days=(6-increment))
            d += timedelta(days=21)
            temp = {
                "Location": Location_code,
                "Garbage_amt": Decimal(str(garbage_val)),
                "Date": d.strftime("%m/%d/%Y")
            }
            print(temp)
            event_table.put_item(Item = temp)

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