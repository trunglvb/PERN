import { ICommuneResponse, IDistrictResponse, IProvinceResponse } from '@/types/search.type';
import http from '@/utils/http';

const baseUrl = import.meta.env.VITE_PROVINCE_OPEN_API;

export const getAllProvince = () => http.get<IProvinceResponse[]>(`${baseUrl}/province`);

export const getDistrictFromProvince = (idProvince: string) =>
  http.get<IDistrictResponse[]>(`${baseUrl}/district/?idProvince=${idProvince}`);

export const getCommuneFromDistrict = (idDistrict: string) =>
  http.get<ICommuneResponse[]>(`${baseUrl}/commune/?idDistrict=${idDistrict}`);

const provinceApi = { getAllProvince, getDistrictFromProvince, getCommuneFromDistrict };
export default provinceApi;
