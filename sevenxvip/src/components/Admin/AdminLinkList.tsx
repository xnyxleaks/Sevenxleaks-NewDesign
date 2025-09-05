import React, { useRef, useCallback } from "react";
import { useVirtualizer } from "@tanstack/react-virtual";
import { Edit2, Trash2, LinkIcon, ExternalLink } from "lucide-react";
import { LinkItem } from "../../utils/index";
import { useTheme } from "../../contexts/ThemeContext";

// Interface corrigida para incluir apenas as props que este componente usa.
export interface AdminLinkListProps {
  links: LinkItem[];
  isLoading: boolean;
  handleEditLink: (id: number) => void;
  handleDeleteLink: (id: number) => Promise<void>;
  hasMore: boolean;
  loadMore: () => void;
}

const AdminLinkList: React.FC<AdminLinkListProps> = ({
  links = [],
  isLoading,
  handleEditLink,
  handleDeleteLink,
  hasMore,
  loadMore,
}) => {
  const parentRef = useRef<HTMLDivElement>(null);
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const rowVirtualizer = useVirtualizer({
    count: links.length,
    getScrollElement: () => parentRef.current,
    estimateSize: useCallback(() => 200, []),
    overscan: 5,
  });

  const handleScroll = useCallback(
    (e: React.UIEvent<HTMLDivElement>) => {
      const target = e.target as HTMLDivElement;
      if (
        target.scrollHeight - target.scrollTop <= target.clientHeight * 1.5 &&
        hasMore &&
        !isLoading
      ) {
        loadMore();
      }
    },
    [hasMore, isLoading, loadMore]
  );

  if (isLoading && links.length === 0) {
    return (
      <div className="flex items-center justify-center py-12">
        <div
          className={`animate-spin h-8 w-8 border-4 rounded-full border-t-transparent ${
            isDark ? "border-blue-500" : "border-blue-600"
          }`}
        ></div>
      </div>
    );
  }

  return (
    <div
      ref={parentRef}
      onScroll={handleScroll}
      className="h-[600px] overflow-auto"
      style={{ contain: "strict" }}
    >
      <div
        style={{
          height: `${rowVirtualizer.getTotalSize()}px`,
          width: "100%",
          position: "relative",
        }}
      >
        {rowVirtualizer.getVirtualItems().map((virtualRow) => {
          const link = links[virtualRow.index];
          return (
            <div
              key={link.id}
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: `${virtualRow.size}px`,
                transform: `translateY(${virtualRow.start}px)`,
              }}
            >
              <div
                className={`border rounded-lg p-4 m-2 ${
                  isDark ? "bg-gray-700/30 border-gray-600" : "bg-gray-100/50 border-gray-300"
                }`}
              >
                <div className="flex items-start justify-between gap-4 mb-3">
                  <div className="flex-1">
                    <h3
                      className={`font-medium text-lg ${
                        isDark ? "text-white" : "text-gray-900"
                      }`}
                    >
                      {link.name}
                    </h3>
                    <div className="flex items-center gap-2 mt-1">
                      <span
                        className={`px-2 py-1 rounded-full text-xs ${
                          isDark ? "bg-gray-700 text-gray-300" : "bg-gray-200 text-gray-700"
                        }`}
                      >
                        {link.category}
                      </span>
                      <span
                        className={`text-xs ${isDark ? "text-gray-400" : "text-gray-600"}`}
                      >
                        {new Date(link.postDate).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleEditLink(link.id!)}
                      className="p-2 bg-yellow-600 hover:bg-yellow-700 rounded-lg transition-colors"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDeleteLink(link.id!)}
                      className="p-2 bg-red-600 hover:bg-red-700 rounded-lg transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div
                  className={`space-y-2 text-sm ${
                    isDark ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <LinkIcon className="w-4 h-4" />
                    <span className="truncate">{link.mega}</span>
                    <a
                      href={link.mega}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`p-1 rounded-full transition-colors ${
                        isDark ? "hover:bg-gray-600" : "hover:bg-gray-200"
                      }`}
                    >
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>

                  {link.pixeldrain && (
                    <div className="flex items-center gap-2">
                      <LinkIcon className="w-4 h-4" />
                      <span className="text-xs">Pixeldrain:</span>
                      <span className="truncate">{link.pixeldrain}</span>
                    </div>
                  )}

                  {link.mega2 && (
                    <div className="flex items-center gap-2">
                      <LinkIcon className="w-4 h-4" />
                      <span className="text-xs">MEGA 2:</span>
                      <span className="truncate">{link.mega2}</span>
                    </div>
                  )}

                  <div className="grid grid-cols-3 gap-2 mt-2">
                    {link.AdmavenMega && (
                      <div className="flex items-center gap-1 text-xs">
                        <span>AdmavenMega:</span>
                        <span className="truncate">{link.AdmavenMega}</span>
                      </div>
                    )}
                    {link.AdmavenMega2 && (
                      <div className="flex items-center gap-1 text-xs">
                        <span>AdmavenMega2:</span>
                        <span className="truncate">{link.AdmavenMega2}</span>
                      </div>
                    )}
                    {link.AdmavenPixeldrain && (
                      <div className="flex items-center gap-1 text-xs">
                        <span>AdmavenPixeldrain:</span>
                        <span className="truncate">{link.AdmavenPixeldrain}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      {isLoading && links.length > 0 && (
        <div className="flex justify-center py-4">
          <div
            className={`animate-spin h-8 w-8 border-4 rounded-full border-t-transparent ${
              isDark ? "border-blue-500" : "border-blue-600"
            }`}
          ></div>
        </div>
      )}
      {!isLoading && !hasMore && links.length > 0 && (
        <div className={`text-center py-4 ${isDark ? "text-gray-400" : "text-gray-600"}`}>
          No more content to load
        </div>
      )}
      {links.length === 0 && (
        <div className={`text-center py-12 ${isDark ? "text-gray-400" : "text-gray-600"}`}>
          No content found
        </div>
      )}
    </div>
  );
};

export default React.memo(AdminLinkList);