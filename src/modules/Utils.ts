import IFrameWidget = SDK.IFrameWidget
import IWidget = SDK.IWidget
import {IFrameContent} from 'modules/SlideService'
import {CLIENT_ID} from 'config'

export default class Utils {
	static getFrameWidgets(slide: IFrameWidget): Promise<IFrameContent> {
		return new Promise((resolve) => {
			miro.board.widgets.__getIntersectedObjects({
				width: slide.width,
				height: slide.height,
				x: slide.x - slide.width/2,
				y: slide.y - slide.height/2
			}).then((widgets: IWidget[]) => {
				resolve(Utils.getContentWidgetsFromArray(widgets))
			})
		})
	}

	static getContentWidgetsFromArray(widgets: IWidget[]): IFrameContent {
		const frame: any = widgets.find(w => w.type === 'FRAME')
		const header: any = widgets.find(w => w.type === 'TEXT' && w.metadata[CLIENT_ID].heading == true)
		const desc: any = widgets.find(w => w.type === 'TEXT' && w.metadata[CLIENT_ID].desc == true)
		const image: any = widgets.find(w => w.type === 'IMAGE' || w.type === 'EMOJI' || w.type === 'EMBED')

		//todo image

		return {
			slide: frame,
			header: header,
			desc: desc,
			image: image,
		}
	}

	static selectedSlides(): Promise<any[]> {
		return new Promise((resolve) => {
			miro.board.selection.get().then((widgets: IWidget[]) => {
				resolve(widgets.filter(w => w.type === 'FRAME' && w.metadata[CLIENT_ID].slide == true))
			})
		})
	}
}
