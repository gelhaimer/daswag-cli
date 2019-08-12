import unittest
import uuid

import src.core.validator.uuid_validator as validator


class TestValidator(unittest.TestCase):

    def test_validate_uuid4(self):
        self.assertTrue(validator.validate_uuid4(uuid_string=str(uuid.uuid4())))

    def test_validate_uuid4_none_value(self):
        self.assertFalse(validator.validate_uuid4(None))

    def test_validate_uuid4_empty_value(self):
        self.assertFalse(validator.validate_uuid4(''))

    def test_validate_uuid4_incorrect_value(self):
        self.assertFalse(validator.validate_uuid4('test'))
