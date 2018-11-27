import VideoList from './VideoList.js';
import VideoPlayer from './VideoPlayer.js';
import Search from './Search.js';
import exampleVideoData from '/src/data/exampleVideoData.js';
import searchYouTube from '/src/lib/searchYoutube.js';
import YOUTUBE_API_KEY from '/src/config/youtube.js';

// var App = () => (
//   <div>
//     <nav className="navbar">
//       <div className="col-md-6 offset-md-3">
//         <div><h5><em>search</em> view goes here</h5></div>
//       </div>
//     </nav>
//     <div className="row">
//       <div className="col-md-7">
//         <div><h5><em>videoPlayer</em><VideoPlayer video={exampleVideoData[1]}/></h5></div>
//       </div>
//       <div className="col-md-5">
//         <div><h5><em>videoList</em><VideoList videos={exampleVideoData}/></h5></div>
//       </div>
//     </div>
//   </div>
// );

class App extends React.Component {  
  
  constructor(props) {
    super(props);
    this.state = {
      currentVideoList: exampleVideoData,
      currentVideo: exampleVideoData[0]
    };
    this.onVideoListEntryClick = this.onVideoListEntryClick.bind(this);
    this.onSearchChange = this.onSearchChange.bind(this);
    this.delayedOnSearchChange = _.debounce(this.searchDebounced, 1500);
  }
  
  componentDidMount() {
    searchYouTube({key: `${YOUTUBE_API_KEY}`,
      max: '5',
      query: 'Hack Reactor'}, (data) => {
      this.setState({currentVideoList: data, currentVideo: data[0]});
    });
  }

  onVideoListEntryClick(clickedVideo) {
    this.setState({
      currentVideo: clickedVideo
    });
  }

  searchDebounced(event) {
    const value = event.target.value;
    searchYouTube({
      key: `${YOUTUBE_API_KEY}`,
      max: '5',
      query: `${value}`
    }, (data) => {
      this.setState({ currentVideoList: data, currentVideo: data[0] });
    });
  }
  
  onSearchChange(event) {
    event.persist();
    this.delayedOnSearchChange(event);
  }

  
  render() {
    return (<div>
      <nav className="navbar">
        <div className="col-md-6 offset-md-3">
          <div><h5><em>search</em><Search searchFunc={this.onSearchChange.bind(this)}/></h5></div>
        </div>
      </nav>
      <div className="row">
        <div className="col-md-7">
          <div><h5><em>videoPlayer</em><VideoPlayer video={this.state.currentVideo}/></h5></div>
        </div>
        <div className="col-md-5">
          <div><h5><em>videoList</em><VideoList videos={this.state.currentVideoList} clickFunc={this.onVideoListEntryClick}/></h5></div>
        </div>
      </div>
    </div>);
  }
}

// In the ES6 spec, files are "modules" and do not share a top-level scope
// `var` declarations will only exist globally where explicitly defined
export default App;
