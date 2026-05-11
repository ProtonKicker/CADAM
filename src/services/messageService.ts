import { useConversation } from '@/contexts/ConversationContext';
import { Content, Conversation, Message, Model } from '@shared/types';
import {
  QueryClient,
  UseMutateAsyncFunction,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';

const LOCAL_API_URL =
  import.meta.env.VITE_LOCAL_API_URL ?? 'http://localhost:3001';

// --- Helpers ---

function messageInsertedConversationUpdate(
  queryClient: QueryClient,
  newMessage: Message,
  conversationId: string,
) {
  // Update conversation leaf ID
  queryClient.setQueryData(
    ['conversation', conversationId],
    (oldConversation: Conversation) => ({
      ...oldConversation,
      current_message_leaf_id: newMessage.id,
    }),
  );

  // Update messages
  queryClient.setQueryData(
    ['messages', conversationId],
    (oldMessages: Message[] | undefined) => {
      if (!oldMessages || oldMessages.length === 0) return [newMessage];
      if (oldMessages.find((msg) => msg.id === newMessage.id)) {
        return oldMessages.map((msg) =>
          msg.id === newMessage.id ? newMessage : msg,
        );
      }
      return [...oldMessages, newMessage];
    },
  );
}

// --- Queries ---

export const useMessagesQuery = () => {
  const { conversation } = useConversation();
  // Messages are managed in-memory via React Query cache — no server fetch needed.
  return useQuery<Message[]>({
    enabled: !!conversation.id,
    queryKey: ['messages', conversation.id],
    initialData: [],
    queryFn: async () => {
      // Return whatever is already in the cache (set by mutation streaming)
      return [];
    },
    // Never refetch — messages are updated locally via SSE streaming
    staleTime: Infinity,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });
};

// --- Mutations ---

export function useInsertMessageMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (
      message: Omit<Message, 'id' | 'created_at' | 'rating'>,
    ) => {
      // Generate local IDs — no Supabase insert needed
      const newMessage: Message = {
        ...(message as Message),
        id: crypto.randomUUID(),
        created_at: new Date().toISOString(),
      };
      return newMessage;
    },
    onSuccess(newMessage) {
      messageInsertedConversationUpdate(
        queryClient,
        newMessage,
        newMessage.conversation_id,
      );
    },
    onError(error) {
      console.error('Insert message error:', error);
    },
  });
}

// --- Chat Mutations (shared streaming logic) ---

async function streamChatResponse(
  conversationId: string,
  messageId: string,
  model: string,
  messages: Array<{ role: 'user' | 'assistant'; content: Content }>,
  queryClient: QueryClient,
): Promise<Message | null> {
  const newMessageId = crypto.randomUUID();
  let initialized = false;

  const response = await fetch(`${LOCAL_API_URL}/api/chat`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      conversationId,
      messageId,
      model,
      messages,
    }),
  });

  if (!response.ok) {
    throw new Error(
      `Network response was not ok: ${response.status} ${response.statusText}`,
    );
  }

  async function initialize() {
    await queryClient.cancelQueries({
      queryKey: ['conversation', conversationId],
    });
    queryClient.setQueryData(
      ['conversation', conversationId],
      (oldConversation: Conversation) => ({
        ...oldConversation,
        current_message_leaf_id: newMessageId,
      }),
    );
  }

  const reader = response.body?.getReader();
  if (!reader) throw new Error('No reader available');

  const decoder = new TextDecoder();
  let leftover = '';
  let finalMessage: Message | null = null;

  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      leftover += decoder.decode(value, { stream: true });
      const lines = leftover.split('\n');
      leftover = lines.pop() ?? '';

      for (const rawLine of lines) {
        const line = rawLine.trim();
        if (!line) continue;
        try {
          const data: Message = JSON.parse(line);
          finalMessage = data;

          // Update React Query cache with streamed message
          queryClient.setQueryData(
            ['messages', conversationId],
            (oldMessages: Message[] | undefined) => {
              if (!oldMessages || oldMessages.length === 0) return [data];
              if (oldMessages.find((msg) => msg.id === data.id)) {
                return oldMessages.map((msg) =>
                  msg.id === data.id ? data : msg,
                );
              }
              return [...oldMessages, data];
            },
          );

          if (!initialized) {
            await initialize();
            initialized = true;
          }
        } catch (parseError) {
          console.error('Error parsing streaming data:', parseError);
        }
      }
    }

    // Flush remaining buffer
    const tail = leftover.trim();
    if (tail) {
      try {
        const data: Message = JSON.parse(tail);
        finalMessage = data;
        queryClient.setQueryData(
          ['messages', conversationId],
          (oldMessages: Message[] | undefined) => {
            if (!oldMessages || oldMessages.length === 0) return [data];
            if (oldMessages.find((msg) => msg.id === data.id)) {
              return oldMessages.map((msg) =>
                msg.id === data.id ? data : msg,
              );
            }
            return [...oldMessages, data];
          },
        );
      } catch {
        // ignore
      }
    }
  } finally {
    reader.releaseLock();
  }

  return finalMessage;
}

