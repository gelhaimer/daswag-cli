import logging

from functools import wraps
from src.main import logger
from src.core.request.api_request import ApiRequest
from src.core.response import response

import src.main as main
import src.core.config as config

from src.core.request.api_request import DEBUG_HEADER


def api_endpoint():
    """Decorate a lambda function endpoint with user access checking"""
    def decorator(func):
        @wraps(func)
        def decorated(event, context):
            # Create ApiRequest layer and init context
            req = ApiRequest(event=event, aws_request_id=context.aws_request_id)
            req.set_request_context()

            # Store context globally
            config.global_context = req.request_context

            # Update logging level
            if DEBUG_HEADER in config.global_context and config.global_context[DEBUG_HEADER] == 'true':
                main.logger.setLevel(logging.DEBUG)
            else:
                main.logger.setLevel(logging.INFO)

            try:
                # Call method and manage session in case of error
                err, res = func(event, context)
            except Exception as e:
                logger.error("An internal server error occurred", e)
                err, res = e, None
                err.status_code = '500'

            return response(err, res)
        return decorated
    return decorator
