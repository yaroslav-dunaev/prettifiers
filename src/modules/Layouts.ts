import {ITheme, THEMES} from 'modules/Themes'

export enum LayoutNames {
	INTRO = 'intro',
	SHOW = 'show',
	TELL = 'tell'
}

export interface ILayout {
	name: LayoutNames
	image: string
	title: string
	description: string
	slideImageUrl: string
}

export function getLayoutData(layoutName: string): ILayout {
	return LAYOUTS.find(t => t.name === layoutName) || LAYOUTS[0]
}

export const LAYOUTS: ILayout[] = [
	{
		name: LayoutNames.INTRO,
		image: '',
		title: 'Intro',
		description: 'Intro description',
		slideImageUrl: 'https://raw.githubusercontent.com/yaroslav-dunaev/prettifiers/master/src/images/layout-bg-show.png',
	},
	{
		name: LayoutNames.SHOW,
		image: '',
		title: 'Show',
		description: 'TEXT description',
		slideImageUrl: 'https://raw.githubusercontent.com/yaroslav-dunaev/prettifiers/master/src/images/layout-bg-show.png',
	},
	{
		name: LayoutNames.TELL,
		image: '',
		title: 'Tell',
		description: 'THIRD_LAYOUT',
		slideImageUrl: 'https://raw.githubusercontent.com/yaroslav-dunaev/prettifiers/master/src/images/layout-bg-show.png',
		//https://raw.githubusercontent.com/yaroslav-dunaev/prettifiers/master/src/images/layout-bg-tell.png
	}
]
