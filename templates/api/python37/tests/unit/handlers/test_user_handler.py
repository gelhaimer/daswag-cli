import pytest

from undecorated import undecorated
import src.handlers.user_handler as handler


get_current_user = undecorated(handler.get_current_user)


__DEFAULT_USER_IDENTITY_ID__ = '080d6d23-9cce-4f90-8070-9ce872cf4ab8'
__DEFAULT_USER_REGION__ = 'eu-west-1'


@pytest.fixture
def event():
    return {
        'requestContext': {
            'identity': {
                'cognitoIdentityId': 'eu-west-1:080d6d23-9cce-4f90-8070-9ce872cf4ab8',
            },
        },
    }


def test_get_current_user(event):
    err, body = get_current_user(event, None)
    assert not err
    assert body
    assert body.get('identity_id') == __DEFAULT_USER_IDENTITY_ID__
    assert body.get('region') == __DEFAULT_USER_REGION__
