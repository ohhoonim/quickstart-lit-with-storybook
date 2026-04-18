import { LitElement, html, css } from 'lit';
import { customElement, property, state, query } from 'lit/decorators.js';
import { repeat } from 'lit/directives/repeat.js';

export interface ComboOption {
  label: string;
  value: string | number;
}

@customElement('biz-combo-box')
export class BizComboBox extends LitElement {
  @property({ type: Array }) options: ComboOption[] = [];
  @property({ type: Boolean }) multiple = false;
  @property({ type: Boolean }) searchable = false;
  @property({ type: String }) placeholder = 'Select options...';
  
  // value can be single (string|number) or array depending on multiple property
  @property({ type: Object }) value: any = null;

  @state() private _isOpen = false;
  @state() private _searchQuery = '';
  @query('input') private _inputElement!: HTMLInputElement;

  static styles = css`
    :host {
      display: block;
      font-family: sans-serif;
      position: relative;
      width: 100%;
      min-width: 200px;
    }

    .combo-container {
      border: 1px solid #ccc;
      border-radius: 4px;
      padding: 4px 8px;
      display: flex;
      flex-wrap: wrap;
      gap: 4px;
      align-items: center;
      background: white;
      cursor: pointer;
      min-height: 32px;
    }

    .combo-container:focus-within {
      border-color: #3498db;
      box-shadow: 0 0 0 2px rgba(52, 152, 219, 0.2);
    }

    .chip {
      background: #e1f5fe;
      border: 1px solid #b3e5fc;
      border-radius: 16px;
      padding: 2px 8px;
      font-size: 0.85em;
      display: flex;
      align-items: center;
      gap: 4px;
    }

    .chip-remove {
      cursor: pointer;
      font-weight: bold;
      color: #0288d1;
    }

    input {
      border: none;
      outline: none;
      flex: 1;
      min-width: 60px;
      padding: 4px 0;
      font-size: 1em;
    }

    .dropdown {
      position: absolute;
      top: 100%;
      left: 0;
      right: 0;
      background: white;
      border: 1px solid #ccc;
      border-top: none;
      border-radius: 0 0 4px 4px;
      max-height: 200px;
      overflow-y: auto;
      z-index: 100;
      box-shadow: 0 4px 6px rgba(0,0,0,0.1);
      display: none;
    }

    .dropdown.open {
      display: block;
    }

    .option {
      padding: 8px 12px;
      cursor: pointer;
    }

    .option:hover {
      background-color: #f5f5f5;
    }

    .option.selected {
      background-color: #e3f2fd;
      color: #1976d2;
    }

    .no-options {
      padding: 8px 12px;
      color: #888;
      font-style: italic;
    }

    .overlay {
      position: fixed;
      top: 0; left: 0; right: 0; bottom: 0;
      z-index: 90;
      display: none;
    }
    .overlay.open { display: block; }
  `;

  private get _selectedValues(): any[] {
    if (this.multiple) {
      return Array.isArray(this.value) ? this.value : [];
    }
    return this.value !== null && this.value !== undefined ? [this.value] : [];
  }

  private get _filteredOptions() {
    if (!this.searchable || !this._searchQuery) return this.options;
    const query = this._searchQuery.toLowerCase();
    return this.options.filter(opt => opt.label.toLowerCase().includes(query));
  }

  private _toggleDropdown(e: Event) {
    if (this._isOpen) return;
    this._isOpen = true;
    if (this.searchable) {
      setTimeout(() => this._inputElement.focus(), 0);
    }
  }

  private _closeDropdown() {
    this._isOpen = false;
    this._searchQuery = '';
    if (this._inputElement) this._inputElement.value = '';
  }

  private _handleInput(e: InputEvent) {
    this._searchQuery = (e.target as HTMLInputElement).value;
    if (!this._isOpen) this._isOpen = true;
  }

  private _selectOption(option: ComboOption) {
    let newValue;
    if (this.multiple) {
      const current = this._selectedValues;
      if (current.includes(option.value)) {
        newValue = current.filter(v => v !== option.value);
      } else {
        newValue = [...current, option.value];
      }
    } else {
      newValue = option.value;
      this._closeDropdown();
    }

    this.value = newValue;
    this._dispatchEvent();
  }

  private _removeChip(val: any, e: Event) {
    e.stopPropagation();
    if (this.multiple) {
      this.value = this._selectedValues.filter(v => v !== val);
      this._dispatchEvent();
    }
  }

  private _dispatchEvent() {
    this.dispatchEvent(new CustomEvent('change', {
      detail: { value: this.value },
      bubbles: true,
      composed: true
    }));
  }

  render() {
    const selectedOptions = this.options.filter(opt => this._selectedValues.includes(opt.value));
    const filtered = this._filteredOptions;

    return html`
      <div class="overlay ${this._isOpen ? 'open' : ''}" @click=${this._closeDropdown}></div>
      <div class="combo-container" @click=${this._toggleDropdown}>
        ${this.multiple ? html`
          ${repeat(selectedOptions, (opt) => opt.value, (opt) => html`
            <div class="chip">
              ${opt.label}
              <span class="chip-remove" @click=${(e: Event) => this._removeChip(opt.value, e)}>&times;</span>
            </div>
          `)}
        ` : !this.searchable && selectedOptions.length > 0 ? html`<span>${selectedOptions[0].label}</span>` : ''}
        
        <input 
          type="text" 
          .value=${this._searchQuery}
          placeholder=${selectedOptions.length === 0 || this.multiple ? this.placeholder : ''}
          ?readonly=${!this.searchable}
          @input=${this._handleInput}
        />
      </div>

      <div class="dropdown ${this._isOpen ? 'open' : ''}">
        ${filtered.length > 0 ? repeat(filtered, (opt) => opt.value, (opt) => html`
          <div 
            class="option ${this._selectedValues.includes(opt.value) ? 'selected' : ''}" 
            @click=${() => this._selectOption(opt)}
          >
            ${opt.label}
          </div>
        `) : html`<div class="no-options">No results found</div>`}
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'biz-combo-box': BizComboBox;
  }
}
