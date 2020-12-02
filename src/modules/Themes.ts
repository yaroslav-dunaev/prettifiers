export enum ThemeNames {
	LIGHT = 'Simple Light',
	DARK = 'Simple Dark',
}

export interface ITheme {
	name: ThemeNames
	image: string
	title: string
	description: string
}

export const THEMES: ITheme[] = [
	{
		name: ThemeNames.LIGHT,
		image: '',
		title: ThemeNames.LIGHT,
		description: 'Intro description',
	},
	{
		name: ThemeNames.DARK,
		image: '',
		title: ThemeNames.DARK,
		description: 'TEXT description',
	},
]
