import {ILayout} from 'modules/LayoutService'

export enum LayoutNames {
	INTRO = 'intro',
	SHOW = 'show',
	TELL = 'tell'
}

export const LAYOUTS: ILayout[] = [
	{
		name: LayoutNames.INTRO,
		image: '',
		title: 'Intro',
		description: 'Intro description',
	},
	{
		name: LayoutNames.SHOW,
		image: '',
		title: 'Show',
		description: 'TEXT description',
	},
	{
		name: LayoutNames.TELL,
		image: '',
		title: 'Tell',
		description: 'THIRD_LAYOUT',
	}
]
