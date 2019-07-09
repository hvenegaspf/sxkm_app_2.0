export interface responseListTrips {
    code: number;
    data: Data;
    message: string;
    object: string;
    request: number;
    status: string;
    url: string;
  }
  
  export interface Data {
    total: number;
    trips: Trip[];
  }
  
  export interface Trip {
    avg_drive_speed: number;
    battery_level?: any;
    car_id: number;
    covered_kms?: any;
    distance: number;
    end_kms?: any;
    end_trip?: Endtrip;
    engine_temperature?: any;
    finished_at: string;
    fuel_liters?: any;
    fuel_used: number;
    grade: number;
    id: number;
    idling_time: number;
    imei: number;
    init_trip?: Endtrip;
    max_speed: number;
    odometer?: any;
    start_kms?: any;
    started_at: string;
    tire_pressure?: any;
    uncovered_kms?: any;
  }
  
  export interface Endtrip {
    latitude: number;
    longitude: number;
    street?: any;
  }