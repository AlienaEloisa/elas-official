"""
Django settings for server project.

Generated by 'django-admin startproject' using Django 4.1.7.

For more information on this file, see
https://docs.djangoproject.com/en/4.1/topics/settings/

For the full list of settings and their values, see
https://docs.djangoproject.com/en/4.1/ref/settings/
"""

from datetime import timedelta
from django.core.management.utils import get_random_secret_key
from pathlib import Path
import mimetypes
import os
import atexit
import socket
from py_eureka_client import eureka_client
from django.core.management.commands.runserver import Command as runserver
from dotenv import load_dotenv
import json

load_dotenv()


mimetypes.add_type("application/javascript", ".js", True)
runserver.default_port = os.environ.get("DJANGO_PORT", "8002")  # default port is 8001

# Build paths inside the project like this: BASE_DIR / 'subdir'.
PROJECT_ROOT = os.path.normpath(os.path.dirname(__file__))
BASE_DIR = Path(__file__).resolve().parent.parent

# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/4.1/howto/deployment/checklist/

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = os.getenv("DJANGO_SECRET_KEY", get_random_secret_key())

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = True

ALLOWED_HOSTS = []

EUREKA_HOST_NAME = os.environ.get("EUREKA_HOST_NAME")
EUREKA_PORT = os.environ.get("EUREKA_PORT")
EUREKA_HOST = f"http://{EUREKA_HOST_NAME}:{EUREKA_PORT}/eureka"
try:
    eureka_client.init(
        eureka_server=EUREKA_HOST,  # type: ignore
        app_name="ELAS-AUTH",
        instance_port=int(os.environ.get("DJANGO_PORT", "8002")),
        instance_ip=socket.gethostbyname(EUREKA_HOST_NAME),  # type: ignore
        instance_host=EUREKA_HOST_NAME,  # type: ignore
    )
    print("==========================================")
    print("* Eureka client initialized successfully *")
    print("==========================================")
except socket.herror as e:
    print(f"Failed to initialize Eureka client: {e}")

atexit.register(eureka_client.stop)

# Application definition

INSTALLED_APPS = [
    "django.contrib.admin",
    "django.contrib.auth",
    "django.contrib.contenttypes",
    "django.contrib.sessions",
    "django.contrib.messages",
    "django.contrib.staticfiles",
    "rest_framework",
    "rest_framework.authtoken",
    "rest_framework_simplejwt.token_blacklist",
    "django_celery_results",
    "account",
]

REST_FRAMEWORK = {
    "DEFAULT_AUTHENTICATION_CLASSES": (
        "rest_framework_simplejwt.authentication.JWTAuthentication",
    ),
    "DEFAULT_PERMISSION_CLASSES": ("rest_framework.permissions.IsAuthenticated",),
}


DEBUG_TOOLBAR_CONFIG = {
    "INTERCEPT_REDIRECTS": False,
}

MIDDLEWARE = [
    "django.middleware.security.SecurityMiddleware",
    "django.contrib.sessions.middleware.SessionMiddleware",
    "django.middleware.common.CommonMiddleware",
    "django.middleware.csrf.CsrfViewMiddleware",
    "django.contrib.auth.middleware.AuthenticationMiddleware",
    "django.contrib.messages.middleware.MessageMiddleware",
    "django.middleware.clickjacking.XFrameOptionsMiddleware",
]

INTERNAL_IPS = ["127.0.0.1"]

ROOT_URLCONF = "server.urls"

TEMPLATES = [
    {
        "BACKEND": "django.template.backends.django.DjangoTemplates",
        "DIRS": [],
        "APP_DIRS": True,
        "OPTIONS": {
            "context_processors": [
                "django.template.context_processors.debug",
                "django.template.context_processors.request",
                "django.contrib.auth.context_processors.auth",
                "django.contrib.messages.context_processors.messages",
            ],
        },
    },
]

WSGI_APPLICATION = "server.wsgi.application"


# Database
# https://docs.djangoproject.com/en/4.1/ref/settings/#databases

if bool(os.environ.get("POSTGRES_HOST", False)):
    DATABASES = {
        "default": {
            "ENGINE": "django.db.backends.postgresql",
            "NAME": os.environ.get("POSTGRES_DB"),
            "USER": os.environ.get("POSTGRES_USER"),
            "PASSWORD": os.environ.get("POSTGRES_PASSWORD"),
            "HOST": os.environ.get("POSTGRES_HOST"),
            "PORT": os.environ.get("POSTGRES_PORT", 5432),
            "OPTIONS": json.loads(os.getenv("POSTGRES_OPTIONS", "{}")),
        }
    }
else:
    DATABASES = {
        "default": {
            "ENGINE": "django.db.backends.sqlite3",
            "NAME": str(os.path.join(BASE_DIR, "db.sqlite3")),
        }
    }

# Password validation
# https://docs.djangoproject.com/en/4.1/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
    {
        "NAME": "django.contrib.auth.password_validation.UserAttributeSimilarityValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation.MinimumLengthValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation.CommonPasswordValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation.NumericPasswordValidator",
    },
]


# Internationalization
# https://docs.djangoproject.com/en/4.1/topics/i18n/

LANGUAGE_CODE = "en-us"
TIME_ZONE = "UTC"
USE_I18N = True
USE_TZ = True

# Celery settings
REDIS_HOST = os.environ.get("REDIS_HOST", "127.0.0.1")
CELERY_BROKER_URL = "redis://{}:6379/0".format(REDIS_HOST)
result_backend = "redis://{}:6379/0".format(REDIS_HOST)
accept_content = ["application/json"]
task_serializer = "json"
result_serializer = "json"
timezone = TIME_ZONE
# CELERYD_TASK_SOFT_TIME_LIMIT = 60 * 60  # 1 hour timeout

# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/4.1/howto/static-files/
STATIC_ROOT = os.path.join(PROJECT_ROOT, "static")
STATIC_URL = "/static/"

# Default primary key field type
# https://docs.djangoproject.com/en/4.1/ref/settings/#default-auto-field

DEFAULT_AUTO_FIELD = "django.db.models.BigAutoField"

SIMPLE_JWT = {
    "ACCESS_TOKEN_LIFETIME": timedelta(days=1),
    "REFRESH_TOKEN_LIFETIME": timedelta(days=1),
}

AUTH_USER_MODEL = "account.User"
