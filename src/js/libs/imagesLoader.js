/**
 * Preload images. Notify on update/complete
 *
 * @class ImagesLoader
 * @constructor
 * @param {Array} [images=[]] Images sources
 */
class ImagesLoader {
	constructor(images) {
		this.images = images || [];
		this.total = this.images.length;

		const fn = function() {};
		this.progress = fn;
		this.complete = fn;
	}

	/**
	 * Start to preload
	 *
	 * @method start
	 */
	start() {
		let loaded = 0;

		const updateQueue = () => {
			loaded++;

			const percent = (loaded * 100) / this.total;
			this.progress(percent);

			if (loaded === this.total) {
				this.complete();
			}
		};

		for (let i = 0; i < this.total; i++) {
			const image = new Image();
			image.src = this.images[i];
			image.onload = image.onerror = updateQueue;
		}
	}

	/**
	 * Pass the update handler
	 *
	 * @method onProgress
	 * @param {Function} [progress]
	 */
	onProgress(progress) {
		this.progress = progress;
	}

	/**
	 * Pass the complete handler
	 *
	 * @method onComplete
	 * @param {Function} [complete]
	 */
	onComplete(complete) {
		this.complete = complete;
	}
}

export default ImagesLoader;
