import re

def is_valid_email(email):
    regex = r'^\b[A-Za-z0-9.-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{8,}\b'
    return re.match(regex, email)

def is_valid_name(name):
    regex = r'^[а-яА-Яa-zA-Z]{1,20}$'
    return re.match(regex, name)