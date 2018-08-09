import React, {Component } from 'react';
import requireAuth from './requireAuth';

class Feature extends Component {
    render() {
        return (
            <div>
                This is the Feature, only visible on logged in
            </div>
        )
    }
}

export default requireAuth(Feature);