import * as React from 'react';
import Category from '../../../components/pages/superadmin/Category';
import {  useProblemTypes } from '../../../store/problem/hooks';

const ConnectedCategory = () => {  
  const [category,getCategory]=useProblemTypes();
  React.useEffect(()=>{
    getCategory();
  },[])
  return (
    <>
      <Category category={category}/>
    </>
  );
};
export default ConnectedCategory;
