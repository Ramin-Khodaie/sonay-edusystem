# syntax=docker/dockerfile:1

FROM python:3.10-slim-buster

WORKDIR /app

COPY requirements.txt requirements.txt
RUN pip3 install -r requirements.txt

COPY . .
EXPOSE 8000

CMD [  "./db.sh"]

#  docker run --name pyserver -p 8000:8000 pyserver

