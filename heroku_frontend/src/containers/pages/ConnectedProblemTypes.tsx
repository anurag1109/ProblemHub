import ProblemTypes from "../../components/pages/ProblemTypes";
import { useProblemTypes } from "../../store/problem/hooks";

const ConnectedProblemTypes = () => {
  const [problemTypes]=useProblemTypes();
 
  return (
    <>
      <ProblemTypes problemTypes={problemTypes}/>
    </>
  );
};
export default ConnectedProblemTypes;
