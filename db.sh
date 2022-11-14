#!/bin/sh
cd pyserver 
uvicorn main:app --reload --host 0.0.0.0