export enum ThemeNames {
	DARK = 'dark',
	BLUE = 'blue',
	RED = 'red',
	YELLOW = 'yellow',
	PINK = 'pink',
	WHITE = 'white'
}

export interface ITheme {
	name: ThemeNames
	bgColor: string
	textColor: string
	title: string
}

export function getThemeData(themeName: string): ITheme {
	return THEMES.find(t => t.name === themeName) || THEMES[0]
}

export const THEMES: ITheme[] = [
	{
		name: ThemeNames.DARK,
		bgColor: '#050038',
		textColor: '#ffffff',
		title: 'Dark',
	},
	{
		name: ThemeNames.BLUE,
		bgColor: '#3F53D9',
		textColor: '#ffffff',
		title: 'Blue',
	},
	{
		name: ThemeNames.RED,
		bgColor: '#FF6575',
		textColor: '#ffffff',
		title: 'Red',
	},
	{
		name: ThemeNames.YELLOW,
		bgColor: '#FFD02F',
		textColor: '#050038',
		title: 'Red',
	},
	{
		name: ThemeNames.PINK,
		bgColor: '#FFBFBF',
		textColor: '#050038',
		title: 'Red',
	},
	{
		name: ThemeNames.WHITE,
		bgColor: '#F3F4F8',
		textColor: '#050038',
		title: 'Red',
	},
]
