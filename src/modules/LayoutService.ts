export interface ILayout {
	name: string
}

export default class LayoutService {
	private static _instance: LayoutService

	// private lastUsedLayout: ILayout

	static getInstance(): LayoutService {
		if (!LayoutService._instance) {
			LayoutService._instance = new LayoutService()
		}
		return LayoutService._instance
	}

	constructor() {
		//
	}

	createNewSlide() {
		console.log('create new slide')
	}
}
