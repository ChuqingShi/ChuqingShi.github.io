import { isPlaceholder, type Fillable, type Placeholder } from '../content/types'
import './FillableText.css'

// Renders content that might not be written yet.
//
// Real text renders normally. A `{ placeholder: '...' }` renders as a dashed
// "To fill in" box with the writing prompt, so missing content is obvious on
// the page and nothing invented passes for Chuqing's own words.

type FillableTextProps = {
  value: Fillable
  /** Which element real text renders as. */
  as?: 'p' | 'span'
  className?: string
}

export default function FillableText({ value, as: Tag = 'p', className }: FillableTextProps) {
  if (isPlaceholder(value)) return <PlaceholderNote placeholder={value} />
  return <Tag className={className}>{value}</Tag>
}

export function PlaceholderNote({ placeholder }: { placeholder: Placeholder }) {
  return (
    <span className="placeholder" role="note">
      <span className="placeholder__label">To fill in</span> {placeholder.placeholder}
    </span>
  )
}
