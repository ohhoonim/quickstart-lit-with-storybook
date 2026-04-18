import { LitElement , html } from 'lit'
import { customElement, property } from 'lit/decorators.js'

@customElement('today-your-status')
export class TodayYourStatus extends LitElement {
  @property({type: String})
  today = '';

  @property({type: String})
  status = '';

  render() {
    return html`
      <div>
        Today is ${this.today}, your are ${this.status} 
      </div> 
    `;
  }
}

