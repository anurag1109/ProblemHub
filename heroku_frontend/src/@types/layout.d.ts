declare interface ERROR{
    readonly title:string;
    readonly error:any;
}
declare type MyTheme='light'|'dark'

declare type ThemeColor='green'|'red'|'pink'
|'purple'|'indigo'|'blue'|'teal'
|'cyan'|'lightBlue'|'lime'
|'orange'|'blueGray'

declare interface SortBY{
    readonly sort:string;
    readonly by:BY
}
declare type BY=1|-1;
declare interface BYType{
    readonly label:string;
    readonly value:BY;
}
declare interface Search{
    readonly search?:string;
    readonly id?:string;
    readonly type?:string;
    readonly autoSearchData?:AutoSearchUser;
}
declare interface SerarchBy{
    readonly label:string;
    readonly value:string;
}
declare interface AutoSearchUser{
    readonly _id:string;
    readonly username:string;
    readonly firstName:string;
    readonly lastName:string;
    readonly email:string;
}