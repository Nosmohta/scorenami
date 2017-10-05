import React from 'react';
import { withRouter } from 'react-router-dom';
import { Tabs, Tab } from 'material-ui/Tabs';

const styles = {
  swipebar: {
    width: '100%',
    display: 'flex',
    overflowX: 'auto',
    flexDirection: 'row',
    flexWrap: 'nowrap',
    WebkitOverflowScrolling: 'touch',
    msOverflowStyle: '-ms-autohiding-scrollbar',
    background: '#F2F2F2',
    borderBottom: 'solid 1px #E0E0E0'
  },
  element: {
    width: '80px',
    flex: '0 0 auto',
    color: 'black',
    fontFamily: 'roboto',
    fontSize: '14',
    fontStyle: 'regular',
    textAlign: 'center',
    background: '#F2F2F2'
  },
  focusElement: {
    width: '80px',
    flex: '0 0 auto',
    color: 'black',
    fontFamily: 'roboto',
    fontSize: '18',
    fontStyle: 'bold',
    textAlign: 'center',
    background: '#F2F2F2'
  },
  button: {
    height: '30px'
  }
};

const SwipeBar = props => {
  const { swipeElements } = props;

  this.state = {
    focusIndex: props.focusIndex ? props.focusIndex : null
  };

  this.handleClick = event => {
    props.refetchGames(event);
  };

  return (
    <Tabs className="swipeBar" style={styles.swipebar}>
      {swipeElements.map((element, i) => {
        const elementValue = element.replace(/([a-z, \s])/gi, ($1, $2) => {
          return '';
        });
        return (
          <Tab
            key={i + 1}
            className="tab"
            style={elementValue === props.focusElement ? styles.focusElement : styles.element}
            buttonStyle={styles.button}
            label={element}
            onActive={event => this.handleClick(event)}
          />
        );
      })}
    </Tabs>
  );
};

export default withRouter(SwipeBar);
