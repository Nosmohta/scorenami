import React from 'react';
import { withRouter } from 'react-router-dom';

import CircularProgress from 'material-ui/CircularProgress';

const styles = {
  container: {
    height: '300px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  }
};

const Loading = props => {
  return (
    <div style={styles.container}>
      <CircularProgress size={100} thickness={7} />
    </div>
  );
};

export default withRouter(Loading);
