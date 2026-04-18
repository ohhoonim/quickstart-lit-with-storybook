import { LitElement , html } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { TodayYourStatus } from './TodayYourStatus'; './TodayYourStatus';

// interface TodayYourStatus { today: string , status: string }

@customElement('welcome-banner')
class WelcomeBanner extends LitElement {
  @property({type: String})
  name = '';
  @property({type: String})
  today= '2026-10-20'
  
  @property({type: String})
  status= ''; 

  render() {
    return html`
      <h1>Hello, ${this.name}</h1> 
      <today-your-status today=${this.today} status=${this.status} />
    `;
  }
}
