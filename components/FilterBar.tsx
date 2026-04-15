'use client';

import { FilterType } from '@/app/page';

interface FilterBarProps {
  filter: FilterType;
  onFilterChange: (filter: FilterType) => void;
  activeTodoCount: number;
  completedTodoCount: number;
  onClearCompleted: () => void;
}

export default function FilterBar({
  filter,
  onFilterChange,
  activeTodoCount,
  completedTodoCount,
  onClearCompleted
}: FilterBarProps) {
  const filters: FilterType[] = ['all', 'active', 'completed'];

  return (
    <div className="flex items-center justify-between">
      <div className="flex gap-1">
        {filters.map((f) => (
          <button
            key={f}
            onClick={() => onFilterChange(f)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium capitalize transition-all ${
              filter === f
                ? 'bg-orange-100 text-orange-700'
                : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
            }`}
          >
            {f}
          </button>
        ))}
      </div>
      {completedTodoCount > 0 && (
        <button
          onClick={onClearCompleted}
          className="text-xs text-gray-400 hover:text-red-500 transition-colors"
        >
          Clear completed ({completedTodoCount})
        </button>
      )}
    </div>
  );
}
