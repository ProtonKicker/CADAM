import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate, useParams } from 'react-router-dom';
import { Loader2 } from 'lucide-react';
import { CreativeEditorView } from './CreativeEditorView';
import { ParametricEditorView } from './ParametricEditorView';
import { ConversationContext } from '@/contexts/ConversationContext';
import { Conversation, Message } from '@shared/types';
import { useEffect, useMemo, useState } from 'react';
import { CurrentMessageContext } from '@/contexts/CurrentMessageContext';

export default function EditorView() {
  const { id: conversationId } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [currentMessage, setCurrentMessage] = useState<Message | null>(null);

  // Create a minimal conversation from the URL ID
  const conversation = useMemo((): Conversation => {
    // Try to find an existing conversation in the cache
    const cached = queryClient.getQueryData<Conversation>([
      'conversation',
      conversationId,
    ]);
    if (cached) return cached;

    // Otherwise create a minimal one
    return {
      id: conversationId || '',
      title: 'New Conversation',
      type: 'parametric',
      privacy: 'private',
      current_message_leaf_id: null,
      user_id: 'local-user',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      settings: { model: 'qwen2.5-coder:7b' },
    };
  }, [conversationId, queryClient]);

  const { mutate: updateConversation, mutateAsync: updateConversationAsync } =
    useMutation({
      mutationFn: async (conv: Conversation) => {
        // Just update the React Query cache — no server call
        queryClient.setQueryData(['conversation', conv.id], conv);
        return conv;
      },
      onSuccess(conv) {
        queryClient.setQueryData(['conversation', conv.id], conv);
      },
    });

  useEffect(() => {
    if (!conversationId) {
      navigate('/');
    }
  }, [conversationId, navigate]);

  if (!conversationId) {
    return (
      <div className="flex h-full w-full items-center justify-center bg-adam-bg-secondary-dark text-adam-text-primary">
        <Loader2 className="h-10 w-10 animate-spin" />
      </div>
    );
  }

  return (
    <CurrentMessageContext.Provider
      value={{ currentMessage, setCurrentMessage }}
    >
      <ConversationContext.Provider
        value={{ conversation, updateConversation, updateConversationAsync }}
      >
        {conversation.type === 'creative' ? (
          <CreativeEditorView />
        ) : (
          <ParametricEditorView />
        )}
      </ConversationContext.Provider>
    </CurrentMessageContext.Provider>
  );
}
