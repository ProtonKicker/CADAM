// Minimal type definitions for the local server
// Derived from shared/types.ts in the main project

export type Model = string;

export type ToolCall = {
  name: string;
  status: 'pending' | 'error';
  id?: string;
};

export type ParameterOption = { value: string | number; label: string };
export type ParameterRange = { min?: number; max?: number; step?: number };
export type ParameterType =
  | 'string'
  | 'number'
  | 'boolean'
  | 'string[]'
  | 'number[]'
  | 'boolean[]';

export type Parameter = {
  name: string;
  displayName: string;
  value: string | boolean | number | string[] | number[] | boolean[];
  defaultValue: string | boolean | number | string[] | number[] | boolean[];
  type?: ParameterType;
  description?: string;
  group?: string;
  range?: ParameterRange;
  options?: ParameterOption[];
  maxLength?: number;
};

export type ParametricArtifact = {
  title: string;
  version: string;
  code: string;
  parameters: Parameter[];
  suggestions?: string[];
};

export type Content = {
  text?: string;
  model?: Model;
  error?: string;
  artifact?: ParametricArtifact;
  images?: string[];
  mesh?: { id: string; fileType: string };
  toolCalls?: ToolCall[];
};

export type Message = {
  id: string;
  conversation_id: string;
  role: 'user' | 'assistant';
  content: Content;
  parent_message_id: string | null;
  created_at?: string;
};

export type CoreMessage = Pick<Message, 'id' | 'role' | 'content'>;
