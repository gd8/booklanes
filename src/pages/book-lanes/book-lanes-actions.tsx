import { Component } from 'react';
import { Lanes } from '../../shared/lanes';
export class BookLanesActions extends Component<
  { updateLanes: any },
  { size: number; selected: any }
> {
  constructor(props) {
    super(props);
    const selected = Lanes.map((lane) => lane.id);
    this.state = { size: 1, selected };
  }

  onMouseOver() {
    this.setState({ size: 4 });
  }

  onMouseOut() {
    this.setState({ size: 1 });
  }

  onChange(event) {
    this.setState({ selected: [] });
    const optionValue = event.target.value;
    const optionSelected = this.state.selected.find(
      (status) => status === optionValue
    );
    let newSelection = [];
    if (optionSelected) {
      newSelection = this.state.selected.filter(
        (status) => status !== optionValue
      );
    } else {
      newSelection = this.state.selected.concat(optionValue);
    }
    this.setState({ selected: newSelection });
    this.props.updateLanes(newSelection);
  }

  render() {
    return (
      <div className='container'>
        <div className='field'>
          <label className='label'>Statuses</label>
          <div className='control'>
            <div
              style={{ position: 'relative', height: '50px', width: '150px' }}
              className='select is-multiple'
              onMouseEnter={this.onMouseOver.bind(this)}
              onMouseLeave={this.onMouseOut.bind(this)}
            >
              <select
                style={{ position: 'absolute' }}
                multiple
                size={this.state.size}
                value={this.state.selected}
                onChange={this.onChange.bind(this)}
              >
                <option disabled={true}>Select Statuses</option>
                {Lanes.map((lane) => {
                  const optionSelected = this.state.selected.find(
                    (status) => status === lane.id
                  );
                  return (
                    <option key={lane.id} value={lane.id}>
                      {lane.description}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
