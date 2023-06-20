import {
  FormControl,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@material-ui/core";
import { SearchOutlined } from "@material-ui/icons";
import * as React from "react";
import {
  useAutoSearch,
  useSearchInput,
  useSortBy,
} from "../../store/layout/hooks";
import { byList, searchList, sortList } from "../constant/sort";
import { makeStyles, createStyles } from "@material-ui/core/styles";
import { Autocomplete } from "@material-ui/lab";
import { useProblem } from "../../store/problem/hooks";
import _ from "lodash";
const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      // paddingRight: 69,
    },
    relative: {
      position: "relative",
    },
    search: {
      position: "absolute",
      borderRadius: "0px 4px 4px 0px",
      borderColor: "rgba(0, 0, 0, 0.23)",
      padding: "15px",
      border: "1px solid",
      right: "-56px",
      background: theme.palette.primary.main,
      color: theme.palette.common.white,
      "&:hover": {
        background: theme.palette.primary.light,
      },
    },
    input_search: {
      "& div": { borderRadius: "4px 0px 0px 4px" },
    },
  })
);
//problems/search?search=40&id=6208ba31b6027ec2b647b470&sort=type

export interface SortProps {
  readonly onSort?: (data: SortBY) => void;
  readonly onSearch?: (data: Search) => void;
  readonly onChange?: (data: string) => void;
  readonly autoIsDisable?: boolean;
}

const Sort: React.FC<SortProps> = (props) => {
  const classes = useStyles();
  const { onSort, onSearch, onChange, autoIsDisable } = props;
  const [sortBy, sortAction] = useSortBy();
  const [state, setState] = useSearchInput();
  const [userList, getAutoSearch, resetUserList] = useAutoSearch();
  const [, getProblems] = useProblem();

  const handleSort = (e: any) => {
    sortAction({ ...sortBy, sort: e.target.value });
    if (onSort) {
      onSort(sortBy);
    }
  };
  const handleBy = (e: any) => {
    sortAction({ ...sortBy, by: e.target.value });
    if (onSort) {
      onSort(sortBy);
    }
  };
  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (onSearch) {
      onSearch({ ...state });
    }
  };
  const handleChange = (e: any) => {
    setState({ ...state, search: e.target.value });
    if (onChange) {
      onChange(e.target.value);
    }
  };
  const handleSearchBy = (e: any) => {
    setState({ ...state, type: e.target.value });
    if (onSearch) {
      onSearch({ ...state, type: e.target.value });
    }
  };
  const fetchData = _.debounce((data: string) => getAutoSearch(data), 500);
  const handleAutoChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    if (!!e.target.value) {
      fetchData(e.target.value);
    } else {
      resetUserList();
    }
  };
  const autoSearch = (event: any, newValue: any) => {
    if (!newValue) {
      let { search, type, id } = state;
      setState({ search, id, type });
      resetUserList();
      getProblems();
    } else {
      getProblems(newValue._id);
      setState({ ...state, autoSearchData: newValue });
    }
  };
  const options: any = React.useMemo(() => {
    return userList;
  }, [userList]);
  return (
    <>
      <Grid
        container
        xs={12}
        justifyContent="space-between"
        className={classes.root}
        md={12}
        spacing={1}
      >
        <Grid container item xs={12} md={6} spacing={1} alignItems="center">
          <Grid item xs={12} md={5}>
            <FormControl variant="outlined" fullWidth color="primary">
              <InputLabel
                id="demo-simple-select-outlined-label"
                color="primary"
              >
                Sort By
              </InputLabel>
              <Select
                variant="outlined"
                label="Sort By"
                fullWidth
                value={sortBy.sort}
                onChange={handleSort}
                color="primary"
              >
                {sortList.map((ele) => (
                  <MenuItem key={ele.label} value={ele.value}>
                    {ele.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={3}>
            <FormControl variant="outlined" fullWidth>
              <InputLabel id="demo-simple-select-outlined-label">
                Order
              </InputLabel>
              <Select
                label="Order"
                fullWidth
                value={sortBy.by}
                onChange={handleBy}
              >
                {byList.map((ele) => (
                  <MenuItem key={ele.label} value={ele.value}>
                    {ele.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
        </Grid>
        <Grid container item xs={12} md={5} spacing={1}>
          <Grid item md={4} xs={12}>
            <FormControl variant="outlined" fullWidth color="primary">
              <InputLabel
                id="demo-simple-select-outlined-label"
                color="primary"
              >
                Search By
              </InputLabel>
              <Select
                variant="outlined"
                label="Search By"
                fullWidth
                value={state?.type}
                onChange={handleSearchBy}
                color="primary"
              >
                {searchList.map((ele) => (
                  <MenuItem key={ele.label} value={ele.value} 
                    disabled={ele.value==='user'?autoIsDisable:false}>
                      {ele.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item md={6} xs={9}>
            <FormControl
              variant="outlined"
              fullWidth
              className={classes.relative}
            >
              {state && state.type !== "user" ? (
                <TextField
                  variant="outlined"
                  label="Search"
                  className={classes.input_search}
                  value={state.search}
                  onChange={handleChange}
                />
              ) : (
                <Autocomplete
                  id="free-solo-demo"
                  disabled={autoIsDisable}
                  freeSolo
                  options={options}
                  onChange={autoSearch}
                  value={state.autoSearchData}
                  getOptionLabel={(option: AutoSearchUser) =>
                    option.firstName + " " + option.lastName
                  }
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Search"
                      variant="outlined"
                      onChange={handleAutoChange}
                      className={classes.input_search}
                    />
                  )}
                />
              )}
              <IconButton className={classes.search} onClick={handleSubmit}>
                <SearchOutlined />
              </IconButton>
            </FormControl>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};
export default Sort;
