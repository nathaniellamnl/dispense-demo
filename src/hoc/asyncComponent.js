import React, {Component} from 'react';


const asyncComponent = (importComponent) => {
    const state = {
        component: null
    }

    return class extends Component {

        componentDidMount () {
            importComponent()
            .then(cmp => {
                this.setState({component: cmp.default});
            });
        }

        render () {
            const C = this.state.component;

            return C ? <C {...this.props} /> :null;
        }
    }
}

export default asyncComponent;