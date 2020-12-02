import LayoutService from 'modules/LayoutService'
import * as React from 'react'

export const Layout = () => {
    const layoutService = LayoutService.getInstance();
    const layouts = [
        {
            name: "Intro",
            img: './src/images/layout-intro.png',
        },
        {
            name: "Show",
            img: './src/images/layout-show.png',
        },
        {
            name: "Tell",
            img: './src/images/layout-tell.png',
        },
    ]
    const onLayoutClick = (e) => {
        // For now, just create a slide of the with the chose layout
        layoutService.createNewSlide(e.target.title.toLowerCase())
    }

    return (
      <div className="slides">
        <h2>Layouts</h2>
        {layouts.map((layout) => (
          <div style={{textAlign: 'center'}} key={layout.name}>
            <img title={layout.name} style={{display: 'inline-block'}} src={layout.img} onClick={onLayoutClick}></img>
            <h4 className="h4" style={{display: 'inline-block', marginTop: '0.0em'}}>{layout.name}</h4>
          </div>
        ))}
      </div>
    );
}