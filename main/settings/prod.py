import os
from .common import *
import dj_database_url
from .common import TEMPLATES as COMMON_TEMPLATES
from .common import STATICFILES_DIRS as COMMON_STATICFILES_DIRS


DEBUG = False

SECRET_KEY = os.environ["SECRET_KEY"]

ALLOWED_HOSTS = ["localhost"]

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

CSRF_COOKIE_SECURE = True
CSRF_COOKIE_HTTPONLY = True
CSRF_COOKIE_SAMESITE = 'Lax'

SESSION_COOKIE_SECURE = True
SESSION_COOKIE_HTTPONLY = True
SESSION_COOKIE_SAMESITE = 'Lax'
