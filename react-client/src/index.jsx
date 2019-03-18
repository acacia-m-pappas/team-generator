import React from 'react';
import ReactDOM from 'react-dom';
import axios from './axios.js';
import styled from 'styled-components';
import sorters from 'sortingMethods.js';
import dummy from './dummyData.js';
import ClassList from './components/ClassList.jsx';
import Groups from './components/Groups.jsx';
import SplitInput from './components/SplitInput.jsx';
import Login from './components/Login.jsx';

const Flex = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  align-items: center;
`;

const Header = styled(Flex)`
  border: solid grey; 
`;

const Footer = styled(Flex)``;


const Main = styled(Flex)`
  
  
`;

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      phase: 0,
      all: [],
      classes: [],
      class: {},
      groups: [],
      teacher: {},
      number: 0
    }
    this.login = this.login.bind(this);
    this.updateClass = this.updateClass.bind(this);
    this.groupBy = this.groupBy.bind(this);
  }

  componentDidMount() {
    //axios call here to get data...
    var newState = { all: dummy.teachers}
    this.setState(newState);
  }

  login(email){
    var teachers = this.state.all;
    for(var i=0; i< teachers.length; i++){
      if(email === teachers[i].email){
        var newState = {
          phase: 1, 
          teacher: teachers[i],
          classes: teachers[i].classes
        } 
        this.setState(newState)
        return;
      }
    }
  }

  updateClass(eventName){
    var classList = this.state.classes;
    for(var i = 0; i < classList.length; i++){
      if(classList[i].className === eventName){
        this.setState({
          phase: 2,
          class: classList[i]
        })
        return;
      }
    }
  }

  groupBy(num) {
    var groups = sorters.random(this.state.class, num);
    this.setState({ 
      phase: 3,
      groups: groups
    })
  }

  render () {
    console.log(this.state.number, this.state.class)
    return (
      <div>
        <Header>
          <img className="teamImg"
          src="http://images.clipartpanda.com/team-clipart-kids-team-clipart-gallery.jpg"
          alt="teams" />
          <h1>teamz4u</h1>  
          <p>A group generator for teachers.</p>      
        </Header>

        <Main>
          <Login login={this.login}/>
          <ClassList classes={this.state.classes} updateClass={this.updateClass} phase={this.state.phase}/>
          <SplitInput class={this.state.class} groupBy={this.groupBy} teacher={this.state.teacher} phase={this.state.phase}/>
          <Groups class={this.state.data} phase={this.state.phase}/>
        </Main>        
        <Footer>
        </Footer>
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'));