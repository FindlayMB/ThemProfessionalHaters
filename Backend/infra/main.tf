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

# create archive file from main.py
data "archive_file" "lambda-contribution" {
  type = "zip"
  # this file (main.py) needs to exist in the same folder as this 
  # Terraform configuration file
  source_dir = "../functions/contribution"
  output_path = local.artifact_name_contribution
}

# create archive file from main.py
data "archive_file" "lambda-donate" {
  type = "zip"
  # this file (main.py) needs to exist in the same folder as this 
  # Terraform configuration file
  source_dir = "../functions/donate"
  output_path = local.artifact_name_donate
}

# create archive file from main.py
data "archive_file" "lambda-event_get" {
  type = "zip"
  # this file (main.py) needs to exist in the same folder as this 
  # Terraform configuration file
  source_dir = "../functions/event_get"
  output_path = local.artifact_name_event_get
}

# create archive file from main.py
data "archive_file" "lambda-login" {
  type = "zip"
  # this file (main.py) needs to exist in the same folder as this 
  # Terraform configuration file
  source_dir = "../functions/login"
  output_path = local.artifact_name_login
}

# create archive file from main.py
data "archive_file" "lambda-register" {
  type = "zip"
  # this file (main.py) needs to exist in the same folder as this 
  # Terraform configuration file
  source_dir = "../functions/register"
  output_path = local.artifact_name_register
}

# create archive file from main.py
data "archive_file" "lambda-map_data_get" {
  type = "zip"
  # this file (main.py) needs to exist in the same folder as this 
  # Terraform configuration file
  source_dir = "../functions/map_data_get"
  output_path = local.artifact_name_map_data_get
}

# create a Lambda function
# see the docs: https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/lambda_function
resource "aws_lambda_function" "contribution" {
  # s3_bucket        = aws_s3_bucket.lambda.bucket
  # s3_key           = local.artifact_name_contribution
  role             = aws_iam_role.lambda-contribution.arn
  function_name    = local.function_name_contribution
  handler          = local.handler_name
  filename         = local.artifact_name_contribution
  source_code_hash = data.archive_file.lambda-contribution.output_base64sha256

  # see all available runtimes here: https://docs.aws.amazon.com/lambda/latest/dg/API_CreateFunction.html#SSS-CreateFunction-request-Runtime
  runtime = "python3.9"
}

# create a Lambda function
# see the docs: https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/lambda_function
resource "aws_lambda_function" "donate" {
  # s3_bucket        = aws_s3_bucket.lambda.bucket
  # s3_key           = local.artifact_name_get
  role             = aws_iam_role.lambda-donate.arn
  function_name    = local.function_name_donate
  handler          = local.handler_name
  filename         = local.artifact_name_donate
  source_code_hash = data.archive_file.lambda-donate.output_base64sha256

  # see all available runtimes here: https://docs.aws.amazon.com/lambda/latest/dg/API_CreateFunction.html#SSS-CreateFunction-request-Runtime
  runtime = "python3.9"
}

# create a Lambda function
# see the docs: https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/lambda_function
resource "aws_lambda_function" "event_get" {
  # s3_bucket        = aws_s3_bucket.lambda.bucket
  # s3_key           = local.artifact_name_get
  role             = aws_iam_role.lambda-event_get.arn
  function_name    = local.function_name_event_get
  handler          = local.handler_name
  filename         = local.artifact_name_event_get
  source_code_hash = data.archive_file.lambda-event_get.output_base64sha256

  # see all available runtimes here: https://docs.aws.amazon.com/lambda/latest/dg/API_CreateFunction.html#SSS-CreateFunction-request-Runtime
  runtime = "python3.9"
}

# create a Lambda function
# see the docs: https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/lambda_function
resource "aws_lambda_function" "login" {
  # s3_bucket        = aws_s3_bucket.lambda.bucket
  # s3_key           = local.artifact_name_get
  role             = aws_iam_role.lambda-login.arn
  function_name    = local.function_name_login
  handler          = local.handler_name
  filename         = local.artifact_name_login
  source_code_hash = data.archive_file.lambda-login.output_base64sha256

  # see all available runtimes here: https://docs.aws.amazon.com/lambda/latest/dg/API_CreateFunction.html#SSS-CreateFunction-request-Runtime
  runtime = "python3.9"
}

