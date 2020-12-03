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
		slideImageUrl: 'https://image.freepik.com/free-vector/cute-baby-cat-icon-set-collection_65983-212.jpg',
	},
	{
		name: LayoutNames.SHOW,
		image: '',
		title: 'Show',
		description: 'TEXT description',
		slideImageUrl: 'https://image.freepik.com/free-vector/cute-baby-cat-icon-set-collection_65983-212.jpg',
	},
	{
		name: LayoutNames.TELL,
		image: '',
		title: 'Tell',
		description: 'THIRD_LAYOUT',
		slideImageUrl: 'https://image.freepik.com/free-vector/cute-baby-cat-icon-set-collection_65983-212.jpg',
	}
]