export function useCreativeChatMutation({
  conversationId,
}: {
  conversationId: string;
}) {
  const queryClient = useQueryClient();
  const { mutateAsync: insertMessageAsync } = useInsertMessageMutation();

  return useMutation({
    mutationKey: ['creative-chat', conversationId],
    mutationFn: async ({
      model,
      messageId,
      conversationId,
    }: {
      model: Model;
      messageId: string;
      conversationId: string;
    }) => {
      // For creative mode, just return a basic message
      // The local server only supports parametric mode
      const result = await insertMessageAsync({
        role: 'assistant',
        content: {
          text: 'Creative mode is not yet supported in local mode. Please use parametric mode.',
        },
        parent_message_id: messageId,
        conversation_id: conversationId,
      });
      return result;
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['userExtraData'] });
    },
  });
}

export function useParametricChatMutation({
  conversationId,
}: {
  conversationId: string;
}) {
  const queryClient = useQueryClient();
  const { mutateAsync: insertMessageAsync } = useInsertMessageMutation();

  return useMutation({
    mutationKey: ['parametric-chat', conversationId],
    mutationFn: async ({
      model,
      messageId,
      conversationId,
      messages,
    }: {
      model: Model;
      messageId: string;
      conversationId: string;
      messages?: Array<{ role: 'user' | 'assistant'; content: Content }>;
    }) => {
      const finalMessage = await streamChatResponse(
        conversationId,
        messageId,
        model,
        messages ?? [],
        queryClient,
      );

      if (!finalMessage) {
        throw new Error('No final message received');
      }

      return finalMessage;
    },
    onSuccess: (newMessage) => {
      messageInsertedConversationUpdate(
        queryClient,
        newMessage,
        conversationId,
      );
    },
    onError: async (error, { messageId }) => {
      console.error('Parametric chat error:', error);
      try {
        await insertMessageAsync({
          role: 'assistant',
          content: {
            text: 'An error occurred while processing your request.',
          },
          parent_message_id: messageId,
          conversation_id: conversationId,
        });
      } catch (err) {
        console.error('Failed to insert error message:', err);
      }
    },
  });
}

export function useSendContentMutation({
  conversation,
}: {
  conversation: Pick<
    Conversation,
    'id' | 'user_id' | 'settings' | 'current_message_leaf_id' | 'type'
  >;
}) {
  const queryClient = useQueryClient();
  const { mutateAsync: insertMessageAsync } = useInsertMessageMutation();
  const creativeChat = useCreativeChatMutation({
    conversationId: conversation.id,
  });
  const parametricChat = useParametricChatMutation({
    conversationId: conversation.id,
  });

  return useMutation({
    mutationKey: ['send-content', conversation.id],
    mutationFn: async (content: Content) => {
      const userMessage = await insertMessageAsync({
        role: 'user',
        content,
        parent_message_id: conversation.current_message_leaf_id ?? null,
        conversation_id: conversation.id,
      });

      const currentMessages =
        queryClient.getQueryData<Message[]>([
          'messages',
          conversation.id,
        ]) ?? [];

      const serverMessages = currentMessages
        .filter((m) => m.role === 'user' || m.role === 'assistant')
        .map((m) => ({
          role: m.role as 'user' | 'assistant',
          content: m.content,
        }));

      if (conversation.type === 'creative') {
        await creativeChat.mutateAsync({
          model: content.model ?? conversation.settings?.model ?? 'quality',
          messageId: userMessage.id,
          conversationId: conversation.id,
        });
      } else {
        await parametricChat.mutateAsync({
          model: content.model ?? conversation.settings?.model ?? 'fast',
          messageId: userMessage.id,
          conversationId: conversation.id,
          messages: serverMessages,
        });
      }
    },
  });
}

export function useUpdateMessageOptimisticMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ message }: { message: Message }) => {
      // No server update needed — just apply to local cache
      return message;
    },
    onMutate: async ({ message }) => {
      await queryClient.cancelQueries({
        queryKey: ['messages', message.conversation_id],
      });
      const oldMessages = queryClient.getQueryData<Message[]>([
        'messages',
        message.conversation_id,
      ]);
      queryClient.setQueryData(
        ['messages', message.conversation_id],
        oldMessages?.map((msg) =>
          msg.id === message.id ? { ...msg, ...message } : msg,
        ),
      );
      return { oldMessages };
    },
    onError(error, { message }, context) {
      console.error('Update message error:', error);
      queryClient.setQueryData(
        ['messages', message.conversation_id],
        context?.oldMessages,
      );
    },
  });
}

export function useEditMessageMutation({
  conversation,
}: {
  conversation: Conversation;
}) {
  const { mutateAsync: insertMessageAsync } = useInsertMessageMutation();
  const creativeChat = useCreativeChatMutation({
    conversationId: conversation.id,
  });
  const parametricChat = useParametricChatMutation({
    conversationId: conversation.id,
  });

  return useMutation({
    mutationKey: ['edit-message', conversation.id],
    mutationFn: async (updatedMessage: Message) => {
      const userMessage = await insertMessageAsync({
        role: updatedMessage.role,
        content: updatedMessage.content,
        parent_message_id: updatedMessage.parent_message_id ?? null,
        conversation_id: conversation.id,
      });

      if (conversation.type === 'creative') {
        creativeChat.mutateAsync({
          model: conversation.settings?.model ?? 'quality',
          messageId: userMessage.id,
          conversationId: conversation.id,
        });
      } else {
        parametricChat.mutateAsync({
          model: conversation.settings?.model ?? 'fast',
          messageId: userMessage.id,
          conversationId: conversation.id,
        });
      }
    },
    onError: (error) => {
      console.error('Edit message error:', error);
    },
  });
}

export function useRetryMessageMutation({
  conversation,
  updateConversationAsync,
}: {
  conversation: Conversation;
  updateConversationAsync?: UseMutateAsyncFunction<
    Conversation,
    Error,
    Conversation
  >;
}) {
  const creativeChat = useCreativeChatMutation({
    conversationId: conversation.id,
  });
  const parametricChat = useParametricChatMutation({
    conversationId: conversation.id,
  });

  return useMutation({
    mutationKey: ['retry-message', conversation.id],
    mutationFn: async ({ model, id }: { model: Model; id: string }) => {
      if (!updateConversationAsync) {
        throw new Error('Cannot update conversation');
      }

      await updateConversationAsync({
        ...conversation,
        settings: {
          ...(typeof conversation.settings === 'object'
            ? conversation.settings
            : {}),
          model: model,
        },
        current_message_leaf_id: id,
      });

      if (conversation.type === 'creative') {
        creativeChat.mutateAsync({
          model: model,
          messageId: id,
          conversationId: conversation.id,
        });
      } else {
        parametricChat.mutateAsync({
          model: model,
          messageId: id,
          conversationId: conversation.id,
        });
      }
    },
    onError: (error) => {
      console.error('Retry message error:', error);
    },
  });
}

export function useRestoreMessageMutation() {
  const { mutateAsync: insertMessageAsync } = useInsertMessageMutation();

  return useMutation({
    mutationFn: async (messageToRestore: Message) => {
      await insertMessageAsync({
        role: messageToRestore.role,
        content: messageToRestore.content,
        parent_message_id: messageToRestore.parent_message_id ?? null,
        conversation_id: messageToRestore.conversation_id,
      });
    },
    onError: (error) => {
      console.error('Restore message error:', error);
    },
  });
}

export function useChangeRatingMutation({
  conversationId,
}: {
  conversationId: string;
}) {
  const queryClient = useQueryClient();
  const { mutateAsync: updateMessageOptimistic } =
    useUpdateMessageOptimisticMutation();

  const messages = queryClient.getQueryData<Message[]>([
    'messages',
    conversationId,
  ]);

  return useMutation({
    mutationKey: ['change-rating', conversationId],
    mutationFn: async ({
      messageId,
      rating,
    }: {
      messageId: string;
      rating: number;
    }) => {
      const oldMessage = messages?.find((msg) => msg.id === messageId);
      if (!oldMessage) return;
      updateMessageOptimistic({ message: { ...oldMessage, rating } });
    },
  });
}

export function useUpscaleMutation(_opts?: { conversation?: Conversation; updateConversationAsync?: unknown }) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ['upscale'],
    mutationFn: async (_args: { meshId: string; parentMessageId: string | null }) => {
      // Not supported in local mode
      console.warn('Upscale not supported in local mode');
      return null;
    },
    onError: (error) => {
      console.error('Upscale error:', error);
    },
  });
}
