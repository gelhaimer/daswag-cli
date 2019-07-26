# flake8: noqa
import sys
import boto3
import os

# Import XRay to enable tracing
from aws_xray_sdk.core import patch
from src.core.logger import create_logger

# XRay patching third party libs
libs_to_patch = ('boto3', 'requests')
patch(libs_to_patch)

# Global variables
initialized = False
logger = create_logger(__name__)


def build_dynamodb_resource():
    global dynamodb_resource
    logger.debug("Building DynamoDB resource")
    if os.getenv("AWS_SAM_LOCAL"):
        logger.debug("Using local DynamoDB endpoint")
        from pynamodb.connection import TableConnection
        original_init = TableConnection.__init__

        def init(*args, **kwargs):
            kwargs['host'] = 'http://localhost:8000'
            return original_init(*args, **kwargs)

        TableConnection.__init__ = init


def init():
    global initialized
    try:
        if initialized:
            return
        else:
            initialized = True
            build_dynamodb_resource()
        # Create context
    except Exception as e:
        logger.error("An error occurred during initialization phase", e)
        sys.exit()

