from django.contrib import admin
from django.urls import path,include
from django.conf import settings
from django.conf.urls.static import static
from django.contrib.staticfiles.urls import staticfiles_urlpatterns
from . import views


urlpatterns = [
    path('current', views.current,name='current'),
    # path('future', views.future,name='future'),
    # path('sentiments', views.sentiments,name='sentiments'),
    path('login', views.index, name="test"),
    path('', views.home, name="home"),
    path('register', views.register, name="register"),
]
