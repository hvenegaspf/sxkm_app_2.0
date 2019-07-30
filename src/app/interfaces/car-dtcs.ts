export interface responseCarDtcs {
    response: Response;
  }
  
 export interface Response {
    code: number;
    data: Data;
    message: string;
    object: string;
    request: number;
    status: string;
    url: string;
  }
  
 export interface Data {
    created_at: string;
    dtc_codes_detected: string[];
    dtc_count: number;
    fixed: number;
    id: number;
    updated_at?: any;
  }