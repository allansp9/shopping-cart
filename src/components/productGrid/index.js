import React from 'react';
import Card, { CardActions, CardContent, CardMedia } from 'material-ui/Card';
import Grid from 'material-ui/Grid';
import IconButton from 'material-ui/IconButton';
import AddShoppingCartIcon from 'material-ui-icons/AddShoppingCart';
import { withStyles } from 'material-ui/styles';
import Typography from 'material-ui/Typography';

const styles = {
  root: {
    marginTop: 80,
  },
  card: {
    flex: 1,
    width: 300,
  },
  media: {
    height: 200,
  },
};

const ProductGrid = ({ products, addToCart, classes }) => (
  <div className={classes.root}>
    <Grid container justify="space-around" className={classes.root}>
      {products.map(product => (
        <Grid key={product._id} item>
          <Card className={classes.card}>
            <CardMedia className={classes.media} image={product.picture} title={product.name} />
            <CardContent>
              <Typography type="headline" component="h2">
                {product.name}
              </Typography>
              <Typography type="subheading">R$ {product.price}</Typography>
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
