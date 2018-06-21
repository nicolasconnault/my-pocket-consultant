import React from 'react'
import { Video } from 'expo';
import MyVideoPlayer from '@expo/videoplayer';
import { STORAGE_URL } from '../config'

class VideoPlayer extends React.Component {

  render() {
    return (
        <MyVideoPlayer
          videoProps={{
            shouldPlay: true,
            resizeMode: Video.RESIZE_MODE_CONTAIN,
            source: {
              uri: STORAGE_URL + 'videos/' + this.props.navigation.getParam('uri'),
            },
          }}
          isPortrait={true}
          playFromPositionMillis={0}
        />
    )
  }
}

export default VideoPlayer
