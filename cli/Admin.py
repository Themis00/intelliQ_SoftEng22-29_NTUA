import argparse
import requests
import sys
import json
from pathlib import Path

def healthcheck(ar):
    #print(ar)
    headers = {'x-observatory-auth' : ar.apikey}
    res = requests.get('baseURL/admin/healthcheck', headers=headers, verify=False)
    print(res.status_code)
    print(res.json())
    return True

