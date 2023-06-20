declare interface Problem{
    readonly _id?:string;
    // readonly user_id?:string;
    readonly title:string;
    readonly question?:string;
    readonly answer?:string;
    readonly type_id?:string;
    readonly createdAt?:date;
    readonly updatedAt?:date;
    readonly user_id?:{
        readonly _id:string;
        readonly firstName:staring;
        readonly lastName?:string;
    }
}

declare interface ProblemType{
    readonly _id:string;
    readonly title:string;
    readonly value:string;
    readonly picture?:string;
}
declare interface CreateCategoryPyload{
    readonly title?:string;
    readonly value?:string;
    readonly file?:File;
}
