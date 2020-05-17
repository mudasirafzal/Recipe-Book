import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
const useStyles = makeStyles((theme) => ({
    submitButton: {
      marginTop: 20,
      marginBottom: 20
    },
  }));
const RecipeForm = () => {
    const classes = useStyles();
    return ( 
    <form noValidate autoComplete="off">
      <TextField id="standard-basic" label="Recipe Name" fullWidth />
      <TextField id="standard-basic" label="Author" fullWidth/>
      <TextField id="standard-basic" label="Recipe Details" fullWidth/>
      <TextField id="standard-basic" label="Recipe Method" fullWidth/>
      <Button className={classes.submitButton} variant="contained" color="secondary">
        Add Recipe
      </Button>
    </form>
     );
}
 
export default RecipeForm;