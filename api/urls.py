from django.urls import include, path
from rest_framework import routers
from . import views


router = routers.DefaultRouter()
router.register(r"boards", views.BoardViewSet)
router.register(r"lanes", views.LanesViewSet)
router.register(r"cards", views.CardsViewSet)


urlpatterns = [
    path("", include(router.urls)),
    path("api-auth/", include("rest_framework.urls", namespace="rest_framework")),
]
