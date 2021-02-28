def read_trail(gpx_json):
    result = []
    trk = gpx_json["gpx"]["trk"]
    trkpts = trk["trkseg"]["trkpt"]
    for trkpt in trkpts:
        result.append({
            "lat": trkpt["@lat"],
            "lon": trkpt["@lon"],
            "ele": trkpt["ele"],
            "time": trkpt["time"]
        })
    return {
        "name": trk["name"],
        "desc": trk["desc"],
        "trail": result
    }

