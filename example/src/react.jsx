import React from 'react';
import ReactDOM from 'react-dom';
import style from './test.css';
console.log('wooo')

const propTypes = {
};

const defaultProps = {
};

class TestComponent extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
    };
  }


  render() {
    return (
      <span className={style.root}>Meow</span>
    );
  }
}

TestComponent.propTypes = propTypes;
TestComponent.defaultProps = defaultProps;

ReactDOM.render(
  <TestComponent />,
  document.querySelector("#app")
);

