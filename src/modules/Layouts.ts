import {ILayout} from 'modules/LayoutService'

export enum LayoutNames {
	INTRO = 'intro',
	TEXT = 'text',
	THIRD_LAYOUT = 'third_layout'
}

export const LAYOUTS: ILayout[] = [
	{
		name: LayoutNames.INTRO,
		image: '',
		title: 'Intro',
		description: 'Intro description',
	},
	{
		name: LayoutNames.TEXT,
		image: '',
		title: 'TEXT',
		description: 'TEXT description',
	},
	{
		name: LayoutNames.THIRD_LAYOUT,
		image: '',
		title: 'THIRD_LAYOUT',
		description: 'THIRD_LAYOUT',
	}
]
