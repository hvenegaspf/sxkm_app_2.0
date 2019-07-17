export interface responseUser {
    code: number;
    data: Data;
    message: string;
    request: number;
    status: string;
    url: string;
}

export interface Data {
    acl_role: Aclrole;
    avatar_img: string;
    birthdate: string;
    blocked: boolean;
    created_at: string;
    email: string;
    gender: string;
    id: number;
    lastname_one: string;
    lastname_two: string;
    name: string;
    nickname: string;
    nip?: any;
    updated_at?: any;
    years_old: number;
}

export interface Aclrole {
    active: boolean;
    company: Company;
    created_at: string;
    id: number;
    role_name: string;
    updated_at?: any;
}

export interface Company {
    config: Config;
    contact_last_name: string;
    contact_name: string;
    created_at: string;
    discount_to_bag: boolean;
    id: number;
    name: string;
    parent?: any;
    telephone: string;
    updated_at: string;
}

export interface Config {
    demo: string;
    test: string;
}