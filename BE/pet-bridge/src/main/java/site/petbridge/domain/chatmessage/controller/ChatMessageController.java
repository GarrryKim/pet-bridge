package site.petbridge.domain.chatmessage.controller;

import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RestController;

import lombok.RequiredArgsConstructor;
import site.petbridge.domain.chatmessage.dto.request.ChatMessageRequestDto;
import site.petbridge.domain.chatmessage.dto.response.ChatMessageResponseDto;
import site.petbridge.domain.chatmessage.service.ChatMessageService;

@RestController
@RequiredArgsConstructor
public class ChatMessageController {

	private final ChatMessageService chatMessageService;
	private final SimpMessageSendingOperations sendingOperations;

	@MessageMapping("/api/chat/messages")
	public void registChatMessage(
		ChatMessageRequestDto chatMessageRequestDto) {

		int roomId = chatMessageRequestDto.getRoomId();
		chatMessageRequestDto.setRoomId(roomId);

		// 메시지 등록 전에 로그 추가
		System.out.println("Received message for room " + roomId + ": " + chatMessageRequestDto.getContent());

		ChatMessageResponseDto chatMessageResponseDto = chatMessageService.registChatMessage(chatMessageRequestDto);
		sendingOperations.convertAndSend("/topic/chat/rooms/" + roomId,
			chatMessageRequestDto);
	}

}