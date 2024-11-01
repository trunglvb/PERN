import http from '@/utils/http';

interface IProvinceResponse {
  name: string;
  idProvince: string;
}

export const getAllProvince = () =>
  http.get<IProvinceResponse[]>('https://vietnam-administrative-division-json-server-swart.vercel.app/province');
