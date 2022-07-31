#!/usr/bin/env bash
# start-server.sh
if [ -n "$DJANGO_SUPERUSER_USERNAME" ] && [ -n "$DJANGO_SUPERUSER_PASSWORD" ] ; then
    (cd martor_demo; python manage.py createsuperuser --no-input)
fi
(cd app; gunicorn django_board.wsgi --bind 0.0.0.0:8010 --workers 3) &
nginx -g "daemon off;"