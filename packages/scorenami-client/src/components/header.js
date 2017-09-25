import React from 'react';
import { withRouter } from 'react-router-dom';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import NavigationArrowBack from 'material-ui/svg-icons/navigation/arrow-back';

const Header = props => {
  const titleStyles = {
    textAlign: 'center'
  };

  if (!props.backButton) {
    return <AppBar title={props.title} titleStyle={titleStyles} showMenuIconButton={false} />;
  } else {
    return (
      <AppBar
        title={props.title}
        titleStyle={titleStyles}
        iconElementLeft={
          <IconButton onClick={props.history.goBack}>
            <NavigationArrowBack />
          </IconButton>
        }
      />
    );
  }
};

export default withRouter(Header);
