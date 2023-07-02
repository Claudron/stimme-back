import { useEffect } from 'react';
import useAuthStore from '../auth/useAuthStore';
import { axiosPrivate } from '../services/api-client';



const useAxiosPrivate = () => {
    const {refreshToken, accessToken} = useAuthStore();

    useEffect(() => {
      const requestIntercept = axiosPrivate.interceptors.request.use(
        config => {
          if(!config.headers['Authorization']) {
            config.headers['Authorization'] = `Bearer ${accessToken}`;
          }
          return config;
        }, (error) => Promise.reject(error)
      );

      const responseIntercept = axiosPrivate.interceptors.response.use(
        response => response, 
        async(error) => {
          const prevRequest = error?.config;
          if(error?.response?.status === 401 && !prevRequest?.sent) {
            prevRequest.sent = true;
            const newAccessToken = await refreshToken;
            prevRequest.headers['Authorizations'] = `Bearer ${newAccessToken}`;
            return axiosPrivate(prevRequest);
          }
          return Promise.reject(error);
        }
      );

      return () => {
        axiosPrivate.interceptors.request.eject(requestIntercept);
        axiosPrivate.interceptors.response.eject(responseIntercept);
      }
    }, [refreshToken])
    
    return axiosPrivate;
    
}

export default useAxiosPrivate
