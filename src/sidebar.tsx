import * as React from 'react'
import * as ReactDOM from 'react-dom'

import {Layout} from "./layoutTab"

require('./styles.css')

const Root = () => {
  const [active, setActive] = React.useState(0)
  const themeContent = (<h2>Themes</h2>)

  return (
    <div className="wrapper">
      {/*<div className="tabs">*/}
      {/*  <div className="tabs-header-list">*/}
      {/*    <Tab*/}
      {/*      title="Layout"*/}
      {/*      onTabClicked={() => setActive(0)}*/}
      {/*      isActive={active === 0}*/}
      {/*    ></Tab>*/}
      {/*    <Tab*/}
      {/*      title="Theme"*/}
      {/*      onTabClicked={() => setActive(1)}*/}
      {/*      isActive={active === 1}*/}
      {/*    ></Tab>*/}
      {/*  </div>*/}
      {/*</div>*/}
      <div className="content">{(active === 0) ? <Layout/> : themeContent}</div>
    </div>
  );
}

const Tab = ({ title = "", onTabClicked = () => {}, isActive = false }) => {
  return (
    <div className={isActive ? "tab tab-active" : "tab"} onClick={onTabClicked}>
      <div className="tab-text tab-badge">
        {title}
      </div>
    </div>
  );
};

miro.onReady(() => {
	ReactDOM.render(<Root/>, document.getElementById('react-app'))
})
