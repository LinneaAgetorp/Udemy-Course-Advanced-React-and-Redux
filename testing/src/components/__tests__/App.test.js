import React from 'react';
import { shallow } from 'enzyme';
import App from 'components/App';
import CommentBox from 'components/CommentBox';
import CommentList from 'components/CommentList';

let wrapped;

beforeEach(() => {
    wrapped = shallow(<App/>);
});

it('shows a comment box', () => {

// look inside App to see if comment box is there
expect(wrapped.find(CommentBox).length).toEqual(1)

});


it('shows a comment list', () => {

// look inside App to see if the comment list is there
    expect(wrapped.find(CommentList).length).toEqual(1)

});