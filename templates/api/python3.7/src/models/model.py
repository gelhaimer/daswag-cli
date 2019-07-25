import os

from pynamodb.models import Model
from pynamodb.attributes import UnicodeAttribute


class TableModel(Model):
    """
    Single Table model for this Application
    """
    class Meta:
        table_name = os.getenv("TABLE_NAME")

    pk = UnicodeAttribute(hash_key=True)
    sk = UnicodeAttribute(range_key=True)
