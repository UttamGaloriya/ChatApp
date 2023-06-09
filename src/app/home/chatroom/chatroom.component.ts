import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ChatuserlistComponent } from '../chatuserlist/chatuserlist.component';
import { ChatService } from 'src/app/services/chat.service';
import { FormControl } from '@angular/forms';
import { Chat, Message } from 'src/app/chat';
import { Observable } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth.service';
import { error } from 'console';

@Component({
  selector: 'app-chatroom',
  templateUrl: './chatroom.component.html',
  styleUrls: ['./chatroom.component.scss']
})
export class ChatroomComponent implements OnInit {
  // currentId?: any
  lastSeenId?: string
  currentId: any = 0
  currentUserId?: string
  messageControl = new FormControl('')

  cureentUser$ = this.chatServices.selectedChat$
  chatId = this.chatServices.selectedChat$.subscribe((res) => { this.myfunction(res?.id), console.log(res), this.lastSeenId = res?.lastMessageUserId })
  authUser$ = this.authServices.currentUser$
  cuData?: Chat
  message$: Observable<Message[]> | undefined


  messageData: any
  chatHistoryDate?: any

  @ViewChild('endOfChat')
  endOfChat!: ElementRef;


  constructor(private chatServices: ChatService, private authServices: AuthService) {
    this.scrollToBottom()
  }

  ngOnInit(): void {

  }

  myfunction(id: any) {
    if (this.currentId != id) {
      this.message$ = this.chatServices.selectedChat$.pipe(
        map((value) => console.log(value),),
        switchMap((chatId) => this.chatServices.getChatMessages$(id),),
        tap((res) => { console.log(res), this.scrollToBottom() })
      )
      this.currentId = id
      console.log("yup")
    }

  }

  sendMessage() {

    const message = this.messageControl.value;
    // const selectedChatId = this.cuData?.id
    if (message && this.currentId) {
      this.chatServices.addChatMessage(this.currentId, message).subscribe()
      this.messageControl.setValue('');
      this.scrollToBottom()
    }

  }
  chatClose() {
    this.chatServices.updateCurrentChat(null)
    if (window.screen.width <= 767) {

      const userclass = document.getElementsByClassName('home-page-window')
      userclass[0].classList.remove('hide')
    }
  }
  scrollToBottom() {
    setTimeout(() => {
      if (this.endOfChat) {
        this.endOfChat.nativeElement.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  }

  newDateMsg(datemsg: any) {
    if (datemsg !== this.chatHistoryDate) {
      console.log(datemsg + "his" + this.chatHistoryDate)
      return true
    }
    return false
  }
  //emoji
  toggled: boolean = false;

  handleSelection(event: any) {
    console.log(event.char);
    this.messageControl.setValue(this.messageControl.value + event.char)
  }
}
