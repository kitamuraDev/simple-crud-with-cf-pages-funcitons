import { Component, type OnInit, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { hc } from 'hono/client';
import type { ApiRoute } from '../../functions';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App implements OnInit {
  protected readonly title = signal('simple-crud-with-cf-pages-funcitons');
  private readonly client = hc<ApiRoute>('/api');

  async ngOnInit() {
    const res = await this.client.title.$get();
    const data = await res.json();

    this.title.set(data.title);
  }
}
