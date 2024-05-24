from rest_framework.permissions import BasePermission

"""
Check if the user is a superuser.

Args:
  request: The request object.
  view: The view object.

Returns:
  bool: True if the user is a superuser, False otherwise.
"""
class IsSuperUser(BasePermission):
  def has_permission(self, request, view):
    return request.user.is_superuser
