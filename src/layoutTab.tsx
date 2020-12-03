import SlideService from 'modules/SlideService'
import * as React from 'react'
import {ITheme, THEMES} from 'modules/Themes'
import {LayoutNames} from 'modules/Layouts'
import Utils from 'modules/Utils'
import SVG from 'react-inlinesvg'

require('./styles.css')

export const Layout = () => {
  const slideService = SlideService.getInstance()
  let currentLayout = slideService.currentLayout
  let currentTheme = slideService.currentTheme
	const layouts = [
		{
      name: LayoutNames.INTRO,
			caption: 'Intro',
			img: './src/images/layout-intro.png'
		},
		{
      name: LayoutNames.SHOW,
			caption: 'Show',
			img: './src/images/layout-show.png'
		},
		{
      name: LayoutNames.TELL,
			caption: 'Tell',
			img: './src/images/layout-tell.png'
		}
  ]
  const PlusIcon = require('images/plus.svg')

	const onLayoutClick = (layout: LayoutNames) => {
    currentLayout = layout
	}

	const onThemeClick = (theme: ITheme) => {
    currentTheme = theme.name
		Utils.selectedSlides().then((slides) => {
			if (slides.length) {
				slides.forEach(s => slideService.applyTheme(theme.name, s))
			} else {
				//todo mark theme as selected
			}
		})
  }

  const onNewSlideClick = () => {
		slideService.createNewSlide(currentLayout, currentTheme)
  }

	return (
		<div className="slides">
			<h2>Layouts</h2>
			<div className="themes-container">
				{THEMES.map((theme: ITheme) => (
						<div className="theme-button" style={{backgroundColor: theme.bgColor}} key={theme.name} onClick={() => onThemeClick(theme)}></div>
					)
				)}
			</div>

			{layouts.map((layout) => (
				<div style={{textAlign: 'center'}} key={layout.name}>
					<img title={layout.caption} style={{display: 'inline-block'}} src={layout.img} onClick={() => onLayoutClick(layout.name)}></img>
					<h4 className="h4" style={{display: 'inline-block', marginTop: '0.0em'}}>{layout.caption}</h4>
				</div>
			))}
      <div style={{textAlign: 'right'}}>
        <SVG className="icon clickable" style={{display: 'inline-block'}} src={PlusIcon} onClick={onNewSlideClick}/>
      </div>
		</div>
	)
}
