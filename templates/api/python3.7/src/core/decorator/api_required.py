from functools import wraps


def api_required(params):
    """Extract values from request context and fail if missing"""
    def decorator(func):
        @wraps(func)
        def decorated(event, context):
            req = context.request
            err, ok = req.check_required_params(params)
            if not ok:
                return err, None
            else:
                return func(event, context, **req.params)
        return decorated
    return decorator
