import React from 'react';
import Card, { CardActions, CardContent, CardMedia } from 'material-ui/Card';
import Grid from 'material-ui/Grid';
import Icon from 'material-ui/Icon';
import IconButton from 'material-ui/IconButton';
import AddShoppingCartIcon from 'material-ui-icons/AddShoppingCart';
import { withStyles } from 'material-ui/styles';
import Typography from 'material-ui/Typography';

const styles = {
  root: {
    marginTop: 50,
  },
  cardStyle: {
    padding: 10,
  },
  card: {
    maxWidth: 345,
  },
  media: {
    height: 200,
  },
};

const ProductGrid = ({ products, addToCart, classes }) => (
  <div>
    <Grid container spacing={24} className={classes.root}>
      {products.map(product => (
        <Grid item>
          <Card key={product._id} className={classes.cardStyle}>
            <CardMedia className={classes.media} image={product.picture} title={product.name} />
            <CardContent>
              <Typography type="headline" component="h2">
                {product.name}
              </Typography>
              <Typography component="subheading">R$ {product.price}</Typography>
            </CardContent>
            <CardActions>
              <IconButton
                color="primary"
                onClick={() => addToCart(product)}
                aria-label="Add to shopping cart"
              >
                <AddShoppingCartIcon />
              </IconButton>
            </CardActions>
          </Card>
        </Grid>
      ))}
    </Grid>
  </div>
);

export default withStyles(styles)(ProductGrid);
