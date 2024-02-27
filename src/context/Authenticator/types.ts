export type ErrCallbackType = (err: { [key: string]: string }) => void

export type UserRoleType = {
  id: number;
  name: string;
  description: string;
  type: string;
  createdAt: string;
  updatedAt: string;
};

export type LocationProviderType = {
  id: number;
  uuid: string;
  name: string;
  description: string;
  website_url: string;
  legal_name: string;
  phone: string;
  email: string;
  host: string;
  createdAt: string;
  updatedAt: string;
};

export type UserLocationType = {
  id: number;
  uuid: string;
  name: string;
  address: string;
  phone: string;
  provider: LocationProviderType;
  createdAt: string;
  updatedAt: string;
};

export type UserPhysicianType = {
  id: number;
  uuid: string;
  professional_id: string;
  createdAt: string;
  updatedAt: string;
};

export type UserNurseType = {
  id: number;
  createdAt: string;
  updatedAt: string;
};

export type UserDataType = {
  id: number
  role: UserRoleType
  email: string
  username: string
  provider: string
  confirmed: boolean
  blocked: boolean
  location: UserLocationType
  physician: UserPhysicianType | null
  nurse: UserNurseType | null
  token: string
  createdAt: string
  updatedAt: string
}

export type AuthValuesType = {
  loading: boolean
  logout: () => void
  user: UserDataType | null
  setLoading: (value: boolean) => void
  setUser: (value: UserDataType | null) => void
  login: (username: string, password: string, rememberMe?: boolean) => void
}
