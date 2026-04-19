import { html } from 'lit';
import { repeat } from 'lit/directives/repeat.js';
import './combobox.css';

export interface ComboOption {
  label: string;
  value: string | number;
}

export interface ComboBoxProps {
  options: ComboOption[];
  multiple?: boolean;
  searchable?: boolean;
  placeholder?: string;
  value?: any;
  isOpen?: boolean;
  searchQuery?: string;
  onToggle?: (e: Event) => void;
  onClose?: () => void;
  onInput?: (e: InputEvent) => void;
  onSelect?: (option: ComboOption) => void;
  onRemoveChip?: (val: any, e: Event) => void;
}

/** ComboBox component */
export const ComboBox = ({
  options = [],
  multiple = false,
  searchable = false,
  placeholder = 'Select options...',
  value = null,
  isOpen = false,
  searchQuery = '',
  onToggle,
  onClose,
  onInput,
  onSelect,
  onRemoveChip
}: ComboBoxProps) => {
  const selectedValues = multiple
    ? (Array.isArray(value) ? value : [])
    : (value !== null && value !== undefined ? [value] : []);

  const filteredOptions = (!searchable || !searchQuery)
    ? options
    : options.filter(opt => opt.label.toLowerCase().includes(searchQuery.toLowerCase()));

  const selectedOptions = options.filter(opt => selectedValues.includes(opt.value));

  return html`
    <div class="overlay ${isOpen ? 'open' : ''}" @click=${onClose}></div>
    <div class="combo-container" @click=${onToggle}>
      ${multiple ? html`
        ${repeat(selectedOptions, (opt) => opt.value, (opt) => html`
          <div class="chip">
            ${opt.label}
            <span class="chip-remove" @click=${(e: Event) => onRemoveChip?.(opt.value, e)}>&times;</span>
          </div>
        `)}
      ` : !searchable && selectedOptions.length > 0 ? html`<span>${selectedOptions[0].label}</span>` : ''}
      
      <input 
        type="text" 
        .value=${searchQuery}
        placeholder=${selectedOptions.length === 0 || multiple ? placeholder : ''}
        ?readonly=${!searchable}
        @input=${onInput}
      />
    </div>

    <div class="dropdown ${isOpen ? 'open' : ''}">
      ${filteredOptions.length > 0 ? repeat(filteredOptions, (opt) => opt.value, (opt) => html`
        <div 
          class="option ${selectedValues.includes(opt.value) ? 'selected' : ''}" 
          @click=${() => onSelect?.(opt)}
        >
          ${opt.label}
        </div>
      `) : html`<div class="no-options">No results found</div>`}
    </div>
  `;
};
