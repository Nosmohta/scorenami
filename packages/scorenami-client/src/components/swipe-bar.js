import React, { Component } from 'react';
import { css } from 'glamor';
import { Tabs, Tab } from 'material-ui/Tabs';

const styles = {
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
  }
};

const swipeBarStyles = css({
  borderBottom: 'solid 1px #E0E0E0'
});

const containerStyles = css({
  background: '#F2F2F2',
  borderBottom: 'solid 1px #E0E0E0'
});

const spacerTabStyles = css({
  height: '1.8rem',
  width: '15rem',
  flex: '0 0 auto',
  background: '#F2F2F2'
});

const elementStyles = css({
  width: '8rem',
  flex: '0 0 auto',
  color: 'black',
  fontFamily: 'Roboto, sans-serif',
  fontSize: '14px',
  fontWeight: '400',
  textAlign: 'center',
  background: '#F2F2F2'
});

const focusElementStyles = css({
  width: '10rem',
  flex: '0 0 auto',
  color: 'black',
  fontFamily: 'roboto',
  fontSize: '14px',
  fontWeight: '600',
  textAlign: 'center',
  background: '#F2F2F2'
});

class SwipeBar extends Component {
  componentDidMount() {
    this.props.scrollToFocusElement(this.elementInFocus);
  }

  componentDidUpdate() {
    this.props.scrollToFocusElement(this.elementInFocus);
  }

  render() {
    const { swipeElements } = this.props;
    const type = this.props.type;

    return (
      <Tabs
        className={`${swipeBarStyles}`}
        contentContainerClassName={`${containerStyles}`}
        tabItemContainerStyle={styles.tabContainer}
        inkBarStyle={styles.inkBar}
      >
        <Tab
          key={'spacerTabLeft'}
          className={`tab ${spacerTabStyles}`}
          buttonStyle={styles.button}
        />
        {swipeElements.map((element, i) => {
          return (
            <Tab
              key={`element-${element.displayName}`}
              className={`tab ${element.displayName === this.props.focusElement.displayName
                ? focusElementStyles
                : elementStyles}`}
              buttonStyle={styles.button}
              label={element.displayName}
              data={element}
              type={type}
              onActive={event => this.props.fetchGames(event)}
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
          className={`tab ${spacerTabStyles}`}
          style={styles.spacerTab}
          buttonStyle={styles.button}
        />
      </Tabs>
    );
  }
}

export default SwipeBar;
