from django.urls import include, path
from rest_framework import routers
from . import views


router = routers.DefaultRouter()
router.register(r"boards", views.BoardViewSet, basename="board")
router.register(r"lanes", views.LanesViewSet, basename="lane")
router.register(r"cards", views.CardsViewSet, basename="card")


urlpatterns = [
    path("api/", include(router.urls)),
    path("api-auth/", include("rest_framework.urls", namespace="rest_framework")),
]
