import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { css } from "emotion";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { app } from "../base";
import firebase from "firebase";
const useStyles = makeStyles((theme) => ({
  submitButton: {
    marginTop: 20,
    marginBottom: 20,
  },
}));

const RecipeForm = () => {
  const classes = useStyles();
  const [rName, setrName] = useState("");
  const [rAuthor, setrAuthor] = useState("");
  const [rDetails, setrDetails] = useState("");
  const [rMethod, setrMethod] = useState("");
  const [Filee, setFilee] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    let storageRef = app.storage().ref();
    let spaceRef = storageRef.child("images/" + Filee.name);
    const dataUrl = await spaceRef.getDownloadURL();
    const db = firebase.firestore();
    db.collection("recipeData").add({
      name: rName,
      author: rAuthor,
      description: rDetails,
      method: rMethod,
      img: dataUrl,
    });
    setrName("");
    setrAuthor("");
    setrDetails("");
    setrMethod("");
  };

  const fileSelectedHandler = (e) => {
    setFilee(e.target.files[0]);
    let bucket = "images";
    const file = e.target.files[0];
    const storageRef = app.storage().ref();
    const fileRef = storageRef.child(`${bucket}/${file.name}`);
    let uploadTask = fileRef.put(file);
    uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, () => {
      let downloadURL = uploadTask.snapshot.downloadURL;
    });
  };

  return (
    <form noValidate autoComplete="off" onSubmit={handleSubmit}>
      <TextField
        id="standard-name"
        label="Recipe Name"
        value={rName}
        onChange={(e) => setrName(e.target.value)}
        fullWidth
      />

      <TextField
        id="standard-name"
        label="Recipe Author"
        value={rAuthor}
        onChange={(e) => setrAuthor(e.target.value)}
        fullWidth
      />

      <TextField
        id="standard-name"
        label="Recipe Details"
        value={rDetails}
        onChange={(e) => setrDetails(e.target.value)}
        fullWidth
      />

      <TextField
        id="standard-basic"
        label="Recipe Method"
        value={rMethod}
        onChange={(e) => setrMethod(e.target.value)}
        multiline
        rows={8}
        fullWidth
      />
      <Button
        variant="contained"
        component="label"
        className={css`
          margin-right: 10px !important;
        `}
      >
        Upload Image
        <input
          className={classes.submitButton}
          type="file"
          style={{ display: "none" }}
          onChange={fileSelectedHandler}
        />
      </Button>

      <Button
        className={classes.submitButton}
        variant="contained"
        color="secondary"
        type="submit"
      >
        Add Recipe
      </Button>
    </form>
  );
};

export default RecipeForm;
