import React from 'react';
import { css } from 'emotion'

const Navigation = ({recipes, recipeToSelect}) => {
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
              <li className={css`
              @media (max-width: 768px) {
                padding:10px 0px;
              }`}
              >
                <h4 
                  id={recipe.id} 
                  key={recipe.id}
                  onClick={changeRecipe} 
                  className={css`
                   :hover{
                     color:red;
                   }`}
                >
                  {recipe.name}
                </h4>
              </li>
            ) : "Loading..."
          }
        </ul>
      </nav>
    </div>
  );
}
export default Navigation;
