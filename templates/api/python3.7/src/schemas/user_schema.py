from marshmallow import Schema, fields


class UserSchema(Schema):
    identity_id = fields.Str()
    region = fields.Str()


user_schema = UserSchema()
