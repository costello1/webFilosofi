import React from 'react';
import YouTube from 'react-youtube';

export default class Player extends React.Component {
    videoOnReady(event) { event.target.pauseVideo() }

    render() {
        const opts = {
            height: '100%',
            width: '100%',
            playerVars: { autoplay: 0 },
            background: '#1E262D',
            boxshadow: '8px 8px 8px 0 rgb(0 0 0 / 20%) -8px -8px 8px 0 rgb(255 255 255 / 4%) !important',
        };
        const { videoId } = this.props;
        return <YouTube videoId={videoId} opts={opts} onReady={this.videoOnReady} />;
    }
};