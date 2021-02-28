export interface Trail {
    lat: number;
    lon: number;
    ele: number;
}

export interface TrailData {
    name: string;
    desc: string;
    trail: Trail[];
}