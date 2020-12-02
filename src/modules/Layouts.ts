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
