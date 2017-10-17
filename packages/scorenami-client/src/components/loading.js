import React from 'react';
import PropTypes from 'prop-types';
import { css } from 'glamor';
import RefreshIndicator from 'material-ui/RefreshIndicator';

const styles = css({
  position: 'relative',
  width: '40px',
  height: '40px',
  margin: '100px auto 0 auto',

  '& .refresh': {
    display: 'inline-block',
    position: 'relative'
  }
});

const Loading = props => (
  <div className={styles}>
    <RefreshIndicator className="refresh" size={40} left={0} top={0} status={props.status} />
  </div>
);

Loading.propTypes = {
  status: PropTypes.string
};

Loading.defaultProps = {
  status: 'loading'
};

export default Loading;
