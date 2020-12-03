import IFrameWidget = SDK.IFrameWidget
import ITextWidget = SDK.ITextWidget
import IWidget = SDK.IWidget
import Utils from 'modules/Utils'
import {getLayoutData, LayoutNames} from 'modules/Layouts'
import {CLIENT_ID} from 'config'
import {getThemeData, ThemeNames} from 'modules/Themes'

export interface IFrameContent {
	slide: IFrameWidget | undefined
	header?: ITextWidget | undefined
	desc?: ITextWidget | undefined
	image?: IWidget | undefined
}

const SLIDE_WIDTH = 1366
const SLIDE_HEIGHT = 768
const SLIDE_MARGIN = 100
const SLIDE_PADDING = 60

const TEXT_MARGIN = 24

const DEFAULT_LAYOUT = LayoutNames.INTRO
const DEFAULT_THEME = ThemeNames.DARK

export default class SlideService {
	private static _instance: SlideService

	private slides: IFrameWidget[] = []
	private slideIterator: number = 1

	private lastUsedLayoutName: LayoutNames = DEFAULT_LAYOUT
	private lastUsedTheme: ThemeNames = DEFAULT_THEME

	static getInstance(): SlideService {
		if (!SlideService._instance) {
			SlideService._instance = new SlideService()
		}
		return SlideService._instance
	}

	constructor() {
		this.init()
	}

	createNewSlide(layoutName?: LayoutNames, themeName?: ThemeNames) {
		this.init().then(() => {
			const layout = layoutName || this.lastUsedLayoutName
			const theme = themeName || this.lastUsedTheme
			miro.board.widgets.create([this.getNewFrameData(layout), this.getNewImageData(layout), this.getNewHeaderData(), this.getNewDescData()]).then((widgets: IWidget[]) => {
				const content = Utils.getContentWidgetsFromArray(widgets)
				this.processApplyLayout(layout, content)
				this.processApplyTheme(theme, content)
			})
		})
	}

	applyLayout(layoutName: LayoutNames) {
		this.lastUsedLayoutName = layoutName
		miro.board.selection.get().then((widgets: IWidget[]) => {
			const content = Utils.getContentWidgetsFromArray(widgets)
			if (content.slide) {
				Utils.getFrameWidgets(content.slide).then(content => {
					this.processApplyLayout(layoutName, content)
				})
			}
			//todo save layout for the next slide
			// else {
			// 	this.createNewSlide()
			// }
		})
	}

	applyTheme(themeName: ThemeNames, frame?: IFrameWidget) {
		this.lastUsedTheme = themeName
		if (frame) {
			Utils.getFrameWidgets(frame).then(content => {
				this.processApplyTheme(themeName, content)
			})
		} else {
			miro.board.selection.get().then((widgets: IWidget[]) => {
				const content = Utils.getContentWidgetsFromArray(widgets)
				if (content.slide) {
					Utils.getFrameWidgets(content.slide).then(content => {
						this.processApplyTheme(themeName, content)
					})
				}
			})
		}
	}

	get currentTheme() {
		return this.lastUsedTheme;
	}

	get currentLayout() {
		return this.lastUsedLayoutName;
	}

	private init() {
		return new Promise((resolve) => {
			this.getSlides().then((slides: IFrameWidget[]) => {
				slides.forEach(slide => {
					if (slide.metadata.index > this.slideIterator) {
						this.slideIterator = slide.metadata.index
					}
				})
				this.slides = slides
				this.slides.sort((a, b) => a.metadata.index - b.metadata.index)

				this.slideIterator = this.slides.length + 1
				if (this.slides.length) {
					this.lastUsedLayoutName = this.slides[this.slides.length - 1].metadata[CLIENT_ID].layout
				}
				resolve()
			})
		})
	}

	private getSlides(): Promise<IFrameWidget[]> {
		return new Promise((resolve) => {
			miro.board.widgets.get({
				type: 'frame',
				metadata: {
					[CLIENT_ID]: {
						slide: true,
					}
				},
			}).then((resp: any) => {
				resolve(resp)
			})
		})
	}

	private getNewSlidePosition() {
		let x = 0, y = 0
		if (this.slides.length) {
			const lastSlide = this.slides[this.slides.length - 1]
			x = lastSlide.x + lastSlide.width + SLIDE_MARGIN
		}
		return {x, y}
	}

	private getNewFrameData(layoutName: string): any {
		const pos = this.getNewSlidePosition()
		return {
			type: 'frame',
			title: 'Slide ' + this.slideIterator,
			metadata: {
				[CLIENT_ID]: {
					slide: true,
					index: this.slideIterator,
					layout: layoutName,
				}
			},
			width: SLIDE_WIDTH,
			height: SLIDE_HEIGHT,
			x: pos.x,
			y: pos.y,
		}
	}

	private getNewImageData(layoutName: string): any {
		const layoutData = getLayoutData(layoutName)
		return {
			type: 'image',
			url: layoutData.slideImageUrl,
		}
	}

	private getNewHeaderData(): any {
		return {
			type: 'text',
			text: 'Heading',
			metadata: {
				[CLIENT_ID]: {
					heading: true
				}
			},
			scale: 4,
			style: {
				padding: 0,
			}
		}
	}

	private getNewDescData(): any {
		return {
			type: 'text',
			text: 'Description',
			metadata: {
				[CLIENT_ID]: {
					desc: true
				}
			},
			scale: 2,
			style: {
				padding: 0,
			}
		}
	}

