import React, { useState, useEffect } from 'react';
import firebase from "firebase";
import { makeStyles } from '@material-ui/core/styles';
import { css } from 'emotion';
import Typography from '@material-ui/core/Typography';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';

const useStyles = makeStyles((theme) => ({
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
}));


const Recipe = (props) => {
  const [recipeDetails, setRecipeDetails] = useState([]);
  
  let url = props.match.params.id ? props.match.params.id : "Qjx7T7nntyf1RZOL1L0J";
  useEffect(() => {
    const fetchData = async () => {
      const db = firebase.firestore();
      const data = await db.collection("recipeData").get();
      setRecipeDetails(data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id
      })));
    };
    fetchData();
  }, []);
  const recipes = recipeDetails.slice();
  let recipeToSelect;
  const filteredRecipes = Object.keys(recipes).filter(
    (recipeKey) => recipes[recipeKey].id === url
  );
  recipeToSelect = recipes[filteredRecipes];
    const [expanded, setExpanded] = useState(false);
    const classes = useStyles();
    const handleExpandClick = () => {
      setExpanded(!expanded);
    };
  return (
      <div className="Recipe">
          <Card>
          <CardHeader
            avatar={
              <Avatar aria-label="recipe" className={css`
              background-color:red!important;`}
              >
                RB
              </Avatar>
            }
            action={
              <IconButton aria-label="settings">
                <MoreVertIcon />
              </IconButton>
            }
            title={recipeToSelect && recipeToSelect.name}
            subheader="May 17, 2020"
          />
          <CardMedia
            className={css`
              height: 0px;
              padding-top: 56.25%;`}
            image={recipeToSelect && recipeToSelect.img}
            title={recipeToSelect && recipeToSelect.name}
          />
          <CardContent>
            <Typography variant="body2" component="p" className={css`
              margin-bottom:30px;`}
            >
                  Author: {recipeToSelect && recipeToSelect.author}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
            {recipeToSelect && recipeToSelect.description} ...
            </Typography>
          </CardContent>
          <CardActions disableSpacing>
            <IconButton aria-label="add to favorites">
              <FavoriteIcon />
            </IconButton>
            <IconButton aria-label="share">
              <ShareIcon />
            </IconButton>
            <IconButton
              className={clsx(classes.expand, {
                [classes.expandOpen]: expanded,
              })}
              onClick={handleExpandClick}
              aria-expanded={expanded}
              aria-label="show more"
            >
              <ExpandMoreIcon />
            </IconButton>
          </CardActions>
          <Collapse in={expanded} timeout="auto" unmountOnExit>
            <CardContent>
              <Typography paragraph>Method:</Typography>
              <Typography paragraph>
                {recipeToSelect && recipeToSelect.method}
              </Typography>
            </CardContent>
          </Collapse>
        </Card>
      </div>
    );
}
export default Recipe;