# create a Lambda function
# see the docs: https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/lambda_function
resource "aws_lambda_function" "register" {
  # s3_bucket        = aws_s3_bucket.lambda.bucket
  # s3_key           = local.artifact_name_get
  role             = aws_iam_role.lambda-register.arn
  function_name    = local.function_name_register
  handler          = local.handler_name
  filename         = local.artifact_name_register
  source_code_hash = data.archive_file.lambda-register.output_base64sha256

  # see all available runtimes here: https://docs.aws.amazon.com/lambda/latest/dg/API_CreateFunction.html#SSS-CreateFunction-request-Runtime
  runtime = "python3.9"
}

# create a Lambda function
# see the docs: https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/lambda_function
resource "aws_lambda_function" "map_data_get" {
  # s3_bucket        = aws_s3_bucket.lambda.bucket
  # s3_key           = local.artifact_name_get
  role             = aws_iam_role.lambda-map_data_get.arn
  function_name    = local.function_name_map_data_get
  handler          = local.handler_name
  filename         = local.artifact_name_map_data_get
  source_code_hash = data.archive_file.lambda-map_data_get.output_base64sha256

  # see all available runtimes here: https://docs.aws.amazon.com/lambda/latest/dg/API_CreateFunction.html#SSS-CreateFunction-request-Runtime
  runtime = "python3.9"
}

# create a Function URL for Lambda 
# see the docs: https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/lambda_function_url
resource "aws_lambda_function_url" "url_contribution" {
  function_name      = aws_lambda_function.contribution.function_name
  authorization_type = "NONE"

  cors {
    allow_credentials = true
    allow_origins     = ["*"]
    allow_methods     = ["GET", "POST", "PUT"]
    allow_headers     = ["*"]
    expose_headers    = ["keep-alive", "date"]
  }
}



resource "aws_lambda_function_url" "url_donate" {
  function_name      = aws_lambda_function.donate.function_name
  authorization_type = "NONE"

  cors {
    allow_credentials = true
    allow_origins     = ["*"]
    allow_methods     = ["POST","PUT"]
    allow_headers     = ["*"]
    expose_headers    = ["keep-alive", "date"]
  }
}

resource "aws_lambda_function_url" "url_event_get" {
  function_name      = aws_lambda_function.event_get.function_name
  authorization_type = "NONE"

  cors {
    allow_credentials = true
    allow_origins     = ["*"]
    allow_methods     = ["GET", "DELETE"]
    allow_headers     = ["*"]
    expose_headers    = ["keep-alive", "date"]
  }
}

# create a Function URL for Lambda 
# see the docs: https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/lambda_function_url
resource "aws_lambda_function_url" "url_login" {
  function_name      = aws_lambda_function.login.function_name
  authorization_type = "NONE"

  cors {
    allow_credentials = true
    allow_origins     = ["*"]
    allow_methods     = ["GET"]
    allow_headers     = ["*"]
    expose_headers    = ["keep-alive", "date"]
  }
}

# create a Function URL for Lambda 
# see the docs: https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/lambda_function_url
resource "aws_lambda_function_url" "url_register" {
  function_name      = aws_lambda_function.register.function_name
  authorization_type = "NONE"

  cors {
    allow_credentials = true
    allow_origins     = ["*"]
    allow_methods     = ["PUT", "GET"]
    allow_headers     = ["*"]
    expose_headers    = ["keep-alive", "date"]
  }
}

# create a Function URL for Lambda 
# see the docs: https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/lambda_function_url
resource "aws_lambda_function_url" "url_map_data_get" {
  function_name      = aws_lambda_function.map_data_get.function_name
  authorization_type = "NONE"

  cors {
    allow_credentials = true
    allow_origins     = ["*"]
    allow_methods     = ["GET"]
    allow_headers     = ["*"]
    expose_headers    = ["keep-alive", "date"]
  }
}

# show the Function URL after creation
output "lambda_url-contribution" {
  value = aws_lambda_function_url.url_contribution.function_url
}

# show the Function URL after creation
output "lambda_url-donate" {
  value = aws_lambda_function_url.url_donate.function_url
}

# show the Function URL after creation
output "lambda_url-event_get" {
  value = aws_lambda_function_url.url_event_get.function_url
}

# show the Function URL after creation
output "lambda_url-login" {
  value = aws_lambda_function_url.url_login.function_url
}

# show the Function URL after creation
output "lambda_url-register" {
  value = aws_lambda_function_url.url_register.function_url
}

# show the Function URL after creation
output "lambda_url-map_data_get" {
  value = aws_lambda_function_url.url_map_data_get.function_url
}

# roles and policies as needed

