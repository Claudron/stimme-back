import os
from .common import *
import dj_database_url
from .common import TEMPLATES as COMMON_TEMPLATES
from .common import STATICFILES_DIRS as COMMON_STATICFILES_DIRS


DEBUG = False

SECRET_KEY = os.environ["SECRET_KEY"]

ALLOWED_HOSTS = ["localhost"]

RENDER_EXTERNAL_HOSTNAME = os.environ["RENDER_EXTERNAL_HOSTNAME"]


if RENDER_EXTERNAL_HOSTNAME:
    ALLOWED_HOSTS.append(RENDER_EXTERNAL_HOSTNAME)

DATABASES = {
    'default': dj_database_url.config(
        default=os.environ["DATABASE_URL"],
        conn_max_age=600
    )
}


STATICFILES_DIRS = [
    os.path.join(BASE_DIR, 'DjangoReact', 'dist', 'assets'),
]


TEMPLATES = COMMON_TEMPLATES.copy()
TEMPLATES[0]['DIRS'] = [os.path.join(BASE_DIR, 'DjangoReact', 'dist')]



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

