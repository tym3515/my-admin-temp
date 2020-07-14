#!/bin/bash
git status
git add .
if [ ! $1 ]; then
	git commit -m "default"
fi
if [ $1 ]; then
	git commit -m "$1"
fi
git push -u myorigin master
