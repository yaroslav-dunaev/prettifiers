import IFrameWidget = SDK.IFrameWidget
import IWidget = SDK.IWidget
import {IFrameContent} from 'modules/LayoutService'

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
		const header: any = widgets.find(w => w.type === 'TEXT' && w.metadata['3074457352186372578'].heading == true)
		const desc: any = widgets.find(w => w.type === 'TEXT' && w.metadata['3074457352186372578'].desc == true)

		//todo image

		return {
			slide: frame,
			header: header,
			desc: desc,
			image: undefined
		}
	}
}
