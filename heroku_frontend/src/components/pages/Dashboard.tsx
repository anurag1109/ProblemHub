import { Divider, Grid, IconButton, Tooltip, Typography } from "@material-ui/core";
import * as React from "react";
import MainTemplate from "../template/MainTemplate";
import { makeStyles, createStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import { useNavigate } from "react-router-dom";
import RouteService from "../../services/route.services";
import Pagination from "@material-ui/lab/Pagination";
import { useLoading, useSearchInput } from "../../store/layout/hooks";
import Skeleton from "@material-ui/lab/Skeleton";
import moment from "moment";
import InfoOutlinedIcon from "@material-ui/icons/InfoOutlined";
import Sort from "../sort/Sort";
import { getHighlightedText } from "../highlight/Highlight";

const useStyles = makeStyles((theme) =>
  createStyles({
    row: {
      display: "grid",
      gridTemplateColumns: "3% 97%",
    },
    card: {
      paddingLeft: 15,
      paddingTop: 10,
      paddingBottom: 10,
      cursor: "pointer",
      transition: "transform .2s",
      "&:hover": {
        transform: "scale(1.007)",
        background: theme.palette.action.hover,
      },
    },
    spaceTop: {
      marginTop: 20,
    },
    contentContatiner: {
      minHeight: "60vh",
      marginTop: 15,
    },
    text: {
      color: theme.palette.text.disabled,
      fontStyle: "italic",
    },
    center: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      width: "100%",
      height: "70vh",
    },
    row_line: {
      display: "flex",
      justifyContent: "space-between",
      paddingRight: 30,
      flexWrap: "wrap",
      alignItems: "center",
      width: "100%"
    },
    createText: {
      fontSize: 12,
    },
    titleFont: {
      fontWeight: 700
    }
  })
);

export interface DashboardProps {
  readonly problems: ReadonlyArray<Problem>;
  readonly title: string;
  readonly getProblems?: () => void;
  readonly onSearch?: (data: Search) => void;
  readonly showSorting?: boolean;
  readonly autoIsDisable?: boolean;
}

const dummy = ["", "", "", "", "", "", "", "", ""];
const Dashboard: React.FC<DashboardProps> = (props) => {
  const {
    problems,
    title,
    getProblems,
    onSearch,
    showSorting = true,
    autoIsDisable = false,
  } = props;

  const [isLoading] = useLoading();
  const [page, setPage] = React.useState<number>(1);
  const [searchBy] = useSearchInput();
  const classes = useStyles();
  const navigate = useNavigate();
  const handleClick = (data: Problem) => {
    navigate(RouteService.problem.build({ id: data._id || "" }));
  };
  const handlePage = (e: any, page: number) => {
    setPage(page);
  };
  const selectedProblems = React.useMemo(() => {
    return problems.slice((page - 1) * 10, page * 10);
  }, [page, problems]);
  const handleSorting = (data: SortBY) => {
    if (getProblems && !searchBy.search) {
      getProblems();
    } else {
      if (onSearch) {
        onSearch(searchBy);
      }
    }
  };
  const handleSearch = (data: Search) => {
    if (onSearch && !!data.search) {
      onSearch(data);
    }
  };
  const handleSearchChange = (data: any) => {
    if (!data && getProblems) {
      getProblems();
    }
  };
  const ToolTipText = (
    createdAt: string,
    updateAt: string,
    firstName: string,
    lastName?: string
  ) => {
    return (
      <>
        <Typography className={classes.createText}>
          Created At : {moment(createdAt).format("LLLL")}
        </Typography>
        <Typography className={classes.createText}>
          Updated At : {moment(updateAt).format("LLLL")}
        </Typography>
        <Typography className={classes.createText}>
          Created By :{" "}
          <b>
            {firstName} {lastName}
          </b>
        </Typography>
      </>
    );
  };
  const createMarkup = (data: string) => {
    return { __html: data };
  };
  return (
    <>
      <MainTemplate>
        <Typography variant="h5" align="center" gutterBottom>
          {title} ( {problems.length} )
        </Typography>
        {showSorting && (
          <Sort
            onSort={handleSorting}
            onSearch={handleSearch}
            onChange={handleSearchChange}
            autoIsDisable={autoIsDisable}
          />
        )}
        <div className={classes.contentContatiner}>
          <Grid container xs={12} spacing={1}>
            {!isLoading &&
              selectedProblems.map((ele: Problem, index) => {
                const { user_id } = ele;
                return (
                  <Grid
                    item
                    xs={12}
                    key={ele._id}
                    onClick={() => handleClick(ele)}
                  >
                    <Card className={classes.card}>
                      <Typography className={classes.row_line}>
                        <div style={{ width: "94%" }}>
                          <div>
                            <Typography
                            // variant="h6"
                            // className={classes.titleFont}
                            >
                              {getHighlightedText(ele.title, searchBy.search || "")}{" "}
                            </Typography>
                            {/* <Divider variant='fullWidth' /> */}
                          </div>
                          {/* <div
                            dangerouslySetInnerHTML={createMarkup(
                              ele?.question || ""
                            )}
                            className="ql-editor"
                            style={{ height: '100px', overflow: 'hidden' }}
                          ></div> */}
                        </div>
                        <div >
                          <Tooltip
                            title={ToolTipText(
                              ele.createdAt,
                              ele.updatedAt,
                              user_id && user_id.firstName,
                              user_id?.lastName
                            )}
                            arrow
                            placement="left"
                          >
                            <IconButton>
                              <InfoOutlinedIcon color="primary" />
                            </IconButton>
                          </Tooltip>
                        </div>
                      </Typography>
                    </Card>
                  </Grid>
                );
              })}
            {isLoading &&
              dummy.map((ele, index) => (
                <Grid item xs={12} key={index + "loading"}>
                  <Card className={classes.card}>
                    <Skeleton variant="text" />
                  </Card>
                </Grid>
              ))}
            {problems.length === 0 && !isLoading && (
              <div className={classes.center}>
                <Typography variant="h3" className={classes.text}>
                  No Data Avilable
                </Typography>
              </div>
            )}
          </Grid>
        </div>
        <Grid
          container
          xs={12}
          justifyContent="center"
          className={classes.spaceTop}
        >
          {problems.length > 0 && (
            <Grid item>
              <Pagination
                count={Math.ceil(problems.length / 10)}
                color="primary"
                onChange={handlePage}
              />
            </Grid>
          )}
        </Grid>
      </MainTemplate>
    </>
  );
};

export default Dashboard;
