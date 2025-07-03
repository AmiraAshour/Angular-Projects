import { ChangeDetectionStrategy, ChangeDetectorRef, Component, DestroyRef, inject, input, OnInit } from '@angular/core';
import { MessagesService } from '../messages.service';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-messages-list',
  standalone: true,
  imports: [AsyncPipe],
  templateUrl: './messages-list.component.html',
  styleUrl: './messages-list.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MessagesListComponent {
  private messagesService = inject(MessagesService);
  message$ = this.messagesService.message$;
  // private cdRef = inject(ChangeDetectorRef);
  // private destrioyRef = inject(DestroyRef);
  // ngOnInit(): void {
  //   const subscription = this.messagesService.message$.subscribe(messages => {
  //     this.messages = messages;
  //     this.cdRef.markForCheck();
  //   }
  //   );
  //   this.destrioyRef.onDestroy(() => subscription.unsubscribe());

  // }
  messages: string[] = [];

  get debugOutput() {
    console.log('[MessagesList] "debugOutput" binding re-evaluated.');
    return 'MessagesList Component Debug Output';
  }
}
