import React from 'react'
import type { AirQualityCategory } from '../../types'
import { getCategoryBadgeColor } from '../../services/airQualityService'

interface CategoryBadgeProps {
  category: AirQualityCategory
  showDot?: boolean
  className?: string
}

export const CategoryBadge: React.FC<CategoryBadgeProps> = ({
  category,
  showDot = true,
  className = '',
}) => {
  const badge = getCategoryBadgeColor(category)

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 text-xs font-bold rounded-full border ${badge.bg} ${badge.border} ${badge.text} ${className}`}
    >
      {showDot && (
        <span
          className="w-1.5 h-1.5 rounded-full shrink-0"
          style={{ backgroundColor: badge.hex }}
        />
      )}
      <span>{category}</span>
    </span>
  )
}
