import React, { useState } from "react";
import "./styles.css";
import { Grid } from "@material-ui/core";
import { dateToString } from "./helpers";
import { Pagination } from "@material-ui/lab";
import { Select, MenuItem } from "@material-ui/core";
import { styled } from "@material-ui/core/styles";
import { spacing } from "@material-ui/system";

const Comments = ({ commentsList }) => {
  const [page, setPage] = useState(1);
  const [range, setRange] = useState(10);

  const SelectWithMargin = styled(Select)(spacing);
  const changeRangeSize = (value) => {
    setRange(value);
    setPage(1);
  };
  return (
    <div className="commentsWrapper">
      <div className="comments">
        {commentsList.slice((page - 1) * range, page * range).map((comment) => (
          <div
            key={comment.time ? comment.time : comment.id}
            className="comment"
          >
            <Grid container spacing={2}>
              <Grid item>
                <div
                  className="useIco"
                  style={{ backgroundColor: comment.icoColor }}
                ></div>
              </Grid>
              <Grid item xs zeroMinWidth>
                <Grid container wrap="nowrap" alignItems="center">
                  <p className="userName">{comment.name}</p>
                  {comment.time ? (
                    <p className="date">{dateToString(comment.time)}</p>
                  ) : null}
                </Grid>
                <Grid container justify="center" alignItems="center">
                  <p style={{ textAlign: "left" }}>{comment.body}</p>
                </Grid>
              </Grid>
            </Grid>
          </div>
        ))}
      </div>

      <div className="buttonsWrapper">
        <Pagination
          boundaryCount={1}
          count={Math.ceil(commentsList.length / range)}
          defaultPage={1}
          onChange={(event, page) => {
            setPage(page);
          }}
          size="medium"
          variant="outlined"
          shape="rounded"
        />

        <SelectWithMargin
          ml={1}
          value={range}
          variant="outlined"
          onChange={(e) => changeRangeSize(e.target.value)}
        >
          <MenuItem value={10}>10/page</MenuItem>
          <MenuItem value={20}>20/page</MenuItem>
          <MenuItem value={50}>50/page</MenuItem>
          <MenuItem value={100}>100/page</MenuItem>
        </SelectWithMargin>
      </div>
    </div>
  );
};

export default Comments;
