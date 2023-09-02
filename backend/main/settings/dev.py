from .common import *
import os

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = True

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = 'django-insecure-fem1nk60z#w-)-%*k!(fys#z%abqc95f15r037*q2%$z+35ffy'

ALLOWED_HOSTS = ['*']

SERVE_REACT_FRONTEND = False


# Database
# https://docs.djangoproject.com/en/4.2/ref/settings/#databases

# DATABASES = {
#     'default': {
#         'ENGINE': 'django.db.backends.sqlite3',
#         'NAME': BASE_DIR / 'db.sqlite3',
#     }
# }

import dj_database_url

DATABASES = {
    'default': dj_database_url.config(default=os.environ.get('DATABASE_URL'))
}

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': 'stimme_local',
        'USER': 'claudron',
        'PASSWORD': 'open',
        'HOST': 'postgres',  
        'PORT': '5432',
    }
}