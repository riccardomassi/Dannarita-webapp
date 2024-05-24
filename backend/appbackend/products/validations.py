from .models import CustomUser

"""
Check if the given username already exists in the CustomUser model.

Args:
    data: containing the data to be validated.

Returns:
    bool: True if the username does not exist, False otherwise.
"""
def custom_validation(data):
    if CustomUser.objects.filter(username=data['username']).exists():
        return False
    return True