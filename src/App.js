import "./styles.css";
import { useEffect, useState } from "react";
import Comments from "./Comments";
import { Button, TextField } from "@material-ui/core";
import { styled } from "@material-ui/core/styles";
import { spacing } from "@material-ui/system";
import loadJoke from "./jokeService";
import loadComments from "./commentsService";
import generateRandomColor from "./helpers";

export default function App() {
  const [joke, setJoke] = useState({});
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState("");
  const [name, setName] = useState("");

  useEffect(() => {
    loadJoke(setJoke);
    loadComments(setComments);
  }, []);

  const MarginButton = styled(Button)(spacing);

  const resetInputs = () => {
    setName("");
    setComment("");
  };

  const sendComment = () => {
    const copyComments = comments;
    copyComments.unshift({
      time: new Date(),
      body: comment,
      icoColor: generateRandomColor(),
      name
    });

    setComments(copyComments);
    resetInputs();
  };

  return (
    <div className="App">
      <div className="headerWrapper">
        <h1>Chuck Norris Joke</h1>
      </div>

      <div className="wrapper">
        <div className="jokeWrapper">
          <img src={joke.icon_url} alt="Chuck Norris" />
          <p>{joke.value}</p>
        </div>
        <label>
          <TextField
            placeholder="User Name"
            type="text"
            variant="outlined"
            size="small"
            style={{
              width: "100%",
              marginBottom: "1rem"
            }}
            onChange={(e) => {
              setName(e.target.value);
            }}
            value={name}
          />
        </label>
        <label>
          <TextField
            onChange={(e) => {
              setComment(e.target.value);
            }}
            size="small"
            placeholder="Comment"
            id="outlined-multiline-static"
            multiline
            value={comment}
            rows={4}
            variant="outlined"
            style={{
              width: "100%",
              marginBottom: "1rem"
            }}
          />
        </label>
        <div className="buttonsWrapper">
          <MarginButton
            mr={1}
            variant="contained"
            color="primary"
            size="small"
            onClick={sendComment}
          >
            send comment
          </MarginButton>

          <MarginButton
            mr={1}
            variant="contained"
            color="secondary"
            size="small"
            onClick={resetInputs}
          >
            reset inputs
          </MarginButton>

          <MarginButton
            mr={1}
            variant="contained"
            color="secondary"
            size="small"
            onClick={() => loadJoke(setJoke)}
          >
            reset joke
          </MarginButton>
        </div>
      </div>

      <Comments commentsList={comments} />
    </div>
  );
}
