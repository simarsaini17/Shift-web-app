export interface CollegeDataType {
  name: string;
  alpha_two_code: string;
  country: string;
  web_pages: string[];
  domains: string[];
  "state-province": string;
  favourites: boolean;
}

export interface Column {
  key: string;
  label: string;
  align?: "start" | "center" | "end";
}

export type IconType = {
  height: number;
  width: number;
  color: string;
};
