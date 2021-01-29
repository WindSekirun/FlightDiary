def read_plan(lnmpln_json):
    return lnmpln_json['LittleNavmap']['Flightplan']


def read_cruise(lnmpln_json):
    plan = read_plan(lnmpln_json)
    header = plan["Header"]
    return header["CruisingAlt"]


def read_plan_type(lnmpln_json):
    plan = read_plan(lnmpln_json)
    header = plan["Header"]
    return header["FlightplanType"]


def read_sid(lnmpln_json):
    plan = read_plan(lnmpln_json)
    sid = plan["Procedures"]["SID"]
    return {
        "name": sid["Name"],
        "runway": sid["Runway"]
    }


def read_approach(lnmpln_json):
    plan = read_plan(lnmpln_json)
    approach = plan["Procedures"]["Approach"]
    return {
        "name": approach["Name"],
        "arinc": approach["ARINC"],
        "runway": approach["Runway"],
        "type": approach["Type"],
        "transition": approach["Transition"],
    }


def read_waypoint(lnmpln_json):
    plan = read_plan(lnmpln_json)
    waypoints = plan["Waypoints"]["Waypoint"]
    result = {}
    for waypoint in waypoints:
        key = waypoint["Ident"]
        result[key] = {
            "lat": waypoint["Pos"]["@Lat"],
            "lon": waypoint["Pos"]["@Lon"],
            "name": waypoint.get("Name", "")
        }
    return result
