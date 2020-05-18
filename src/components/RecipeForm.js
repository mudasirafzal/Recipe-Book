import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import firebase from '../firebase';
const useStyles = makeStyles((theme) => ({
    submitButton: {
      marginTop: 20,
      marginBottom: 20
    },
  }));
const RecipeForm = () => {
  const classes = useStyles();
  const [rName, setrName] = useState('');
  const [rAuthor, setrAuthor] = useState('');
  const [rDetails, setrDetails] = useState('');
  const [rMethod, setrMethod] = useState('');
  const handleSubmit = (e) => {
    e.preventDefault();
    const db = firebase.firestore()
    const data = db.collection('recipeData').add({
      'name' : rName,
      'author' : rAuthor,
      'description' : rDetails,
      'method' : rMethod 
    });
    setrName('')
    setrAuthor('')
    setrDetails('')
    setrMethod('');
  }
  return ( 
  <form noValidate autoComplete="off" onSubmit={handleSubmit}>
    <TextField 
    id="standard-name" 
    label="Recipe Name" 
    value={rName}
    onChange={e => setrName(e.target.value)} fullWidth/>

    <TextField 
    id="standard-name" 
    label="Recipe Author" 
    value={rAuthor}
    onChange={e => setrAuthor(e.target.value)} fullWidth/>

    <TextField 
    id="standard-name" 
    label="Recipe Details" 
    value={rDetails}
    onChange={e => setrDetails(e.target.value)} fullWidth/>

    <TextField 
    id="standard-basic" 
    label="Recipe Method"
    value={rMethod}
    onChange={e => setrMethod(e.target.value)}
    multiline
    rows={8} 
    fullWidth/>

    <Button className={classes.submitButton} 
    variant="contained" 
    color="secondary"
    type="submit"
    >
      Add Recipe
    </Button>
  </form>
    );
}
 
export default RecipeForm;