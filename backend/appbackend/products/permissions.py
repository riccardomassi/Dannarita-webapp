from rest_framework.permissions import BasePermission

class IsSuperUser(BasePermission):
  def has_permission(self, request, view):
    # Controlla se l'utente è anche un superuser
    return request.user.is_superuser
