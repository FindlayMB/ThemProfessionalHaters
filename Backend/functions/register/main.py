import requests
import boto3
import json
import os
import hashlib
import time
from requests_toolbelt.multipart import decoder
import base64

dynamodb = boto3.resource("dynamodb")
table = dynamodb_resource.Table('CLEAN_TO_GREEN_USER_LOGIN_INFO')


def lambda_handler(event, context):

    #Recieve and decode data
    body = event['body']
    if event["isBase64Encoded"]:
        body = base64.b64decode(body)
        
    decoded = decoder.MultipartDecoder(body, event['headers']['content-type'])
    parts = decoded.parts

    #Initialize variables with decoded data sent from frontend
    User_email = parts[0].text
    User_pass = parts[1].text
    User_name = parts[2].text
    Location = json.loads(parts[3].text)
    # sector = event['body']['sector']
    User_phone = parts[4].text
    
    #Turn sector list from a list into a string of values seperated by comma
    #   ex: "AFB, ASF, GHW, SFF, HSD,"
    Location_string = ""
    
    for i in sector:
        Location_string += i
        Location_string += ','
        
    #Look for email in DB
    response = table.query(KeyConditionExpression=Key('User_email').eq(email))
    
    #email is found in the database (Hypothetically)
    if response['Count'] != 0::
        return{
                "statusCode":200,
                "body":json.dumps({"message":"0"})       
            }
        
    #email is not found in the database 
    else:
        #Try to put info from frontend into db, on except send error
        try:
            table.put_item(Item=
                           {
                            "User_email": User_email,
                            "User_pass" : User_pass,
                            "User_name": User_name,
                            "Location" : Location_string,
                            "User_phone" : User_phone
                            })

            #Return info user just submitted
            return{
                "statusCode":200,
                "body":json.dumps({"message":"1"}) 
            }
        except Exception as exception:
            return{
                "statusCode":500,
                "body":json.dumps({"message":str(exception)})       
            }
        


# "body":json.dumps(
    # {
    # "email": email, 
    #  "password": password, 
    #  "username": username, 
    #  "sector": sector_string, 
    #  "phone": phone_num, 
    # })     