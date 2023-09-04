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

# Media File Settings
MEDIA_URL = '/media/'

# Google cloud storage setiings

# Load the JSON content from the environment variable
gcs_credentials_content = os.environ.get('GS_CREDENTIALS')
if gcs_credentials_content:
    # Create a temporary file and write the credentials content to it
    with tempfile.NamedTemporaryFile(delete=False) as temp_file:
        temp_file.write(gcs_credentials_content.encode())
        temp_credentials_path = temp_file.name

    # Set GS_CREDENTIALS to the path of the temporary file
    GS_CREDENTIALS = temp_credentials_path

    logger.info(
        f"Temporary GCS credentials file created at: {temp_credentials_path}")
    logger.info(f"GS_CREDENTIALS set to: {GS_CREDENTIALS}")
else:
    logger.error("Environment variable GS_CREDENTIALS not found or is empty.")


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

CSRF_COOKIE_SECURE = True
CSRF_COOKIE_HTTPONLY = True
CSRF_COOKIE_SAMESITE = 'Lax'

SESSION_COOKIE_SECURE = True
SESSION_COOKIE_HTTPONLY = True
SESSION_COOKIE_SAMESITE = 'Lax'
