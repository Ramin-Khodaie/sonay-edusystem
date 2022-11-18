

from .adatabase_base import ADatabaseBase

__all__ = ['ADatabase']


class ADatabase(ADatabaseBase):
    status: bool

    def init(self) -> bool:
        return True

    pass
