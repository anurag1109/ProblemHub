import { useEffect } from "react";
import AddProblem from "../../components/pages/AddProblem";
// import { useProblemTypes } from "../../store/problem/hooks";

const ConnectedAddProblem = () => {
  // const [,getProblemTypes]=useProblemTypes();
  useEffect(() => {
    // getProblemTypes()
  }, [])
  return (
    <>
      <AddProblem />
    </>
  );
};
export default ConnectedAddProblem;