# create a role for the Lambda function to assume
# every service on AWS that wants to call other AWS services should first assume a role and
# then any policy attached to the role will give permissions
# to the service so it can interact with other AWS services
resource "aws_iam_role" "lambda-contribution" {
  name               = "iam-for-lambda-${local.function_name_contribution}"
  assume_role_policy = <<EOF
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Action": "sts:AssumeRole",
      "Principal": {
        "Service": "lambda.amazonaws.com"
      },
      "Effect": "Allow",
      "Sid": ""
    }
  ]
}
EOF
}

resource "aws_iam_role" "lambda-donate" {
  name               = "iam-for-lambda-${local.function_name_donate}"
  assume_role_policy = <<EOF
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Action": "sts:AssumeRole",
      "Principal": {
        "Service": "lambda.amazonaws.com"
      },
      "Effect": "Allow",
      "Sid": ""
    }
  ]
}
EOF
}

resource "aws_iam_role" "lambda-event_get" {
  name               = "iam-for-lambda-${local.function_name_event_get}"
  assume_role_policy = <<EOF
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Action": "sts:AssumeRole",
      "Principal": {
        "Service": "lambda.amazonaws.com"
      },
      "Effect": "Allow",
      "Sid": ""
    }
  ]
}
EOF
}

resource "aws_iam_role" "lambda-login" {
  name               = "iam-for-lambda-${local.function_name_login}"
  assume_role_policy = <<EOF
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Action": "sts:AssumeRole",
      "Principal": {
        "Service": "lambda.amazonaws.com"
      },
      "Effect": "Allow",
      "Sid": ""
    }
  ]
}
EOF
}

#*** register ***#
resource "aws_iam_role" "lambda-register" {
  name               = "iam-for-lambda-${local.function_name_register}"
  assume_role_policy = <<EOF
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Action": "sts:AssumeRole",
      "Principal": {
        "Service": "lambda.amazonaws.com"
      },
      "Effect": "Allow",
      "Sid": ""
    }
  ]
}
EOF
}

#*** map_data_get ***#
resource "aws_iam_role" "lambda-map_data_get" {
  name               = "iam-for-lambda-${local.function_name_map_data_get}"
  assume_role_policy = <<EOF
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Action": "sts:AssumeRole",
      "Principal": {
        "Service": "lambda.amazonaws.com"
      },
      "Effect": "Allow",
      "Sid": ""
    }
  ]
}
EOF
}

# create a policy for publishing logs to CloudWatch
# see the docs: https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/iam_policy
resource "aws_iam_policy" "logs-contribution" {
  name        = "lambda-logging-${local.function_name_contribution}"
  description = "IAM policy for logging from a lambda"

  policy = <<EOF
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Action": [
        "logs:CreateLogGroup",
        "logs:CreateLogStream",
        "logs:PutLogEvents",
        "dynamodb:GetItem",
        "dynamodb:PostItem",
        "dynamodb:PutItem",
        "dynamodb:Query",
        "dynamodb:Scan",
        "ssm:GetParameter",
        "ssm:GetParameters",
        "ssm:GetParametersByPath",
        "polly:SynthesizeSpeech"
      ],
      "Resource": "*",
      "Effect": "Allow"
    }
  ]
}
EOF
}

resource "aws_iam_policy" "logs-donate" {
  name        = "lambda-logging-${local.function_name_donate}"
  description = "IAM policy for logging from a lambda"

  policy = <<EOF
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Action": [
        "logs:CreateLogGroup",
        "logs:CreateLogStream",
        "logs:PutLogEvents",
        "dynamodb:PuttItem",
        "dynamodb:PostItem",
        "dynamodb:Query",
        "dynamodb:Scan",
        "ssm:GetParameter",
        "ssm:GetParameters",
        "ssm:GetParametersByPath",
        "polly:SynthesizeSpeech"
      ],
      "Resource": "*",
      "Effect": "Allow"
    }
  ]
}
EOF
}

resource "aws_iam_policy" "logs-event_get" {
  name        = "lambda-logging-${local.function_name_event_get}"
  description = "IAM policy for logging from a lambda"

  policy = <<EOF
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Action": [
        "logs:CreateLogGroup",
        "logs:CreateLogStream",
        "logs:PutLogEvents",
        "dynamodb:GetItem",
        "dynamodb:DeleteItem",
        "dynamodb:Query",
        "dynamodb:Scan",
        "ssm:GetParameter",
        "ssm:GetParameters",
        "ssm:GetParametersByPath",
        "polly:SynthesizeSpeech"
      ],
      "Resource": "*",
      "Effect": "Allow"
    }
  ]
}
EOF
}

