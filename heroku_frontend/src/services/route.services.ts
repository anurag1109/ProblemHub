import _ from 'lodash';
interface RouteBuilderParams {
    readonly params?: object;
  }

export class RouteBuilder<T extends object>{
    constructor (private _path:string){}
    public getPath(){
        return this._path;
    }
   public build(opts:T&RouteBuilderParams){
       let path=this._path;
       let keys=Object.keys(opts);
       keys.forEach((ele:string)=>{
        path=path.replace(`:${ele}`,_.get(opts,ele));
       }) 
       return path
   }

}


export enum Routes{
    LOGIN='/login',
    DASHBOARD='/dashboard',
    SUPER_ADMIN='/super-admin'
}
const RouteService={
    login: new RouteBuilder('/login'),
    register:new RouteBuilder('/register'),
    varification:new RouteBuilder('/varification'),
    changePassword: new RouteBuilder('/change-password'),
    dashboard:new RouteBuilder(Routes.DASHBOARD),
    addProblem: new RouteBuilder('/add-problem'),
    myProblem:new RouteBuilder('/problems'),
    problem:new RouteBuilder<{id:string}>('/problem/:id'),
    problemTypes:new RouteBuilder('/category'),
    categoryItem:new RouteBuilder<{id:string}>('/category/:id'),
    test:new RouteBuilder<{id:number; ani:number}>('/test/:id/:ani'),
    superAdmin:{
        dashboard:new RouteBuilder(`${Routes.SUPER_ADMIN}/user`),
        users:new RouteBuilder(`${Routes.SUPER_ADMIN}/user`),
        category:new RouteBuilder(`${Routes.SUPER_ADMIN}/category`),
    }
}
export default RouteService;