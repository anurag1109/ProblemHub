import * as React from "react";
import Dashboard from "../../components/pages/Dashboard";
import { useSearchInput } from "../../store/layout/hooks";
import {
  useProblem,
  useProblemTypes,
  useSearch,
} from "../../store/problem/hooks";

const ConnectedDashboard = () => {
  const [problems, getProblems] = useProblem();
  const [problemTypes, getProblemTypes] = useProblemTypes();
  const [onSearch] = useSearch();
  const [search] = useSearchInput();
  React.useEffect(() => {
    if (!search.search) {
      getProblems();
    } else {
      onSearch(search)
    }
    if (problemTypes.length === 0) {
      getProblemTypes();
    }
  }, []);
  return (
    <>
      <Dashboard
        problems={problems}
        title="All Problems"
        getProblems={getProblems}
        onSearch={onSearch}
      />
    </>
  );
};
export default ConnectedDashboard;
