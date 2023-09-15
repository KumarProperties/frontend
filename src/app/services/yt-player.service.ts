import { Injectable } from '@angular/core';
import { YouTubePlayer } from '@angular/youtube-player';

@Injectable({
  providedIn: 'root',
})
export class YtPlayerService {
  youtubePlayer!: YouTubePlayer;
  constructor() {}
  init(yt: any) {
    this.youtubePlayer = yt;
  }
  load(id: string): void {
    this.youtubePlayer.videoId = id;
    console.log(id, 'New ID');
  }

  play(): void {
    this.youtubePlayer.playVideo();
    console.log('playing New ID');
  }

  stop(): void {
    this.youtubePlayer.stopVideo();
  }
}
