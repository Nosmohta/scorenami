import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Tabs, Tab } from 'material-ui/Tabs';

const styles = {
  swipebar: {
    borderBottom: 'solid 1px #E0E0E0'
  },
  container: {
    background: '#F2F2F2',
    borderBottom: 'solid 1px #E0E0E0'
  },
  tabContainer: {
    display: 'flex',
    overflowX: 'auto',
    flexDirection: 'row',
    flexWrap: 'nowrap',
    WebkitOverflowScrolling: 'touch',
    msOverflowStyle: '-ms-autohiding-scrollbar',
    background: '#F2F2F2'
  },
  inkBar: {
    background: '#F2F2F2'
  },
  element: {
    width: '8rem',
    flex: '0 0 auto',
    color: 'black',
    fontFamily: 'roboto',
    fontSize: '14px',
    fontStyle: 'regular',
    textAlign: 'center',
    background: '#F2F2F2'
  },
  focusElement: {
    width: '10rem',
    flex: '0 0 auto',
    color: 'black',
    fontFamily: 'roboto',
    fontSize: '18px',
    fontStyle: 'bold',
    textAlign: 'center',
    background: '#F2F2F2'
  },
  button: {
    height: '1.8rem'
  },
  spacerTab: {
    height: '1.8rem',
    width: '15rem',
    flex: '0 0 auto',
    background: '#F2F2F2'
  }
};

class SwipeBar extends Component {
  componentDidMount() {
    this.props.scrollToFocusElement(this.elementInFocus);
  }

  componentDidUpdate() {
    this.props.scrollToFocusElement(this.elementInFocus);
  }

  render() {
    const { swipeElements } = this.props;

    return (
      <Tabs
        className="swipeBar"
        style={styles.swipebar}
        contentContainerStyle={styles.container}
        tabItemContainerStyle={styles.tabContainer}
        inkBarStyle={styles.inkBar}
      >
        <Tab
          key={'spacerTabLeft'}
          className="tab SpacerTab"
          style={styles.spacerTab}
          buttonStyle={styles.button}
        />
        {swipeElements.map((element, i) => {
          return (
            <Tab
              key={`element-${element.displayName}`}
              className="tab"
              style={
                element.displayName === this.props.focusElement.displayName
                  ? styles.focusElement
                  : styles.element
              }
              buttonStyle={styles.button}
              label={element.displayName}
              data={element}
              onActive={event => this.props.refetchGames(event)}
              ref={
                element.displayName === this.props.focusElement.displayName
                  ? el => (this.elementInFocus = el)
                  : null
              }
            />
          );
        })}
        <Tab
          key={'spacerTabRight'}
          className="tab SpacerTab"
          style={styles.spacerTab}
          buttonStyle={styles.button}
        />
      </Tabs>
    );
  }
}

export default withRouter(SwipeBar);
