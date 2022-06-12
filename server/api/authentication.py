from oidc_auth.authentication import BearerTokenAuthentication
from oidc_auth.settings import api_settings
from requests import HTTPError
from rest_framework.exceptions import AuthenticationFailed
from django.contrib.auth import get_user_model


def get_or_create_user_by_id(request, id_token):
    User = get_user_model()
    username = id_token.get("sub")
    try:
        user = User.objects.get_by_natural_key(username)
    except User.DoesNotExist:
        user = User.objects.create(is_superuser=0, username=username, is_active=1)
    return user


class BearerTokenCreateIfUnauthenticated(BearerTokenAuthentication):
    def __init__(self):
        super()

    def authenticate(self, request):
        bearer_token = self.get_bearer_token(request)
        if bearer_token is None:
            return None

        try:
            userinfo = self.get_userinfo(bearer_token)
        except HTTPError:
            msg = _("Invalid Authorization header. Unable to verify bearer token")
            raise AuthenticationFailed(msg)

        user = api_settings.OIDC_RESOLVE_USER_FUNCTION(request, userinfo)
        return user, userinfo
