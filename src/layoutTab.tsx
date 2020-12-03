import SlideService from 'modules/SlideService'
import * as React from 'react'
import {ITheme, THEMES} from 'modules/Themes'

require('./styles.css')

export const Layout = () => {
	const slideService = SlideService.getInstance()
	const layouts = [
		{
			name: 'Intro',
			img: './src/images/layout-intro.png'
		},
		{
			name: 'Show',
			img: './src/images/layout-show.png'
		},
		{
			name: 'Tell',
			img: './src/images/layout-tell.png'
		}
	]
	const onLayoutClick = (e) => {
		// For now, just create a slide of the with the chose layout
		slideService.createNewSlide(e.target.title.toLowerCase())
	}

	const onThemeClick = (e) => {

	}

	return (
		<div className="slides">
			<h2>Layouts</h2>
			<div className="themes-container">
				{THEMES.map((theme: ITheme) => (
						<div className="theme-button" style={{backgroundColor: theme.bgColor}} key={theme.name} onClick={onThemeClick}></div>
					)
				)}
			</div>

			{layouts.map((layout) => (
				<div style={{textAlign: 'center'}} key={layout.name}>
					<img title={layout.name} style={{display: 'inline-block'}} src={layout.img} onClick={onLayoutClick}></img>
					<h4 className="h4" style={{display: 'inline-block', marginTop: '0.0em'}}>{layout.name}</h4>
				</div>
			))}
		</div>
	)
}
