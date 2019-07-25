import unittest
import mock

from src.core.decorator.api_required import api_required


class TestApiRequired(unittest.TestCase):

    def test_required(self):
        mock_check_required = mock.Mock(return_value=(None, True))

        # Init Context & Request mock
        context = mock.MagicMock()
        context.request = mock.MagicMock()
        context.request.check_required_params = mock_check_required

        def dummy_func(event, context):
            pass

        dummy_func(None, None)
        mock_check_required.assert_not_called()

        wrapped_dummy_func = api_required([])(dummy_func)
        wrapped_dummy_func({}, context)
        mock_check_required.assert_called_once()
