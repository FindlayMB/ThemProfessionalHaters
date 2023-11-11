terraform {
  required_providers {
    aws = {
      version = ">= 4.0.0"
      source  = "hashicorp/aws"
    }
  }
}

provider "aws" {
  region = "ca-central-1"
}

# the locals block is used to declare constants that 
# you can use throughout your code
locals {
  function_name_contribution = "contribution"
  function_name_donate = "donate"
  function_name_event_get = "event_get"
  function_name_login = "login"
  function_name_map_data_get = "map_data_get"
  function_name_register = "register"
  handler_name  = "main.lambda_handler"
  artifact_name_contribution = "contribution_artifact.zip"
  artifact_name_donate = "donate_artifact.zip"
  artifact_name_event_get = "event_get_artifact.zip"
  artifact_name_login = "login_artifact.zip"
  artifact_name_map_data_get = "map_data_get_artifact.zip"
  artifact_name_register = "register_artifact.zip"
}

# # create archive file from main.py
# data "archive_file" "lambda-SS_get_dates" {
#   type = "zip"
#   # this file (main.py) needs to exist in the same folder as this 
#   # Terraform configuration file
#   source_dir = "../functions/SS_get_dates"
#   output_path = local.artifact_name_get
# }

# # create a Lambda function
# # see the docs: https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/lambda_function
# resource "aws_lambda_function" "SS_get_dates" {
#   # s3_bucket        = aws_s3_bucket.lambda.bucket
#   # s3_key           = local.artifact_name_get
#   role             = aws_iam_role.lambda-SS_get_dates.arn
#   function_name    = local.function_name_SS_get_dates
#   handler          = local.handler_name
#   filename         = local.artifact_name_get
#   source_code_hash = data.archive_file.lambda-SS_get_dates.output_base64sha256

#   # see all available runtimes here: https://docs.aws.amazon.com/lambda/latest/dg/API_CreateFunction.html#SSS-CreateFunction-request-Runtime
#   runtime = "python3.9"
# }

# # create a Function URL for Lambda 
# # see the docs: https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/lambda_function_url
# resource "aws_lambda_function_url" "url_SS_get_dates" {
#   function_name      = aws_lambda_function.SS_get_dates.function_name
#   authorization_type = "NONE"

#   cors {
#     allow_credentials = true
#     allow_origins     = ["*"]
#     allow_methods     = ["GET"]
#     allow_headers     = ["*"]
#     expose_headers    = ["keep-alive", "date"]
#   }
# }

# resource "aws_lambda_function_url" "url_SS_add_dates" {
#   function_name      = aws_lambda_function.SS_add_dates.function_name
#   authorization_type = "NONE"

#   cors {
#     allow_credentials = true
#     allow_origins     = ["*"]
#     allow_methods     = ["POST"]
#     allow_headers     = ["*"]
#     expose_headers    = ["keep-alive", "date"]
#   }
# }

# resource "aws_lambda_function_url" "url_SS_add_schedule" {
#   function_name      = aws_lambda_function.SS_add_schedule.function_name
#   authorization_type = "NONE"

#   cors {
#     allow_credentials = true
#     allow_origins     = ["*"]
#     allow_methods     = ["POST"]
#     allow_headers     = ["*"]
#     expose_headers    = ["keep-alive", "date"]
#   }
# }

# resource "aws_lambda_function_url" "url_SS_get_schedule" {
#   function_name      = aws_lambda_function.SS_get_schedule.function_name
#   authorization_type = "NONE"

#   cors {
#     allow_credentials = true
#     allow_origins     = ["*"]
#     allow_methods     = ["GET"]
#     allow_headers     = ["*"]
#     expose_headers    = ["keep-alive", "date"]
#   }
# }

# # show the Function URL after creation
# output "lambda_url-SS_get_dates" {
#   value = aws_lambda_function_url.url_SS_get_dates.function_url
# }

# # roles and policies as needed

# # create a role for the Lambda function to assume
# # every service on AWS that wants to call other AWS services should first assume a role and
# # then any policy attached to the role will give permissions
# # to the service so it can interact with other AWS services
# resource "aws_iam_role" "lambda-SS_get_dates" {
#   name               = "iam-for-lambda-${local.function_name_SS_get_dates}"
#   assume_role_policy = <<EOF
# {
#   "Version": "2012-10-17",
#   "Statement": [
#     {
#       "Action": "sts:AssumeRole",
#       "Principal": {
#         "Service": "lambda.amazonaws.com"
#       },
#       "Effect": "Allow",
#       "Sid": ""
#     }
#   ]
# }
# EOF
# }

