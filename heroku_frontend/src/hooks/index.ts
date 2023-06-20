import * as React from 'react';

export function useTab():[number,(data:number)=>void]{
  const[tab,setTab]=React.useState<number>(0);
  return [tab,setTab]
}