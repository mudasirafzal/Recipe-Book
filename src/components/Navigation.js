import React from 'react';
import { css } from 'emotion'
const Navigation = ({ recipes }) => {
  return (
    <div className="Navigation">
      <nav>
        <ul>
          {
            recipes.map((recipe) => 
              <li className="links">
                <a className={
                  css`color:#000;
                  text-decoration:none;
                  cursor:pointer;
                  :hover{
                    color:red;
                  }
                  `}
                  href={"/" + recipe.id} key={recipe.id}>{recipe.name}</a>
              </li>
            ) 
          }
        </ul>
      </nav>
    </div>
  );
}
export default Navigation;
