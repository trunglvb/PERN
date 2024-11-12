import { LucideProps } from 'lucide-react';
import { ForwardRefExoticComponent, RefAttributes } from 'react';

export interface IProvinceResponse {
  name: string;
  idProvince: string;
}
export interface IDistrictResponse {
  name: string;
  idProvince: string;
  idDistrict: string;
}

export interface ICommuneResponse {
  name: string;
  idDistrict: string;
  idCommune: string;
}

export interface ISecondLevelSelectOptions {
  id: string;
  label: string;
  icon?: ForwardRefExoticComponent<Omit<LucideProps, 'ref'> & RefAttributes<SVGSVGElement>>;
  parentId?: string;
  children?: {
    id: string;
    parentId?: string;
    label: string;
  }[];
}
