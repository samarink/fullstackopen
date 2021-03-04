import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../reducers/userReducer';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginBottom: 150,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

const Navbar = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  return (
    <div className={classes.root}>
      <AppBar>
        <Toolbar>
          <Button color="inherit" component={Link} to="/">
            home
          </Button>

          <Button color="inherit" component={Link} to="/users">
            users
          </Button>
          <Typography>{user.username} is logged in</Typography>
          <Button color="inherit" onClick={() => dispatch(logout())}>
            logout
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Navbar;
