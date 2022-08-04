import base64
import sys
from typing import AnyStr, Callable, List, Union
from fastapi import FastAPI, APIRouter, UploadFile, File, Request
from starlette.responses import StreamingResponse

from ..barteh_app import bt
from pymongo.database import Collection
from bson import ObjectId
from PIL import Image, ImageFile
import os
import io

__all__ = ["save_docs", "load_doc", "send_doc"]


def create_thumbnail(img: AnyStr, size: int = 64):
    p = ImageFile.Parser()
    try:
        p.feed(img)
        im: Image.Image = p.close()

        im.thumbnail((size, size))
        byteIO = io.BytesIO()

        im = im.convert("RGB")
        im.save(byteIO, format='PNG', optimize=True)
        return byteIO.getvalue()
    except:
        e = sys.exc_info()
        return download_image_thumb


def is_image(content_type: str) -> bool:
    parts = content_type.split('/')
    if len(parts) < 2:
        return False
    elif parts[0] == 'image':
        return True
    else:
        return False


tf = open("./image/download.jpg", "rb")
download_image_thumb = tf.read()
tf.close()


def save_docs(upload_file: Union[UploadFile, List[UploadFile]], app: str = "barteh3", collection: str = "docs",
              database: str = "barteh3", accepted_types: list = None,
              thumbnail_size: int = 128, ns="barteh.common", **extras):
    """
       a  function that saves files in database
       app: app name, default is barteh3
       database: mongodb database that image will store in, default is barteh3
       collection: mongodb collection name, default is docs
       accepted_types is an array includes  ["image", "pdf", "office", "font","video", "audio", "archive"],
                       default is ["image", "pdf", "office", "archive"]
        extras includes extra attributes should be saved inside document in mongodb
        max_size in bytes default is 2 MB
       """

    if accepted_types is None:
        accepted_types = ["image", "pdf", "office", "archive"]
    files: List[UploadFile] = []
    multi = False
    if isinstance(upload_file, list):
        multi = True
        files = upload_file
    else:
        files.append(upload_file)

    db = bt.databases[database].db
    coll: Collection = db[collection]
    rets = []
    for file in files:

        content = file.file.read()
        tm = None
        if is_image(file.content_type):
            tm = create_thumbnail(content, thumbnail_size)
        else:
            tm = download_image_thumb
        doc = {"app": app, "content_type": file.content_type, "file_name": file.filename, 'ns': ns
            , **extras, "thumbnail": tm, "data": content}
        ret = None
        try:
            ret = coll.insert_one(doc)
            rets.append(str(ret.inserted_id))
        except:
            e = sys.exc_info()
            rets.append(None)
            return rets

            pass

    return rets


def load_doc(doc_id: str, app: str = "barteh3", collection: str = "docs", database: str = "barteh3",
             thumbnail: int = 0):
    im: int = 0 if thumbnail == 1 else 1
    if not ObjectId.is_valid(doc_id):
        return
    db = bt.databases[database].db
    coll: Collection = db[collection]
    try:
        q = coll.find({"_id": ObjectId(doc_id)})
        # ,
        #           {"_id": 0, "thumbnail": thumbnail, "data": im, "content_type": 1})
        if q.count() > 0:
            d = q[0]
            c_type = d["content_type"] if im == 1 else "image/jpg"

            dat = d["data"] if im == 1 else d["thumbnail"]

            return {"data": dat, "file_name": d["file_name"], "content_type": c_type}
            # ret = (d["data"], d["content_type"]) if im else (d["thumbnail"], "image/jpg")
            # return ret
        else:
            return None
    except:
        e = sys.exc_info()
        return None


def is_english(s: str) -> bool:
    try:
        s.encode(encoding='utf-8').decode("ascii")
        return True
    except:
        return False


def prepare_filename(instr) -> str:
    fn = ""
    fn_ext = ""
    filename, file_extension = os.path.splitext(instr)
    if is_english(file_extension):
        fn_ext = file_extension
        if is_english(filename):
            return instr
        else:
            return "unknown_file_name" + "." + file_extension
    else:
        if is_english(filename):
            return filename
        else:
            return "unknown_file_name_and_extension"

        return o


def send_doc(doc_id: str, app: str = "barteh3", collection: str = "docs", database: str = "barteh3",
             thumbnail: bool = False, download=False):
    """
    doc_id is a string contains Object id of a saved document in mongodb
    database and collection address to location in mongodb
    thumbnail is a bool parameter which if set it true it will return a thumbnail instead of main file
    download causes show download in browser instead of show in browser tab
    """
    d = load_doc(doc_id=doc_id, collection=collection, database=database, thumbnail=thumbnail)
    if d is None:
        return
    else:
        dat = io.BytesIO(d["data"])
        is_lotin = False
        fn = ""
        if thumbnail:
            fn = "icon.jpg"
        else:
            fn = prepare_filename(d["file_name"])
        attachment = "attachment;" if download and not thumbnail else ""
        res = StreamingResponse(dat, media_type=d["content_type"]
                                , headers={"Content-Disposition": f"{attachment}filename={fn}",
                                           "Cache-Control": "max-age=120000"})

    return res
