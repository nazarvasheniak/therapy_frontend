export class ViewHelper {
    static buildRatingStars(rating: number) {
        if (rating == 5) {
            return `
                <div class="stars-wrapper">
                    <img src="assets/images/star.svg" />
                    <img src="assets/images/star.svg" />
                    <img src="assets/images/star.svg" />
                    <img src="assets/images/star.svg" />
                    <img src="assets/images/star.svg" />
                </div>`;
        } else if (rating > 4 && rating < 5) {
            return `
                <div class="stars-wrapper">
                    <img src="assets/images/star.svg" />
                    <img src="assets/images/star.svg" />
                    <img src="assets/images/star.svg" />
                    <img src="assets/images/star.svg" />
                    <img src="assets/images/star-half.svg" />
                </div>`;
        } else if (rating == 4) {
            return `
                <div class="stars-wrapper">
                    <img src="assets/images/star.svg" />
                    <img src="assets/images/star.svg" />
                    <img src="assets/images/star.svg" />
                    <img src="assets/images/star.svg" />
                    <img src="assets/images/star-empty.svg" />
                </div>`;
        } else if (rating > 3 && rating < 4) {
            return `
                <div class="stars-wrapper">
                    <img src="assets/images/star.svg" />
                    <img src="assets/images/star.svg" />
                    <img src="assets/images/star.svg" />
                    <img src="assets/images/star-half.svg" />
                    <img src="assets/images/star-empty.svg" />
                </div>`;
        } else if (rating == 3) {
            return `
                <div class="stars-wrapper">
                    <img src="assets/images/star.svg" />
                    <img src="assets/images/star.svg" />
                    <img src="assets/images/star.svg" />
                    <img src="assets/images/star-empty.svg" />
                    <img src="assets/images/star-empty.svg" />
                </div>`;
        } else if (rating > 2 && rating < 3) {
            return `
                <div class="stars-wrapper">
                    <img src="assets/images/star.svg" />
                    <img src="assets/images/star.svg" />
                    <img src="assets/images/star-half.svg" />
                    <img src="assets/images/star-empty.svg" />
                    <img src="assets/images/star-empty.svg" />
                </div>`;
        } else if (rating == 2) {
            return `
                <div class="stars-wrapper">
                    <img src="assets/images/star.svg" />
                    <img src="assets/images/star.svg" />
                    <img src="assets/images/star-empty.svg" />
                    <img src="assets/images/star-empty.svg" />
                    <img src="assets/images/star-empty.svg" />
                </div>`;
        } else if (rating > 1 && rating < 2) {
            return `
                <div class="stars-wrapper">
                    <img src="assets/images/star.svg" />
                    <img src="assets/images/star-half.svg" />
                    <img src="assets/images/star-empty.svg" />
                    <img src="assets/images/star-empty.svg" />
                    <img src="assets/images/star-empty.svg" />
                </div>`;
        } else if (rating == 1) {
            return `
                <div class="stars-wrapper">
                    <img src="assets/images/star.svg" />
                    <img src="assets/images/star-empty.svg" />
                    <img src="assets/images/star-empty.svg" />
                    <img src="assets/images/star-empty.svg" />
                    <img src="assets/images/star-empty.svg" />
                </div>`;
        } else if (rating > 0 && rating < 1) {
            return `
                <div class="stars-wrapper">
                    <img src="assets/images/star-half.svg" />
                    <img src="assets/images/star-empty.svg" />
                    <img src="assets/images/star-empty.svg" />
                    <img src="assets/images/star-empty.svg" />
                    <img src="assets/images/star-empty.svg" />
                </div>`;
        } else if (rating == 0) {
            return `
                <div class="stars-wrapper">
                    <img src="assets/images/star-empty.svg" />
                    <img src="assets/images/star-empty.svg" />
                    <img src="assets/images/star-empty.svg" />
                    <img src="assets/images/star-empty.svg" />
                    <img src="assets/images/star-empty.svg" />
                </div>`;
        } else {
            return `
                <div class="stars-wrapper">
                    <img src="assets/images/star-empty.svg" />
                    <img src="assets/images/star-empty.svg" />
                    <img src="assets/images/star-empty.svg" />
                    <img src="assets/images/star-empty.svg" />
                    <img src="assets/images/star-empty.svg" />
                </div>`;
        }
    }
}