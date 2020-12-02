import IFrameWidget = SDK.IFrameWidget
import ITextWidget = SDK.ITextWidget
import IWidget = SDK.IWidget
import Utils from 'modules/Utils'
import {LayoutNames} from 'modules/Layouts'
import {CLIENT_ID} from 'config'

export interface ILayout {
	name: LayoutNames
	image: string
	title: string
	description: string
}

export interface IFrameContent {
	slide: IFrameWidget | undefined
	header?: ITextWidget | undefined
	desc?: ITextWidget | undefined
	image?: IWidget | undefined
}

const SLIDE_WIDTH = 1366
const SLIDE_HEIGHT = 768
const SLIDE_MARGIN = 100
const SLIDE_PADDING = 48

const TEXT_MARGIN = 24

const DEFAULT_LAYOUT = LayoutNames.INTRO

export default class LayoutService {
	private static _instance: LayoutService

	private slides: IFrameWidget[] = []
	private slideIterator: number = 1

	private lastUsedLayoutName: LayoutNames = DEFAULT_LAYOUT

	static getInstance(): LayoutService {
		if (!LayoutService._instance) {
			LayoutService._instance = new LayoutService()
		}
		return LayoutService._instance
	}

	constructor() {
		this.init()
	}

	createNewSlide(layoutName?: string) {
		this.init().then(() => {
			const layout = layoutName || this.lastUsedLayoutName
			miro.board.widgets.create([this.getNewFrameData(layout), this.getNewHeaderData(), this.getNewDescData()]).then((widgets: IWidget[]) => {
				this.processApplyLayout(layout, Utils.getContentWidgetsFromArray(widgets))
			})
		})
	}

	applyLayout(layoutName: string, frame: IFrameWidget) {
		Utils.getFrameWidgets(frame).then(content => {
			this.processApplyLayout(layoutName, content)
		})
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
			style: {
				backgroundColor: '#050038'
			}
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
				textColor: '#ffffff',
				bold: 1,
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
				textColor: '#ffffff',
			}
		}
	}

	private processApplyLayout(layoutName: string, data: IFrameContent) {
		if (layoutName == LayoutNames.INTRO) {
			this.applyIntroLayout(data)
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

		this.updateFrameLayoutName(slide, LayoutNames.INTRO)

		miro.board.widgets.update({
			id: header.id,
			x: slide.x,
			y: slide.y,
			width: (slide.width - (SLIDE_PADDING * 2)) / header.scale,
			style: {
				textAlign: 'c'
			},
		}).then((widgets: any[]) => {
			const updatedHeader: ITextWidget = widgets[0]
			updatedHeader.bounds.height
			miro.board.widgets.update({
				id: desc.id,
				x: slide.x,
				width: (slide.width - (SLIDE_PADDING * 2)) / desc.scale,
				style: {
					textAlign: 'c'
				},
			}).then((widgets: any[]) => {
				const upDesc = widgets[0]
				miro.board.widgets.update({
					id: desc.id,
					y: updatedHeader.y + updatedHeader.bounds.height / 2 + TEXT_MARGIN + upDesc.bounds.height / 2,
				})
			})
		})
	}

	private updateFrameLayoutName(frame: IFrameWidget, layoutName: LayoutNames) {
		let data = frame.metadata[CLIENT_ID]
		data.layout = layoutName
		miro.board.widgets.update({
			id: frame.id,
			metadata: {
				[CLIENT_ID]: data
			},
		})
	}
}
