import requests
import click
from pathlib import Path

@click_command()

def healthcheck():
    #print(ar)  
    res = requests.get('https://localhost:91003/intelliq_api/admin/healthcheck', verify=False)
    print(res.status_code)
    print(res.json())
    return True

