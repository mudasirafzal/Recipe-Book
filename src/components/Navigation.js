import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  
}));

const Navigation = ({recipes, recipeToSelect}) => {
  const classes = useStyles();
  const changeRecipe = (e) => {
    const recipeId = e.target.id;
    recipeToSelect(recipeId);
  }
  return (
    <div className="Navigation">
      <nav>
        <ul>
          { recipes ? 
            recipes.map((recipe) => 
              <li>
                <h4 
                  id={recipe.id} 
                  key={recipe.id}
                  onClick={changeRecipe} 
                >
                  {recipe.name}
                </h4>
              </li>
            ) : ""
          }
        </ul>
      </nav>
    </div>
  );
}
export default Navigation;
