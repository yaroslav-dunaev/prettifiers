import {ThemeNames} from 'modules/Themes'

export default class ThemeService {
	private static _instance: ThemeService

	static getInstance(): ThemeService {
		if (!ThemeService._instance) {
			ThemeService._instance = new ThemeService()
		}
		return ThemeService._instance
	}

	constructor() {
		//
	}

	applyTheme(themeName: ThemeNames) {

	}
}
