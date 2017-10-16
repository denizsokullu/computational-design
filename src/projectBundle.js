import React from 'react';

//Make a component that can take in names and descriptions
//

class ProjectBundleParagraph extends React.Component{
  render(){
    return(
      <p>{this.props.paragraph}</p>
    )
  }
};

class ProjectBundleTitle extends React.Component{
  render(){
    return(
      <h4>{this.props.title}</h4>
    )
  }
};

class ProjectBundle extends React.Component{
  render(){
    return(
      <div className={this.props.className}>
        <ProjectBundleTitle title={this.props.title}/>
        <ProjectBundleParagraph paragraph={this.props.paragraph}/>
      </div>
    )
  }
};
export default ProjectBundle;
