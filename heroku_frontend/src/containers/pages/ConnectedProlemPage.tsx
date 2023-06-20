import * as React from 'react'
import { useParams } from 'react-router-dom';
import ProlemPage from '../../components/pages/ProblemPage';
import { useProblemById } from '../../store/problem/hooks';

const ConnectedProblemPage = () => {
 const {id}=useParams();
 const [problem,getProblem]=useProblemById();

 React.useEffect(()=>{
   getProblem(id||"");
 },[])
  return (
    <>
      <ProlemPage problem={problem}/>
    </>
  );
};
export default ConnectedProblemPage;
