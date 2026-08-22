"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { formatMessageTime } from "@/lib/format-message-time";
import { useChatsSearchParams } from "@/hooks/search-params";
import { useDebouncedCallback } from "@/hooks/use-debounced-callback";
import { cn } from "@/lib/utils";
import {
  Filter,
  Hash,
  MoreVertical,
  Pin,
  Search,
  Settings,
  UserPlus,
  Users,
  VolumeX,
} from "lucide-react";
import type { ChatConversation, ChatUser } from "../types";
import { useChat } from "../hooks/use-chat";

interface ConversationListProps {
  conversations: ChatConversation[];
  users: ChatUser[];
  selectedConversation: string | null;
  onSelectConversation: (conversationId: string) => void;
}

export function ChatConversationList({
  conversations,
  users,
  selectedConversation,
  onSelectConversation,
}: ConversationListProps) {
  const { searchQuery } = useChat();
  const [, setSearchParams] = useChatsSearchParams();

  const [searchValue, handleSearchChange] = useDebouncedCallback(
    searchQuery,
    (value) => setSearchParams({ search: value || null }),
  );

  const filteredConversations = conversations.filter((conversation) =>
    conversation.name.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const sortedConversations = filteredConversations.sort((a, b) => {
    if (a.isPinned && !b.isPinned) return -1;
    if (!a.isPinned && b.isPinned) return 1;

    return (
      new Date(b.lastMessage.timestamp).getTime() -
      new Date(a.lastMessage.timestamp).getTime()
    );
  });

  const getOnlineStatus = (conversation: ChatConversation) => {
    if (
      conversation.type === "direct" &&
      conversation.participants.length >= 1
    ) {
      const participantId = conversation.participants[0];
      const user = users.find((u) => u.id === participantId);
      return user?.status === "online";
    }
    return false;
  };

  return (
    <div className="flex flex-col h-full overflow-hidden">
      <div className="hidden lg:flex items-center justify-between h-16 px-4 border-b shrink-0">
        <h2 className="text-lg font-semibold">Messages</h2>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="sm"
              className="h-8 w-8 p-0 cursor-pointer"
            >
              <MoreVertical className="size-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem className="cursor-pointer">
              <UserPlus className="size-4 mr-2" />
              New Chat
            </DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer">
              <Filter className="size-4 mr-2" />
              Filter Messages
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="cursor-pointer">
              <Settings className="size-4 mr-2" />
              Chat Settings
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="px-4 py-3 border-b shrink-0">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 size-4 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search conversations..."
            value={searchValue}
            onChange={(e) => handleSearchChange(e.target.value)}
            className="pl-9 cursor-text"
          />
        </div>
      </div>

      <ScrollArea className="flex-1 h-0 min-h-0">
        <div className="p-2 space-y-1">
          {sortedConversations.map((conversation) => (
            <div
              key={conversation.id}
              className={cn(
                "flex items-center gap-3 p-3 rounded-xl cursor-pointer relative overflow-hidden transition-all duration-200",
                selectedConversation === conversation.id
                  ? "bg-primary/10 text-accent-foreground shadow-sm"
                  : "hover:bg-accent/50",
              )}
              onClick={() => onSelectConversation(conversation.id)}
            >
              <div className="relative shrink-0">
                <Avatar
                  className={cn(
                    "h-12 w-12 transition-all",
                    selectedConversation === conversation.id &&
                      "ring-2 ring-primary ring-offset-2 ring-offset-background",
                  )}
                >
                  <AvatarImage
                    src={conversation.avatar}
                    alt={conversation.name}
                  />
                  <AvatarFallback className="text-sm bg-primary/10">
                    {conversation.type === "group" ? (
                      <Users className="size-5 text-primary" />
                    ) : (
                      conversation.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")
                        .slice(0, 2)
                    )}
                  </AvatarFallback>
                </Avatar>

                {conversation.type === "direct" &&
                  getOnlineStatus(conversation) && (
                    <div className="absolute bottom-0 right-0 h-3.5 w-3.5 bg-green-500 border-2 border-background rounded-full animate-pulse" />
                  )}

                {conversation.type === "group" && (
                  <div className="absolute bottom-0 right-0 size-4 bg-primary border-2 border-background rounded-full flex items-center justify-center">
                    <Hash className="size-2 text-white" />
                  </div>
                )}
              </div>

              <div className="flex-1 min-w-0 overflow-hidden">
                <div className="flex items-center justify-between mb-1 min-w-0">
                  <div className="flex items-center gap-1 min-w-0 flex-1 overflow-hidden pr-2">
                    <h3 className="font-medium truncate min-w-0 max-w-[160px] lg:max-w-[180px]">
                      {conversation.name}
                    </h3>
                    {conversation.isPinned && (
                      <Pin className="size-3 text-muted-foreground shrink-0" />
                    )}
                    {conversation.isMuted && (
                      <VolumeX className="size-3 text-muted-foreground shrink-0" />
                    )}
                  </div>
                  <span className="text-xs text-muted-foreground shrink-0 whitespace-nowrap">
                    {formatMessageTime(conversation.lastMessage.timestamp)}
                  </span>
                </div>

                <div className="flex items-center justify-between gap-2 min-w-0">
                  <p className="text-sm text-muted-foreground truncate flex-1 min-w-0 max-w-[180px] lg:max-w-[200px] pr-2">
                    {conversation.lastMessage.content}
                  </p>

                  {conversation.unreadCount > 0 && (
                    <Badge
                      variant="default"
                      className="min-w-[20px] h-5 text-xs cursor-pointer shrink-0"
                    >
                      {conversation.unreadCount > 99
                        ? "99+"
                        : conversation.unreadCount}
                    </Badge>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}