resource "aws_iam_policy" "logs-login" {
  name        = "lambda-logging-${local.function_name_login}"
  description = "IAM policy for logging from a lambda"

  policy = <<EOF
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Action": [
        "logs:CreateLogGroup",
        "logs:CreateLogStream",
        "logs:PutLogEvents",
        "dynamodb:GetItem",
        "dynamodb:Query",
        "dynamodb:Scan",
        "ssm:GetParameter",
        "ssm:GetParameters",
        "ssm:GetParametersByPath",
        "polly:SynthesizeSpeech"
      ],
      "Resource": "*",
      "Effect": "Allow"
    }
  ]
}
EOF
}

resource "aws_iam_policy" "logs-register" {
  name        = "lambda-logging-${local.function_name_register}"
  description = "IAM policy for logging from a lambda"

  policy = <<EOF
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Action": [
        "logs:CreateLogGroup",
        "logs:CreateLogStream",
        "logs:PutLogEvents",
        "dynamodb:GetItem",
        "dynamodb:Query",
        "dynamodb:Scan",
        "ssm:GetParameter",
        "ssm:GetParameters",
        "ssm:GetParametersByPath",
        "polly:SynthesizeSpeech"
      ],
      "Resource": "*",
      "Effect": "Allow"
    }
  ]
}
EOF
}

resource "aws_iam_policy" "logs-map_data_get" {
  name        = "lambda-logging-${local.function_name_map_data_get}"
  description = "IAM policy for logging from a lambda"

  policy = <<EOF
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Action": [
        "logs:CreateLogGroup",
        "logs:CreateLogStream",
        "logs:PutLogEvents",
        "dynamodb:GetItem",
        "dynamodb:Query",
        "dynamodb:Scan",
        "ssm:GetParameter",
        "ssm:GetParameters",
        "ssm:GetParametersByPath",
        "polly:SynthesizeSpeech"
      ],
      "Resource": "*",
      "Effect": "Allow"
    }
  ]
}
EOF
}

# attach the above policy to the function role
# see the docs: https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/iam_role_policy_attachment
resource "aws_iam_role_policy_attachment" "lambda_logs_contribution" {
  role       = aws_iam_role.lambda-contribution.name
  policy_arn = aws_iam_policy.logs-contribution.arn
}

# attach the above policy to the function role
# see the docs: https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/iam_role_policy_attachment
resource "aws_iam_role_policy_attachment" "lambda_logs_donate" {
  role       = aws_iam_role.lambda-donate.name
  policy_arn = aws_iam_policy.logs-donate.arn
}

# attach the above policy to the function role
# see the docs: https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/iam_role_policy_attachment
resource "aws_iam_role_policy_attachment" "lambda_logs_event_get" {
  role       = aws_iam_role.lambda-event_get.name
  policy_arn = aws_iam_policy.logs-event_get.arn
}

resource "aws_iam_role_policy_attachment" "lambda_logs_login" {
  role       = aws_iam_role.lambda-login.name
  policy_arn = aws_iam_policy.logs-login.arn
}

resource "aws_iam_role_policy_attachment" "lambda_logs_register" {
  role       = aws_iam_role.lambda-register.name
  policy_arn = aws_iam_policy.logs-register.arn
}

resource "aws_iam_role_policy_attachment" "lambda_logs_map_data_get" {
  role       = aws_iam_role.lambda-map_data_get.name
  policy_arn = aws_iam_policy.logs-map_data_get.arn
}

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

  # attribute {
  #   name = "Location"
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

# # Dynamodb table for storing location info
# # read the docs: https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/dynamodb_table
# resource "aws_dynamodb_table" "CLEAN_TO_GREEN_LOCATION_INFO" {
#   name         = "CLEAN_TO_GREEN_LOCATION_INFO"
#   billing_mode = "PROVISIONED"

#   # up to 8KB read per second (eventually consistent)
#   read_capacity = 1

#   # up to 1KB per second
#   write_capacity = 1

#   # we only need a student id to find an item in the table; therefore, we 
#   # don't need a sort key here
#   hash_key  = "Location_code"
#   range_key  = "Location"

#   # the hash_key data type is string

#   attribute {
#     name = "Location_code"
#     type = "S"
#   }

#   attribute {
#     name = "Location"
#     type = "S"
#   }

#   # attribute {
#   #   name = "Sector"
#   #   type = "N"
#   # }
# }

#   # attribute {
#   #   name = "Garbage_sum"
#   #   type = "N"
#   # }

#   # attribute {
#   #   name = "Input_num"
#   #   type = "N"
#   # }

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

  # attribute {
  #   name = "Garbage_amt"
  #   type = "N"
  # }

  # attribute {
  #   name = "Date"
  #   type = "S"
  # }
}
