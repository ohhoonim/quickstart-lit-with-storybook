import { html } from 'lit';
import './daterangepicker.css';

export interface DateRangePickerProps {
  startDate?: string;
  endDate?: string;
  minDate?: string;
  maxDate?: string;
  onRangeChange?: (range: { start: string, end: string }) => void;
}

/** DateRangePicker component */
export const DateRangePicker = ({
  startDate = '',
  endDate = '',
  minDate = '',
  maxDate = '',
  onRangeChange
}: DateRangePickerProps) => {
  const handleStartChange = (e: Event) => {
    const start = (e.target as HTMLInputElement).value;
    if (onRangeChange) {
      onRangeChange({ start, end: endDate });
    }
  };

  const handleEndChange = (e: Event) => {
    const end = (e.target as HTMLInputElement).value;
    if (onRangeChange) {
      onRangeChange({ start: startDate, end });
    }
  };

  return html`
    <div class="biz-date-range-picker">
      <div class="input-group">
        <label>시작일</label>
        <input 
          type="date" 
          .value=${startDate} 
          .min=${minDate} 
          .max=${maxDate || endDate}
          @change=${handleStartChange}
        >
      </div>
      <span class="separator">~</span>
      <div class="input-group">
        <label>종료일</label>
        <input 
          type="date" 
          .value=${endDate} 
          .min=${minDate || startDate} 
          .max=${maxDate}
          @change=${handleEndChange}
        >
      </div>
    </div>
  `;
};
