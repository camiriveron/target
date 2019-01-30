import React, { Fragment, Component } from 'react';
import { connect } from 'react-redux';
import { array, func } from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { getMatches } from 'actions/matchesActions';
import UserAvatar from 'resources/icons/UserAvatar';

class Matches extends Component {
  componentDidMount() {
    const { matches, getMatches } = this.props;

    !matches && getMatches();
  }

  render() {
    const { matches } = this.props;

    return (
      <Fragment>
        {matches && matches.length ?
          (
            <h2 className="subtitle center">
              <FormattedMessage id="matches.list.title" />
              <div className="list">
                {matches.map((match, key) => (
                  <div className="list-item" key={key}>
                    <div className="smallthumb">
                      <span className="avatar" onClick={this.toggleSideMenu}>
                        {match.user.avatar.smallThumbUrl ? <div className="preview"><img alt="Avatar" src={match.user.avatar.smallThumbUrl} /></div> : <UserAvatar />}
                      </span>
                    </div>
                    {match.user.fullName}
                  </div>
                ))}
              </div>
            </h2>
          ) :
          (
            <h2 className="subtitle center">
              <FormattedMessage id="home.sidebar.noMatches" />
            </h2>
          )}
      </Fragment>
    );
  }
}

Matches.propTypes = {
  matches: array,
  getMatches: func.isRequired
};

const mapStateToProps = state => ({
  matches: state.getIn(['matches', 'matches'])
});

const mapDispatch = ({
  getMatches
});

export default connect(mapStateToProps, mapDispatch)(Matches);
