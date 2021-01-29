from bs4 import BeautifulSoup
from tools import find_plans
from pathlib import Path
import os
import re


def read_distance(soup):
    frame = soup.find_all('p')[2].find('b')
    matches = re.match(".+ nm", frame.text)
    return matches.string


def read_waypoint_from_html(soup):
    result = []
    rows = soup.findChildren('table')[0].findChildren(['th', 'tr'])
    for row in rows:
        cells = row.findChildren('td')
        if cells:
            value = {
                "ident": cells[1].text,
                "region": cells[2].text,
                "procedure": cells[4].text,
                "airway": cells[5].text,
                "restrictKt": cells[6].text,
                "type": cells[7].text,
                "freq": cells[8].text,
                "distance": cells[12].text,
                "wind": cells[18].text,
                "alt": cells[20].text,
                "remark": cells[21].text
            }
            result.append(value)
    return result
