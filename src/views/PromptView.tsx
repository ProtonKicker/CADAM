import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import TextAreaChat from '@/components/TextAreaChat';
import { useMutation } from '@tanstack/react-query';
import { useState, useMemo, useEffect } from 'react';
import { Content, Conversation } from '@shared/types';
import { useIsMobile } from '@/hooks/useIsMobile';
import { cn } from '@/lib/utils';
import { useSendContentMutation } from '@/services/messageService';

export function PromptView() {
  const navigate = useNavigate();
  const isMobile = useIsMobile();

  const [type, setType] = useState<'parametric' | 'creative'>('parametric');
  const [model, setModel] = useState('qwen2.5-coder:7b');
  const [isLoaded, setIsLoaded] = useState(false);

  const newConversationId = useMemo(() => crypto.randomUUID(), []);

  const { mutate: sendMessage } = useSendContentMutation({
    conversation: {
      id: newConversationId,
      user_id: 'local-user',
      type: type,
      settings: { model },
      current_message_leaf_id: null,
    },
  });

  useEffect(() => {
    const frame = requestAnimationFrame(() => setIsLoaded(true));
    return () => cancelAnimationFrame(frame);
  }, []);

  const { mutate: handleGenerate } = useMutation({
    mutationFn: async (content: Content) => {
      sendMessage(content);
      return { conversationId: newConversationId, content };
    },
    onSuccess: (data) => {
      navigate(`/editor/${data.conversationId}`);
    },
    onError: (error) => {
      console.error('Failed to process prompt:', error);
    },
  });

  return (
    <div
      className={cn(
        'relative h-full min-h-full w-full transition-all duration-300 ease-in-out',
      )}
    >
      <div className="h-full min-h-full bg-adam-bg-secondary-dark">
        <main className="flex h-full w-full flex-col items-center justify-center px-4 md:px-8">
          <div className="mx-auto flex max-w-3xl flex-col items-center justify-center">
            <h1
              className={cn(
                'mb-8 text-center text-2xl font-medium text-adam-text-primary md:text-3xl lg:text-4xl',
                'motion-safe:transition-opacity motion-safe:duration-1000 motion-safe:ease-out',
                isLoaded ? 'opacity-100' : 'opacity-0',
              )}
            >
              CADAM — Local Text to CAD
            </h1>
            <p className="mb-8 text-center text-adam-text-secondary">
              Describe a 3D model in natural language and Adam will generate it
              for you.
            </p>
          </div>
          <div className="flex w-full flex-col items-center">
            <div className="w-full max-w-3xl space-y-4 pb-12">
              <TextAreaChat
                onSubmit={handleGenerate}
                conversation={{
                  id: newConversationId,
                  user_id: 'local-user',
                }}
                placeholder="Describe a 3D model... e.g. 'a coffee mug with a handle'"
                type={type}
                model={model}
                setModel={setModel}
                showPromptGenerator={false}
                showFullLabels={true}
                onTypeChange={setType}
              />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