# # create a policy for publishing logs to CloudWatch
# # see the docs: https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/iam_policy
# resource "aws_iam_policy" "logs-SS_get_dates" {
#   name        = "lambda-logging-${local.function_name_SS_get_dates}"
#   description = "IAM policy for logging from a lambda"

#   policy = <<EOF
# {
#   "Version": "2012-10-17",
#   "Statement": [
#     {
#       "Action": [
#         "logs:CreateLogGroup",
#         "logs:CreateLogStream",
#         "logs:PutLogEvents",
#         "dynamodb:GetItem",
#         "dynamodb:Query",
#         "dynamodb:Scan",
#         "ssm:GetParameter",
#         "ssm:GetParameters",
#         "ssm:GetParametersByPath",
#         "polly:SynthesizeSpeech"
#       ],
#       "Resource": "*",
#       "Effect": "Allow"
#     }
#   ]
# }
# EOF
# }

# # attach the above policy to the function role
# # see the docs: https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/iam_role_policy_attachment
# resource "aws_iam_role_policy_attachment" "lambda_logs_SS_get_dates" {
#   role       = aws_iam_role.lambda-SS_get_dates.name
#   policy_arn = aws_iam_policy.logs-SS_get_dates.arn
# }

# Dynamodb table for storing login info
# read the docs: https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/dynamodb_table
resource "aws_dynamodb_table" "CLEAN_TO_GREEN_USER_LOGIN_INFO" {
  name         = "CLEAN_TO_GREEN_USER_LOGIN_INFO"
  billing_mode = "PROVISIONED"

  # up to 8KB read per second (eventually consistent)
  read_capacity = 1

  # up to 1KB per second
  write_capacity = 1

  # we only need a student id to find an item in the table; therefore, we 
  # don't need a sort key here
  hash_key  = "User_email"
  range_key  = "User_pass"

  # the hash_key data type is string

  # attribute {
  #   name = "User_name"
  #   type = "S"
  # }

  attribute {
    name = "User_pass"
    type = "S"
  }

  attribute {
    name = "User_email"
    type = "S"
  }

  # attribute {
  #   name = "User_phone"
  #   type = "S"
  # }
}

# Dynamodb table for storing donors info
# read the docs: https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/dynamodb_table
resource "aws_dynamodb_table" "CLEAN_TO_GREEN_DONOR_INFO" {
  name         = "CLEAN_TO_GREEN_DONOR_INFO"
  billing_mode = "PROVISIONED"

  # up to 8KB read per second (eventually consistent)
  read_capacity = 1

  # up to 1KB per second
  write_capacity = 1

  # we only need a student id to find an item in the table; therefore, we 
  # don't need a sort key here
  hash_key  = "Donor_name"

  # the hash_key data type is string

  attribute {
    name = "Donor_name"
    type = "S"
  }

  # attribute {
  #   name = "Donated_amt"
  #   type = "N"
  # }
}

# Dynamodb table for storing location info
# read the docs: https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/dynamodb_table
resource "aws_dynamodb_table" "CLEAN_TO_GREEN_LOCATION_INFO" {
  name         = "CLEAN_TO_GREEN_LOCATION_INFO"
  billing_mode = "PROVISIONED"

  # up to 8KB read per second (eventually consistent)
  read_capacity = 1

  # up to 1KB per second
  write_capacity = 1

  # we only need a student id to find an item in the table; therefore, we 
  # don't need a sort key here
  hash_key  = "Location"

  # the hash_key data type is string

  attribute {
    name = "Location"
    type = "S"
  }

  # attribute {
  #   name = "Garbage_amt"
  #   type = "N"
  # }

  # attribute {
  #   name = "Input_num"
  #   type = "N"
  # }
}

# Dynamodb table for storing event info
# read the docs: https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/dynamodb_table
resource "aws_dynamodb_table" "CLEAN_TO_GREEN_EVENT_INFO" {
  name         = "CLEAN_TO_GREEN_EVENT_INFO"
  billing_mode = "PROVISIONED"

  # up to 8KB read per second (eventually consistent)
  read_capacity = 1

  # up to 1KB per second
  write_capacity = 1

  # we only need a student id to find an item in the table; therefore, we 
  # don't need a sort key here
  hash_key  = "Location"

  # the hash_key data type is string

  attribute {
    name = "Location"
    type = "S"
  }

  attribute {
    name = "Garbage_amt"
    type = "N"
  }

  attribute {
    name = "Date"
    type = "s"
  }
}
