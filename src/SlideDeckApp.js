/**
 * The central controller for the karaoke app.
 */

SlideDeckApp = {
    /**
     * Delete all the files from the 'slides' directory.
     *
     * @param fs
     * @param dirname
     */
    flushImageDir: (fs, dirname) => {
        // Clear out old images. (Can we do this on die?)
        fs.emptyDir(dirname, err => {
            if (err) {
                console.log('Unable to clear the uploads dir.');
            } else {
                console.log(`Cleared the contents of ${dirname}.`);
            }
        });
    },

    /**
     * Return a subset of random items from the images array.
     *
     * @param slides
     * @param count
     * @returns {*}
     */
    selectSlides: (slides, count) => {
        // Shuffle the array of slide files.
        for (let i = slides.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [slides[i], slides[j]] = [slides[j], slides[i]]; // Swap elements
        }

        return slides.slice(0, count);
    }
}

module.exports = SlideDeckApp;
