import axios, { AxiosError, HttpStatusCode } from 'axios';
import { useNotification } from '../../contexts/NotificationContext.tsx';

export default function useHttp() {
  const { setNotificationStatus } = useNotification();

  async function get<T, V>(
    path: string,
    params: V | undefined = undefined
  ): Promise<T | undefined> {
    try {
      const apiClient = axios.create({
        baseURL: process.env.REACT_APP_BASE_REST_URL || 'vaylariski/rest',
      });
      const response = await apiClient.get<T>(path, {
        params: params ?? undefined,
      });
      if (
        typeof response?.data === 'undefined' ||
        response.status !== HttpStatusCode.Ok
      ) {
        console.error(`${path} [GET]: undefined`);
        setNotificationStatus({
          severity: 'error',
          message: 'Tiedon haku epäonnistui.',
          visible: true,
        });
        return undefined;
      }
      return response.data;
    } catch (err: any | AxiosError) {
      console.log(`${path} [GET]: `, err);
      setNotificationStatus({
        severity: 'error',
        message: err.message,
        visible: true,
      });
      return undefined;
    }
  }

  async function post<T, V>(path: string, data: V): Promise<T | undefined> {
    try {
      const apiClient = axios.create({
        baseURL: process.env.REACT_APP_BASE_REST_URL || 'vaylariski/rest',
      });
      const response = await apiClient.post<T>(path, data);
      if (
        typeof response?.data === 'undefined' ||
        response.status !== HttpStatusCode.Ok
      ) {
        console.error(`${path} [POST]: undefined`);
        setNotificationStatus({
          severity: 'error',
          message: 'Tiedon lähetys epäonnistui.',
          visible: true,
        });
        return undefined;
      }
      return response.data;
    } catch (err: any | AxiosError) {
      console.log(`${path} [POST]: `, err);
      setNotificationStatus({
        severity: 'error',
        message: err.message,
        visible: true,
      });
      return undefined;
    }
  }

  return { get, post };
}
