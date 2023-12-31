import json
import os
import logging
import tempfile
from .common import *
import dj_database_url
from .common import TEMPLATES as COMMON_TEMPLATES
from .common import STATICFILES_DIRS as COMMON_STATICFILES_DIRS


logger = logging.getLogger(__name__)


DEBUG = False

SECRET_KEY = os.environ["SECRET_KEY"]

ALLOWED_HOSTS = ["stimme.onrender.com", "www.stimme.onrender.com", "stimme-back.onrender.com", "www.stimme-back.onrender.com",
                 "stimme.manzarimusic.com", "www.stimme.manzarimusic.com", "stimme-back.manzarimusic.com", "www.stimme-back.manzarimusic.com"]

SERVE_REACT_FRONTEND = True

RENDER_EXTERNAL_HOSTNAME = os.environ["RENDER_EXTERNAL_HOSTNAME"]


if RENDER_EXTERNAL_HOSTNAME:
    ALLOWED_HOSTS.append(RENDER_EXTERNAL_HOSTNAME)

DATABASES = {
    'default': dj_database_url.config(
        default=os.environ["DATABASE_URL"],
        conn_max_age=600
    )
}

# Media File Settings
MEDIA_URL = '/media/'

# Google cloud storage setiings

GOOGLE_APPLICATION_CREDENTIALS = os.environ["GS_CREDENTIALS"]
DEFAULT_FILE_STORAGE = 'storages.backends.gcloud.GoogleCloudStorage'
GS_BUCKET_NAME = 'stimme-data'


LOGGING = {
    'version': 1,
    'disable_existing_loggers': False,
    'handlers': {
        'console': {
            'class': 'logging.StreamHandler',
        },
    },
    'root': {
        'handlers': ['console'],
        'level': os.environ.get("LOG_LEVEL", "WARNING").upper(),
    },
}


# CORS settings
CORS_ALLOW_CREDENTIALS = True

CORS_ALLOWED_ORIGINS = os.environ.get("CORS_ALLOWED_ORIGINS", "").split(",")

CORS_ALLOW_HEADERS = (
    "accept",
    "authorization",
    "content-type",
    "user-agent",
    "x-csrftoken",
    "x-requested-with",
)

CORS_EXPOSE_HEADERS = ['Content-Type', 'X-CSRFToken']

# CSRF settings
CSRF_TRUSTED_ORIGINS = os.environ.get("CORS_TRUSTED_ORIGINS", "").split(",")

# token create and refresh behaviorin core.views
COOKIE_SECURE_SETTING = True

CSRF_COOKIE_SECURE = True
CSRF_COOKIE_HTTPONLY = True
CSRF_COOKIE_SAMESITE = 'None'

SESSION_COOKIE_SECURE = True
SESSION_COOKIE_HTTPONLY = True
SESSION_COOKIE_SAMESITE = 'None'


# Email
EMAIL_BACKEND = 'sendgrid_backend.SendgridBackend'
DEFAULT_FROM_EMAIL = 'stimme@manzarimusic.com'
SENDGRID_API_KEY = os.environ["SENDGRID_API_KEY"]


# Djoser custom email DOMAIN, activation and resetpassword
CUSTOM_EMAIL_DOMAIN = os.environ.get('CUSTOM_EMAIL_DOMAIN')
