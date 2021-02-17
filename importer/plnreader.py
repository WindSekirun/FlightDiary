def read_plan(lnmpln_json):
    return lnmpln_json['LittleNavmap']['Flightplan']


def read_aircraft(lnmpln_json):
    plan = read_plan(lnmpln_json)
    performance = plan["AircraftPerformance"]
    return performance["Name"]

def read_cruise(lnmpln_json):
    plan = read_plan(lnmpln_json)
    header = plan["Header"]
    return header["CruisingAlt"]


def read_plan_type(lnmpln_json):
    plan = read_plan(lnmpln_json)
    header = plan["Header"]
    return header["FlightplanType"]


def read_sim_data(lnmpln_json):
    plan = read_plan(lnmpln_json)
    if "SimData" in plan:
        simdata = plan["SimData"]
        return f'{simdata["#text"]} {simdata["@Cycle"]}'
    else:
        return ""


def read_nav_data(lnmpln_json):
    plan = read_plan(lnmpln_json)
    if "NavData" in plan:
        navdata = plan["NavData"]
        return f'{navdata["#text"]} {navdata["@Cycle"]}'
    else:
        return ""


def read_sid(lnmpln_json):
    plan = read_plan(lnmpln_json)
    if "Procedures" in plan and "SID" in plan["Procedures"]:
        sid = plan["Procedures"]["SID"]
        return {
            "name": sid["Name"],
            "runway": sid["Runway"]
        }
    else:
        null = None
        return null


def read_approach(lnmpln_json):
    plan = read_plan(lnmpln_json)
    if "Procedures" in plan and "Approach" in plan["Procedures"]:
        approach = plan["Procedures"]["Approach"]
        return {
            "name": approach["Name"],
            "arinc": approach["ARINC"],
            "runway": approach["Runway"],
            "type": approach["Type"],
            "transition": approach.get("Transition", ""),
        }
    else:
        null = None
        return null


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