	private processApplyTheme(themeName: ThemeNames, data: IFrameContent) {
		if (!data.slide || !data.header || !data.desc) {
			console.log('don\'t delete header or description')
			return
		}
		const themeData = getThemeData(themeName)
		const frameData = {
			id: data.slide.id,
			title: data.slide.title,
			style: {
				backgroundColor: themeData.bgColor
			}
		}
		const handlerData = {
			id: data.header.id,
			style: {
				textColor: themeData.textColor
			}
		}
		const descData = {
			id: data.desc.id,
			style: {
				textColor: themeData.textColor
			}
		}

		miro.board.widgets.update([frameData, handlerData, descData])
	}

	private processApplyLayout(layoutName: string, data: IFrameContent) {
		if (layoutName == LayoutNames.INTRO) {
			this.applyIntroLayout(data)
		} else if (layoutName === LayoutNames.SHOW) {
			this.applyShowLayout(data)
		} else if (layoutName === LayoutNames.TELL) {
			this.applyTellLayout(data)
		}
	}

	private applyIntroLayout(data: IFrameContent) {
		if (!data.slide || !data.header || !data.desc) {
			console.log('don\'t delete header or description')
			return
		}
		const slide = data.slide
		const header = data.header
		const desc = data.desc
		const image = data.image

		this.updateFrameLayoutName(slide, LayoutNames.INTRO)

		const headerScale = 5
		const descScale = 2.6

		const headerData = {
			id: header.id,
			x: slide.x,
			y: slide.y - slide.height / 2 + 240 + 52, //47 = half height of single line header
			scale: headerScale,
			width: (slide.width - (SLIDE_PADDING * 2)) / headerScale,
			style: {
				textAlign: 'c'
			},
		}

		const descData = {
			id: desc.id,
			x: slide.x,
			y: desc!.bounds.height > 60 ? slide.y + slide.height / 2 - 40 - desc.bounds.height / 2 : slide.y + slide.height / 2 - 80 - desc.bounds.height / 2,
			scale: descScale,
			width: (slide.width - (SLIDE_PADDING * 2)) / descScale,
			style: {
				textAlign: 'c'
			}
		}

		miro.board.widgets.bringForward(header.id)
		miro.board.widgets.bringForward(desc.id)

		const updates: any[] = [headerData, descData]

		if (image) {
			updates.push({
				id: image.id,
				scale: this.calcImageScale(slide.width, slide.height, image),
				x: slide.x,
				y: slide.y,
			})
		}

		miro.board.widgets.update(updates)
	}

	private calcImageScale(width: number, height: number, image: any) { //we don't have emoji in d.ts
		if (width / image.bounds.width > height / image.bounds.height) {
			const imageHeight = image.bounds.height / image.scale
			return height / imageHeight
		} else {
			const imageWidth = image.bounds.width / image.scale
			return width / imageWidth
		}
	}

	private applyShowLayout(data: IFrameContent) {
		if (!data.slide || !data.header || !data.desc) {
			console.log('don\'t delete header or description')
			return
		}
		this.updateFrameLayoutName(data.slide, LayoutNames.SHOW)
		const updates = []
		if (data.image) {
			updates.push({
				id: data.image.id,
				scale: this.calcImageScale(600, 646, data.image),
				x: data.slide.x + data.slide.width / 2 - 360,
				y: data.slide.y,
			})
		}
		this.applyBaseLayoutText(586, data.slide.x - data.slide.width / 2 + 353, data, updates)
	}

	private applyTellLayout(data: IFrameContent) {
		if (!data.slide || !data.header || !data.desc) {
			console.log('don\'t delete header or description')
			return
		}
		this.updateFrameLayoutName(data.slide, LayoutNames.TELL)
		const updates = []
		if (data.image) {
			updates.push({
				id: data.image.id,
				scale: this.calcImageScale(100, 100, data.image),
				x: data.slide.x - data.slide.width / 2 + 110,
				y: data.slide.y + data.slide.height / 2 - 110,
			})
		}
		this.applyBaseLayoutText(1246, data.slide.x, data, updates)
	}

	private applyBaseLayoutText(width: number, x: number, data: IFrameContent, updates: any[] = []) {
		if (!data.slide || !data.header || !data.desc) {
			console.log('don\'t delete header or description')
			return
		}
		const slide = data.slide
		const header = data.header
		const desc = data.desc

		this.updateFrameLayoutName(slide, LayoutNames.SHOW)

		const headerScale = 3.5
		const descScale = 2.6

		const headerData = {
			id: header.id,
			x: x,
			y: slide.y - slide.height / 2 + 40 + header.bounds.height / 2,
			scale: headerScale,
			width: width / headerScale,
			style: {
				textAlign: 'l'
			},
		}
		updates.push(headerData)

		updates.push({
			id: desc.id,
			x: x,
			y: header.bounds.height > 100 ? headerData.y + header.bounds.height / 2 + 32 + desc.bounds.height / 2 : slide.y - slide.height / 2 + 196 + desc.bounds.height / 2,
			scale: descScale,
			width: width / descScale,
			style: {
				textAlign: 'l'
			}
		})

		miro.board.widgets.bringForward(header.id)
		miro.board.widgets.bringForward(desc.id)

		miro.board.widgets.update(updates)
	}

	private updateFrameLayoutName(frame: IFrameWidget, layoutName: LayoutNames) {
		let data = frame.metadata[CLIENT_ID]
		data.layout = layoutName
		miro.board.widgets.update({
			id: frame.id,
			title: frame.title,
			metadata: {
				[CLIENT_ID]: data
			},
		})
	}
}
