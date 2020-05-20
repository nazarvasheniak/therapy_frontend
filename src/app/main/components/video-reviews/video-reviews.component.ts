import { Component } from '@angular/core';

@Component({
    selector: 'video-reviews',
    templateUrl: './video-reviews.component.html',
    styleUrls: ['./video-reviews.component.scss']
})
export class VideoReviewsComponent {
    images = [944, 1011, 984].map((n) => `https://picsum.photos/id/${n}/900/500`);
}