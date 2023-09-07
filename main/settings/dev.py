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

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': BASE_DIR / 'db.sqlite3',
    }
}

# import dj_database_url

# DATABASES = {
#     'default': dj_database_url.config(default=os.environ.get('DATABASE_URL'))
# }

# DATABASES = {
#     'default': {
#         'ENGINE': 'django.db.backends.postgresql',
#         'NAME': 'stimme_local',
#         'USER': 'claudron',
#         'PASSWORD': 'open',
#         'HOST': 'postgres',  
#         'PORT': '5432',
#     }
# }

# Media File Settings
MEDIA_URL = '/media/'
MEDIA_ROOT = os.path.join(BASE_DIR, 'media')



# CORS settings
CORS_ALLOW_CREDENTIALS = True

# CORS_ALLOW_ALL_ORIGINS: True

CORS_ALLOWED_ORIGINS = [
    "http://localhost:3000",
    "http://0.0.0.0:3000",  
    "http://frontend:3000",  
    "http://backend:8000",    
    "http://0.0.0.0:8000",
    "http://localhost:8000",
]

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
# Trusting localhost for development purposes.
# You'll add your production frontend domain when you have it.
CSRF_TRUSTED_ORIGINS = [
    "http://localhost:3000",
    "http://0.0.0.0:3000",  
    "http://frontend:3000",  
    "http://backend:8000",    
    "http://0.0.0.0:8000",
    "http://localhost:8000",
]

# As you're in development mode, these are set to False.
# They should be True in a production setting.
CSRF_COOKIE_SECURE = False
CSRF_COOKIE_HTTPONLY = False
CSRF_COOKIE_SAMESITE = 'Lax'

# Session settings for development
SESSION_COOKIE_SECURE = False
SESSION_COOKIE_HTTPONLY = True
SESSION_COOKIE_SAMESITE = 'Lax'

# Email

EMAIL_BACKEND = 'django.core.mail.backends.smtp.EmailBackend'
EMAIL_HOST = 'localhost'
EMAIL_HOST_USER = ''
EMAIL_HOST_PASSWORD = ''
EMAIL_PORT = 2525
DEFAULT_FROM_EMAIL = 'from@claudron.com'



DJOSER = {

    'PASSWORD_RESET_CONFIRM_URL': 'password/reset/confirm/{uid}/{token}',
    'PASSWORD_RESET_CONFIRM_RETYPE': True,
    'ACTIVATION_URL': 'activate/{uid}/{token}',
    'SEND_ACTIVATION_EMAIL': True,
    'SERIALIZERS': {
        'user_create': 'core.serializers.UserCreateSerializer',
        'current_user': 'core.serializers.UserSerializer',

    },
    'EMAIL': {
        'activation': 'core.views.CustomActivationEmail',
        'password_reset': 'core.views.CustomPasswordResetEmail',
    },
}