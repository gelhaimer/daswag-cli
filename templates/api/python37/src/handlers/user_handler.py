from src.main import init
from src.core.decorator.api_endpoint import api_endpoint
from src.schemas.user_schema import user_schema
from src.models.user_model import User

# Initialize context
init()


@api_endpoint()
def get_current_user(event, context):
    try:
        request_identity = event['requestContext']['identity']['cognitoIdentityId']

        # Split identity
        region, identity_id = request_identity.split(':', 1)

        # Create current user instance
        current_user = User(identity_id, region)

        # Build user schema data
        return None, user_schema.dump(current_user).data
    except AssertionError as e:
        return ValueError(str(e)), None
