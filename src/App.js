import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Recipe from './components/Recipe';
import Navigation from './components/Navigation';
import RecipeForm from './components/RecipeForm';
import chickenImg from './assets/chicken.jpg'
import muttonImg from './assets/mutton.jpg'
import fishImg from './assets/fish.jpg'
import './App.scss'
const recipeData = [
	{
		name: "Chicken Curry",
    description: "Heat the oil in a large saucepan over a medium heat and cook the spring onions and garlic for a few minutes. Add the tomatoes, curry powder and ground ginger and cook for 3-4 minutes. If the pan gets dry add a splash of water and make sure the spices don't burn. Add the chicken and cook for 5 minutes.",
    method: "Heat 1/2 cup of the broth in a pot until simmering, add saffron and set aside for 10 minutes.Heat oil in a (14- to 16-inch) paella pan or a large, deep skillet over medium-high heat. Add chicken, shrimp and chorizo, and cook, stirring occasionally until lightly browned, 6 to 8 minutes. Transfer shrimp to a large plate and set aside, leaving chicken and chorizo in the pan. Add pimentón, bay leaves, garlic, tomatoes, onion, salt and pepper, and cook, stirring often until thickened and fragrant, about 10 minutes. Add saffron broth and remaining 4 1/2 cups chicken broth; bring to a boil.",
    author: "Matt F",
    id: 'chicken',
    img: chickenImg
	},
  {
  	name: "Mutton Curry",
    description: "One way to make mutton tender is to cook it slow. As per Chef Amit, braising or slow cooking the mutton for more than 3 hours on low temperature helps soften it. This method is followed in European style of cooking. Tough fibers, collagens and connective tissues will eventually break down, making it softer.",
    method: "Heat 1/2 cup of the broth in a pot until simmering, add saffron and set aside for 10 minutes.Heat oil in a (14- to 16-inch) paella pan or a large, deep skillet over medium-high heat. Add chicken, shrimp and chorizo, and cook, stirring occasionally until lightly browned, 6 to 8 minutes. Transfer shrimp to a large plate and set aside, leaving chicken and chorizo in the pan. Add pimentón, bay leaves, garlic, tomatoes, onion, salt and pepper, and cook, stirring often until thickened and fragrant, about 10 minutes. Add saffron broth and remaining 4 1/2 cups chicken broth; bring to a boil.",
    author: "Bill",
    id: 'mutton',
    img: muttonImg
  },
  {
  	name: "Fish Curry",
    description: "One way to make mutton tender is to cook it slow. As per Chef Amit, braising or slow cooking the mutton for more than 3 hours on low temperature helps soften it. This method is followed in European style of cooking. Tough fibers, collagens and connective tissues will eventually break down, making it softer.",
    method: "Heat 1/2 cup of the broth in a pot until simmering, add saffron and set aside for 10 minutes.Heat oil in a (14- to 16-inch) paella pan or a large, deep skillet over medium-high heat. Add chicken, shrimp and chorizo, and cook, stirring occasionally until lightly browned, 6 to 8 minutes. Transfer shrimp to a large plate and set aside, leaving chicken and chorizo in the pan. Add pimentón, bay leaves, garlic, tomatoes, onion, salt and pepper, and cook, stirring often until thickened and fragrant, about 10 minutes. Add saffron broth and remaining 4 1/2 cups chicken broth; bring to a boil.",
    author: "Joan",
    id: 'fish',
    img: fishImg
  }
];
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  appBar:{
    backgroundColor: 'red'
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  containerStyle: {
    paddingTop: 80
  },
  recipeList: {
    backgroundColor: '#efefef'
  },
  recipeDetails: {
    backgroundColor: 'whitesmoke'
  },
}));
const App = () => {
  const classes = useStyles();
  const [recipes, setRecipes] = useState('');
  const [selectedRecipe, setSelectedRecipe] = useState('chicken');
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  useState(() => {
    setRecipes(recipeData);
    setSelectedRecipe('chicken')
  });

  const selectNewRecipe = (recipeId) => {
    
      if(recipeId) {
        setSelectedRecipe(recipeId)
      }
  }
  let recipeToSelect;
  const filteredRecipes = Object.keys(recipes).filter((recipeKey) => recipes[recipeKey].id === selectedRecipe);  
   console.log(recipes[filteredRecipes]) 
  recipeToSelect = recipes[filteredRecipes];
  return (
    <div className="App">
    <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            Recipe Book
          </Typography>
          <Button color="inherit" onClick={handleClickOpen}>Add Recipe</Button>
        </Toolbar>
      </AppBar>
      <Container>
        <Grid container spacing={4} className={classes.containerStyle}>
          <Grid item xs={12} sm={3} className={classes.recipeList}>
            {  <Navigation 
              recipes={recipes}
              recipeToSelect={selectNewRecipe}
            />  }
          </Grid>
          <Grid item xs={12} sm={9} className={classes.recipeDetails}>
            { 
              recipeToSelect ? 
                <Recipe
                recipe={recipeToSelect}
                />
                :
                null
            }
          </Grid>
          <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
          <DialogTitle id="form-dialog-title">Add new recipe</DialogTitle>
          <DialogContent>
            <RecipeForm />
          </DialogContent>
        </Dialog>
        </Grid>
      </Container>
    </div>
  );
}
export default App;
