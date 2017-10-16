import React from 'react';
import ReactDOM from 'react-dom';
import ProjectBundle from './projectBundle';


const data = [
  {id:"1",className:"projectBundle",title:"Generative Typewriter",paragraph:"An application where the user can create animated text by playing with the settings and can save them to view them later."},
  {id:"2",className:"projectBundle",title:"Generative Posters",paragraph:"Wrote a script to generate posters using these 5 interesting things that blend in well together and printed them on 24x36"}
]

document.addEventListener('DOMContentLoaded', function() {
  var items = data.map((cur)=>{
              return <ProjectBundle key={cur.id} className={cur.className}
                             title={cur.title}
                             paragraph={cur.paragraph}/>});
  ReactDOM.render(items, document.getElementById('mount'));
});
