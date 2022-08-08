'''
File: aaa_model.py
Project: aaa
File Created: Wednesday, 17th February 2021 1:01:44 pm
Author: Ahad Rafat Talebi (office) (ahadrt@gmail.com)
-----
Last Modified: Thursday, 11th March 2021 1:28:33 pm
Modified By: Ahad Rafat Talebi (office) (ahadrt@gmail.com>)
-----
Copyright 2018 - 2021 Borna Mehr Fann, Borna Mehr Fann
Trademark barteh
'''






# class AGeoField(EmbeddedDocument):
#     geoid = StringField(required=True, max_length=20)
#     scope = StringField(max_length=20, required=False)
#     name = StringField(max_length=200)
#     geo_type = DictField(required=True)
#     level = IntField(default=0)
#     level_name = StringField(max_length=100)
#     full_name = StringField(max_length=200)


# class SUser(Document):
#     meta = {'db_alias': 'aaa',
#             "allow_inheritance": False,
#             'indexes': [
#                 {"fields": ["userid"], "unique": True}

#             ]
#             }
#     userid = StringField(required=True, max_length=100)
#     password = StringField(required=True, max_length=100)
#     enable = BooleanField(required=True, default=True)
#     refreshToken = StringField(max_length=1000)
#     fname = StringField(required=True, max_length=100, default="")
#     lname = StringField(required=True, max_length=100, default="")
#     scope = StringField(choices=scope_range, required=True, default="HQ")
#     created = DateTimeField()
#     j_created = StringField(default=to_jalali(datetime.datetime.now()))
#     creator = StringField(max_length=100)
#     last_modified = DateTimeField()
#     modifier = StringField(max_length=100)
#     roles = ListField(default=[])
#     # geo = StringField(required=True, default="world")
#     geo = EmbeddedDocumentField(AGeoField, required=True, db_field="geo")

#     # box = StringField(required=True, default="")
#     box = EmbeddedDocumentField(ABoxField)
#     image = BinaryField(max_bytes=5 * 1024 * 1024)
#     thumb_nail = BinaryField(max_bytes=5 * 1024 * 1024)


class SUser():
    pass