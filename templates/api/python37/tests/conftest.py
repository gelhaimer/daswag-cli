import pytest

from src.models.model import TableModel


def patch_dynamodb_host():
    from pynamodb.connection import TableConnection
    original_init = TableConnection.__init__

    def init(*args, **kwargs):
        kwargs['host'] = 'http://localhost:8000'
        return original_init(*args, **kwargs)

    TableConnection.__init__ = init


@pytest.fixture(autouse=True, scope='session')
def context():
    """Create tables if needed"""
    try:
        patch_dynamodb_host()
        if not TableModel.exists():
            TableModel.create_table(read_capacity_units=1, write_capacity_units=1, wait=True)
        yield context
    except Exception:
        pytest.skip('unable to run local dynamodb')


@pytest.fixture(autouse=True, scope='function')
def session():
    """Insert testing data for each entities"""
    try:
        # Loading data
        # Model.load("model.json")
        yield
        # Clear all data on tables
        # TableModel.delete_table()
    except Exception:
        pytest.skip('unable to load testing data')

