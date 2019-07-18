export interface responseLastTrip {
    code: number;
    data: Data;
    message: string;
    object: string;
    request: number;
    status: string;
    url: string;
  }
  
  export interface Data {
    avg_drive_speed: number;
    battery_level?: any;
    car_id: number;
    company_id?: any;
    covered_kms?: any;
    created_at: string;
    distance: number;
    end_kms?: any;
    end_trip: Endtrip;
    engine_temperature?: any;
    finished_at: string;
    fuel_level?: any;
    fuel_liters?: any;
    fuel_used: number;
    grade: number;
    id: number;
    idling_time: number;
    imei: number;
    init_trip: Inittrip;
    json_file_key: string;
    max_speed: number;
    odometer?: any;
    policy_insurance_id?: any;
    samples_taken: number;
    start_kms?: any;
    started_at: string;
    tire_pressure?: any;
    uncovered_kms?: any;
    updated_at?: any;
  }
  
  export interface Endtrip {
    latitude: number;
    longitude: number;
    street?: any;
  }
  
  export interface Inittrip {
    latitude: number;
    longitude: number;
    street?: any;
  }