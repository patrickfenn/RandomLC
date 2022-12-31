import './App.css';
import img from './guy_on_pc.jpg';
import Multiselect from 'multiselect-react-dropdown';
import React, { Component } from 'react';
import tags from './tags.txt';
import DocumentMeta from 'react-document-meta';


class App extends Component {
  componentDidMount(){
    document.title = "Random LC";
    this.readTags();
  }

  constructor() {
    super();
    this.state = { 
      difficultyOptions: ["Easy", "Medium", "Hard"],
      acceptanceOptions: this.range(10,90,10),
      topicOptions: [],
      selectedDifficulties: [],
      selectedAcceptance: [],
      selectedTopics: [],
      response: "",
      problemTitle: "Title",
      problemDifficulty: "Difficulty",
      problemAcceptance: "Acceptance",
      problemLink: "Link",
      premium: false,
    }
    
  }

  getMeta() {
    const requestOptions = {
      title: 'Random LC',
      description: 'Get a Random Leetcode with a filter!',
      meta: {
          charset: 'utf-8',
          name: {
              keywords: 'random, leetcode'
          }
      }
    };
    return requestOptions;
  }

  getRandomLeetcode() {
    const requestOptions = {
      method: 'GET',
      headers: { 
        'Content-Type': 'application/json',
        "difficulties": this.state.selectedDifficulties,
        "acceptance": this.state.selectedAcceptance,
        "topics": this.state.selectedTopics,
        "premium": this.state.premium
      }
    };
    fetch('https://cors-anywhere.herokuapp.com/http://137.184.34.153:3001/problem', requestOptions)
        .then(response => response.json())
        .then(data => {
          console.log(data)
          this.setState({ 
            problemTitle: data['title'],
            problemDifficulty: data['difficulty'],
            problemAcceptance: data['acceptance'],
            problemLink: data['link'],
            });
          });

  }

  handleDifficultyChange = (selectedOptions) => {
    this.setState({selectedDifficulties: selectedOptions});
  }
  handleAcceptanceChange = (selectedOptions) => {
    this.setState({selectedAcceptance: selectedOptions});
  }
  handleTopicChange = (selectedOptions) => {
    this.setState({selectedTopics: selectedOptions});
  }

  range (x,y,inc) {
    let lst = [];
    for(let i = y; i >= x; i-=inc){
      lst.push(i);
    }
    return lst;
  }

  readTags() {
    fetch (tags)
      .then(line => line.text())
      .then(text => text.split('\n'))
      .then(lines => {
        this.setState({
          topicOptions: lines
        })
      }
    );
  }

  render() {
    return (
      <div className="App">
        <DocumentMeta {...this.getMeta()} />
        <div className="ImageWrapper">
          <img className="Image" src={img} alt="img" />
        </div>
        <div className="TitleWrapper">
          <h1>Random LC</h1>
        </div>
        <div className="ConfigureProblemWrapper">
          <div className="Configure">
            <div className="DifficultyWrapper">
              <Multiselect
                className="Difficulty"
                placeholder = "Difficulty"
                isObject={false}
                onKeyPressFn={function noRefCheck(){}}
                onRemove={function noRefCheck(){}}
                onSearch={function noRefCheck(){}}
                onSelect={this.handleDifficultyChange}
                options={this.state.difficultyOptions}
                autosize={false}
              />
            </div>
            <div className="AcceptanceWrapper">
              <Multiselect
                  className = "Acceptance"
                  placeholder = "Minimum Acceptance"
                  selectionLimit = "1"
                  isObject={false}
                  onKeyPressFn={function noRefCheck(){}}
                  onRemove={function noRefCheck(){}}
                  onSearch={function noRefCheck(){}}
                  onSelect={this.handleAcceptanceChange}
                  options={this.state.acceptanceOptions}
                  autosize={false}
                />
            </div>
            <div className="TopicsWrapper">
              <Multiselect
                  className="Topics"
                  placeholder = "Topics"
                  isObject={false}
                  onKeyPressFn={function noRefCheck(){}}
                  onRemove={function noRefCheck(){}}
                  onSearch={function noRefCheck(){}}
                  onSelect={this.handleTopicChange}
                  options={this.state.topicOptions}
                  autosize={true}
                />
            </div>
            <div className="CheckboxWrapper">
              <label>
                <input className="Checkbox" type="checkbox" value="premium" onChange={() => this.state.premium = !this.state.premium}/> 
                  Allow Premium
              </label>
            </div>
            <div className="ButtonRandomLCWrapper">
              <button margin="auto" className="ButtonRandomLC" onClick={() => this.getRandomLeetcode()}>Get Random Leetcode</button>
            </div>
          </div>
          <div className="Space"></div>
          <div className="Problem">
              <form>
                <div className="textTitleWrapper">
                  <input className="textTitle" type="text" value={this.state.problemTitle}/>
                </div>
                <div className="textDiffAccWrapper">
                  <div className="textDifficultyWrapper">
                    <input className="textDifficulty" type="text" value={this.state.problemDifficulty}/>
                  </div>
                  <div className="textAcceptanceWrapper">
                    <input className="textAcceptance" type="text" value={this.state.problemAcceptance}/>
                  </div>
                </div>
                <div className="ButtonLaunchWrapper">
                  <button className="buttonLaunch" onClick={((e)=>{
                    window.open(this.state.problemLink, '_blank');
                    e.preventDefault();
                  })}>Launch</button>
                </div>
              </form>
           
          </div>
        </div>
      </div>
    )
  }
}
export default App;
