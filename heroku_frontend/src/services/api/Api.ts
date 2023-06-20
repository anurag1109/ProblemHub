import { call, select } from 'redux-saga/effects';
import axios, {AxiosRequestConfig, AxiosResponse } from 'axios';

export enum Method {
    GET = 'GET',
    POST = 'POST',
    PUT = 'PUT',
    DELETE = 'DELETE',
  }
  export type HTTPMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';

export function* request(options:AxiosRequestConfig){
    const res:AxiosResponse=yield call(requestApi,options);
    return res;
}
export const requestApi=async (options:AxiosRequestConfig)=>{
   try{
      const REACT_APP_BASE_URL=process.env.REACT_APP_BASE_URL;
      const configOption={
        ...options
      }
      configOption.url=`${REACT_APP_BASE_URL}${options.url}`;
      const response= await axios(configOption);
      return response;
   }catch(err: any){
      if(err && err.response){
       throw err.response
      }else{
        throw err
      }
   }
}

export function* callApi(options:AxiosRequestConfig){
     const {User}=yield select();
     const REACT_APP_BASE_URL=process.env.REACT_APP_BASE_URL;
     const axiosConfig={
       ...options,
       headers:{
         ...options.headers,
         Authorization:`Bearer ${User.access_token}`,
         Accept:'application/json',
       }
     }
     axiosConfig.url=`${REACT_APP_BASE_URL}${options.url}`
     const res:AxiosResponse=yield call(requestCallApi,axiosConfig);
     return res;
}
export const requestCallApi= async (options:AxiosRequestConfig)=>{
   try{
      const res=await axios(options);
      return res
   }catch(err: any){
    if(err && err.response){
      const {data}=err.response;
      throw data
    }else{
      throw err
    }
 }
}


export interface ApiHeaderOpts {
  readonly etag?: string;
  readonly archivable?: boolean;
  readonly deletable?: boolean;
}
export interface ApiResponse<T = any> extends ApiHeaderOpts {
  readonly data: T;
}