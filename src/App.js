import React, { useState, useEffect } from "react";
import { Route, Switch } from "react-router-dom";
import firebase from "firebase";
import { css } from "emotion";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Recipe from "./components/Recipe";
import Navigation from "./components/Navigation";
import RecipeForm from "./components/RecipeForm";
import "./App.css";

const App = () => {
  const [recipeData, setRecipeData] = useState([]);
  const [open, setOpen] = React.useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const db = firebase.firestore();
      const data = await db.collection("recipeData").get();
      setRecipeData(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    fetchData();
  }, []);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <div className="App">
      <AppBar
        position="fixed"
        className={css`
          background-color: red !important;
        `}
      >
        <Toolbar>
          <IconButton
            edge="start"
            className={css`
              margin-right: theme.spacing(2);
            `}
            color="inherit"
            aria-label="menu"
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            className={css`
              flex-grow: 1;
            `}
          >
            Recipe Book
          </Typography>
          <Button color="inherit" onClick={handleClickOpen}>
            Add Recipe
          </Button>
        </Toolbar>
      </AppBar>
      <Container>
      <Grid container spacing={4} className={css`
          padding-top: 80px;`}
        >
        <Grid
          item
          xs={12}
          sm={3}
          className={css`
            background-color: "#efefef";
          `}
        >
          <Navigation recipes={recipeData}/>
      </Grid>
      <Grid
          item
          xs={12}
          sm={9}
          className={css`
            background-color: "#efefef";
          `}
        >
        <Switch>
          <Route exact path="/" component={Recipe} />
          <Route path="/:id" component={Recipe} />
        </Switch>
      </Grid>
      </Grid>
      </Container>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Add new recipe</DialogTitle>
          <DialogContent>
            <RecipeForm />
          </DialogContent>
        </Dialog>
    </div>
  );
};
export default App;
