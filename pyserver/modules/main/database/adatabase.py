'''
File: adatabase.py
Project: database
File Created: Saturday, 31st October 2020 3:35:37 pm
Author: Ahad Rafat Talebi (office) (ahadrt@gmail.com)
-----
Last Modified: Thursday, 11th March 2021 1:29:54 pm
Modified By: Ahad Rafat Talebi (office) (ahadrt@gmail.com>)
-----
Copyright 2018 - 2021 Borna Mehr Fann, Borna Mehr Fann
Trademark barteh
'''

from .adatabase_base import ADatabaseBase

__all__ = ['ADatabase']


class ADatabase(ADatabaseBase):
    status: bool

    def init(self) -> bool:
        return True

    pass
