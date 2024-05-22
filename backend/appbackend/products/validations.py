from .models import CustomUser

def custom_validation(data):
    if CustomUser.objects.filter(username=data['username']).exists():
        return False
    return True