import IFrameWidget = SDK.IFrameWidget
import ITextWidget = SDK.ITextWidget
import IWidget = SDK.IWidget
import Utils from 'modules/Utils'
import {LayoutNames} from 'modules/Layouts'

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

export default class LayoutService {
	private static _instance: LayoutService

	private slides: IFrameWidget[] = []
	private slideIterator: number = 1

	// private lastUsedLayout: ILayout

	static getInstance(): LayoutService {
		if (!LayoutService._instance) {
			LayoutService._instance = new LayoutService()
		}
		return LayoutService._instance
	}

	constructor() {
		this.init()
	}

	private init() {
		return new Promise((resolve) => {
			this.getSlides().then((slides: IFrameWidget[]) => {
				console.log('init', slides)
				slides.forEach(slide => {
					if (slide.metadata.index > this.slideIterator) {
						this.slideIterator = slide.metadata.index
					}
				})
				this.slides = slides
				this.slides.sort((a, b) => a.metadata.index - b.metadata.index)

				this.slideIterator = this.slides.length + 1
				resolve()
			})
		})
	}

	private getSlides(): Promise<IFrameWidget[]> {
		return new Promise((resolve) => {
			miro.board.widgets.get({
				type: 'frame',
				metadata: {
					'3074457352186372578': {
						slide: true,
					}
				},
			}).then((resp: any) => {
				resolve(resp)
			})
		})
	}

	private createHeading() {

	}

	private getNewSlidePosition() {
		let x = 0
		let y = 0
		if (this.slides.length) {
			const lastSlide = this.slides[this.slides.length - 1]
			console.log('lastSlide', lastSlide, lastSlide.x, lastSlide.width)
			x = lastSlide.x + lastSlide.width + SLIDE_MARGIN
		}
		return {x, y}
	}

	private getNewFrameData(): any {
		const pos = this.getNewSlidePosition()
		return {
			type: 'frame',
			title: 'Slide ' + this.slideIterator,
			metadata: {
				'3074457352186372578': {
					slide: true,
					index: this.slideIterator
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
				'3074457352186372578': {
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
				'3074457352186372578': {
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

	createNewFrame() {
		this.init().then(() => {
			const pos = this.getNewSlidePosition()
			console.log('create new slide', pos, this.slides)
			miro.board.widgets.create([this.getNewFrameData(), this.getNewHeaderData(), this.getNewDescData()]).then((widgets: IWidget[]) => {
				this.applyIntroLayout(Utils.getContentWidgetsFromArray(widgets))
			})
		})
	}

	applyLayout(layout: ILayout, data: IFrameWidget | IFrameContent) {
		//
	}

	// private

	private applyIntroLayout(data: IFrameContent) {
		if (!data.slide || !data.header || !data.desc) {
			return
		}
		//todo update slide layout
		miro.board.widgets.update({
			id: data.header.id,
			x: data.slide.x,
			y: data.slide.y,
			width: (data.slide.width - (SLIDE_PADDING * 2)) / data.header.scale,
			style: {
				textAlign: 'c'
			},
		}).then((widgets: any[]) => {
			const updatedHeader: ITextWidget = widgets[0]
			updatedHeader.bounds.height
			miro.board.widgets.update({
				id: data.desc.id,
				x: data.slide.x,
				width: (data.slide.width - (SLIDE_PADDING * 2)) / data.desc.scale,
				style: {
					textAlign: 'c'
				},
			}).then((widgets: any[]) => {
				const upDesc = widgets[0]
				miro.board.widgets.update({
					id: data.desc.id,
					y: updatedHeader.y + updatedHeader.bounds.height / 2 + TEXT_MARGIN + upDesc.bounds.height / 2,
				})
			})
		})
	}
}
